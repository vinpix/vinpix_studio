"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { loadGltfBundle } from "@/features/game-design/gltfCache";
import { entryOf, objectFootprint, worldPositionOf } from "@/features/game-design/mapDoc";
import {
  buildCollisionGrid,
  chop,
  createDuckState,
  createPlayWorld,
  dashCooldownFraction,
  findInteractTarget,
  findSpawn,
  interact,
  stepDuck,
  type DuckState,
  type HeldItem,
  type PlayWorld,
} from "@/features/game-design/play";
import { CELL_SIZE, type MapDoc, type MapObject } from "@/features/game-design/types";

export const DUCK_URL = "/map-preview/characters/duck_chef.glb";
/** Character height in world units (Unity capsule 2.44 incl. offsets; counters are 2 wide). */
const DUCK_HEIGHT = 2.1;
/** The GLB root carries a baked 180° yaw; compensate so +yaw faces the walk direction. */
const MODEL_YAW_OFFSET = Math.PI;
/** Godot/Unity FollowCamera: pitch 45°, smooth 5. Perspective here, so lift a bit higher. */
const CAM_OFFSET = new THREE.Vector3(0, 12.5, 10.5);
const CAM_SMOOTH = 5;
const COUNTER_TOP_Y = 1.15;

export type PlayHud = {
  held: HeldItem | null;
  delivered: number;
  chopped: number;
  dashCooldown: number;
  targetLabel: string | null;
  message: string | null;
  loading: boolean;
};

type Props = {
  doc: MapDoc;
  onHud?: (hud: PlayHud) => void;
};

type Keys = {
  down: Set<string>;
  dash: boolean;
  interact: boolean;
  chop: boolean;
};

function useKeys(): Keys {
  const keys = useRef<Keys>({ down: new Set(), dash: false, interact: false, chop: false }).current;
  useEffect(() => {
    const isTyping = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      return Boolean(t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable));
    };
    const onDown = (e: KeyboardEvent) => {
      if (isTyping(e) || e.metaKey || e.ctrlKey) return;
      const k = e.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
      if (e.repeat) return;
      keys.down.add(k);
      if (k === " ") keys.dash = true;
      if (k === "f") keys.interact = true;
      if (k === "e") keys.chop = true;
    };
    const onUp = (e: KeyboardEvent) => keys.down.delete(e.key.toLowerCase());
    const onBlur = () => keys.down.clear();
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [keys]);
  return keys;
}

function axisOf(down: Set<string>): { x: number; z: number } {
  // Screen mapping: camera sits on +z looking toward -z, so W (screen up) = -z.
  const x = (down.has("d") || down.has("arrowright") ? 1 : 0) - (down.has("a") || down.has("arrowleft") ? 1 : 0);
  const z = (down.has("s") || down.has("arrowdown") ? 1 : 0) - (down.has("w") || down.has("arrowup") ? 1 : 0);
  return { x, z };
}

/** Small colored block that stands for a kitchen object (held or on a counter). */
function ItemBlock({ item, position }: { item: HeldItem; position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.55, 0.35, 0.55]} />
      <meshStandardMaterial color={item.color} roughness={0.6} />
    </mesh>
  );
}

function TargetHighlight({ obj }: { obj: MapObject }) {
  const [w, h] = objectFootprint(obj);
  const pos = worldPositionOf(obj);
  return (
    <group position={pos} rotation={[0, THREE.MathUtils.degToRad(obj.rot), 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[Math.max(w, h) * CELL_SIZE * 0.55, Math.max(w, h) * CELL_SIZE * 0.55 + 0.35, 4, 1, Math.PI / 4]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.85} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function DuckPlayer({ doc, onHud }: Props) {
  const { camera } = useThree();
  const keys = useKeys();
  const grid = useMemo(() => buildCollisionGrid(doc), [doc]);
  const [model, setModel] = useState<{ root: THREE.Group; mixer: THREE.AnimationMixer; idle?: THREE.AnimationAction; run?: THREE.AnimationAction } | null>(null);
  const [failed, setFailed] = useState(false);
  const holder = useRef<THREE.Group>(null);
  const state = useRef<DuckState>(createDuckState(findSpawn(doc, grid)));
  const world = useRef<PlayWorld>(createPlayWorld());
  const [target, setTarget] = useState<MapObject | null>(null);
  const [surfaces, setSurfaces] = useState<Record<string, HeldItem>>({});
  const [held, setHeld] = useState<HeldItem | null>(null);
  const running = useRef(false);
  const hudLast = useRef<string>("");
  const message = useRef<{ text: string | null; until: number }>({ text: null, until: 0 });
  const chopPulse = useRef(0);
  const camInit = useRef(false);

  // (re)spawn when the map layout changes
  useEffect(() => {
    state.current = createDuckState(findSpawn(doc, grid));
  }, [doc.id, grid]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let alive = true;
    loadGltfBundle(DUCK_URL)
      .then(({ scene, animations }) => {
        if (!alive) return;
        const root = cloneSkeleton(scene) as THREE.Group;
        root.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(root, true);
        const size = new THREE.Vector3();
        box.getSize(size);
        const s = size.y > 1e-4 ? DUCK_HEIGHT / size.y : 1;
        root.scale.multiplyScalar(s);
        root.updateMatrixWorld(true);
        const box2 = new THREE.Box3().setFromObject(root, true);
        const c = new THREE.Vector3();
        box2.getCenter(c);
        root.position.set(-c.x, -box2.min.y, -c.z);
        root.rotation.y = MODEL_YAW_OFFSET;
        const mixer = new THREE.AnimationMixer(root);
        const idleClip = animations.find((a) => /idle/i.test(a.name)) ?? animations[0];
        const runClip = animations.find((a) => /run|walk/i.test(a.name));
        const idle = idleClip ? mixer.clipAction(idleClip) : undefined;
        const run = runClip ? mixer.clipAction(runClip) : undefined;
        idle?.play();
        if (run) {
          run.play();
          run.setEffectiveWeight(0);
        }
        setModel({ root, mixer, idle, run });
      })
      .catch((e) => {
        console.warn("[game_design] duck load failed", e);
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20);
    const s0 = state.current;
    const input = { axis: axisOf(keys.down), dashPressed: keys.dash };
    keys.dash = false;
    const s1 = stepDuck(s0, input, dt, grid);
    state.current = s1;

    const tgt = findInteractTarget(s1, grid);
    if ((tgt?.id ?? null) !== (target?.id ?? null)) setTarget(tgt);

    const now = performance.now();
    let w = world.current;
    if (keys.interact) {
      keys.interact = false;
      const r = interact(w, tgt);
      w = r.world;
      if (r.message) message.current = { text: r.message, until: now + 1800 };
    }
    if (keys.chop) {
      keys.chop = false;
      const r = chop(w, tgt);
      w = r.world;
      if (r.message) message.current = { text: r.message, until: now + 1800 };
      if (r.world !== world.current) chopPulse.current = 0.26;
    }
    if (w !== world.current) {
      world.current = w;
      setHeld(w.held);
      setSurfaces(w.surfaces);
    }
    if (message.current.text && now > message.current.until) message.current = { text: null, until: 0 };

    // visuals
    const g = holder.current;
    if (g) {
      g.position.set(s1.pos.x, 0, s1.pos.z);
      g.rotation.y = s1.yaw;
      if (chopPulse.current > 0) {
        chopPulse.current -= dt;
        const t = 1 - chopPulse.current / 0.26;
        g.rotation.x = THREE.MathUtils.degToRad(Math.sin(t * Math.PI) * 14);
      } else g.rotation.x = 0;
    }
    if (model) {
      const moving = input.axis.x * input.axis.x + input.axis.z * input.axis.z > 0.1;
      const wasRunning = running.current;
      if (moving !== wasRunning) {
        running.current = moving;
        if (model.idle && model.run) {
          const from = moving ? model.idle : model.run;
          const to = moving ? model.run : model.idle;
          to.enabled = true;
          to.setEffectiveWeight(1);
          to.setEffectiveTimeScale(1);
          from.crossFadeTo(to, 0.12, false);
        }
      }
      if (model.run) model.run.timeScale = s1.isDashing ? 1.5 : 1;
      model.mixer.update(dt);
    }

    // follow camera (Godot smooth_speed 5)
    const focus = new THREE.Vector3(s1.pos.x, 0.8, s1.pos.z);
    const desired = focus.clone().add(CAM_OFFSET);
    if (!camInit.current) {
      camera.position.copy(desired);
      camInit.current = true;
    } else {
      camera.position.lerp(desired, 1 - Math.exp(-CAM_SMOOTH * dt));
    }
    camera.lookAt(focus);

    // HUD (throttled: only when something visible changed)
    if (onHud) {
      const hud: PlayHud = {
        held: w.held,
        delivered: w.delivered,
        chopped: w.chopped,
        dashCooldown: Math.round(dashCooldownFraction(s1) * 20) / 20,
        targetLabel: tgt ? entryOf(tgt)?.label ?? tgt.key : null,
        message: message.current.text,
        loading: !model && !failed,
      };
      const sig = JSON.stringify(hud);
      if (sig !== hudLast.current) {
        hudLast.current = sig;
        onHud(hud);
      }
    }
  });

  return (
    <>
      <group ref={holder}>
        {model ? (
          <primitive object={model.root} />
        ) : (
          <mesh position={[0, DUCK_HEIGHT / 2, 0]} castShadow>
            <capsuleGeometry args={[0.5, DUCK_HEIGHT - 1, 6, 12]} />
            <meshStandardMaterial color={failed ? "#f87171" : "#fde68a"} roughness={0.7} />
          </mesh>
        )}
        {held && <ItemBlock item={held} position={[0, DUCK_HEIGHT + 0.35, 0]} />}
        {/* soft blob shadow so the duck reads as grounded even with shadows off */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <circleGeometry args={[0.55, 24]} />
          <meshBasicMaterial color="#000" transparent opacity={0.18} depthWrite={false} />
        </mesh>
      </group>
      {target && <TargetHighlight obj={target} />}
      {Object.entries(surfaces).map(([id, item]) => {
        const obj = doc.objects.find((o) => o.id === id);
        if (!obj) return null;
        const [x, , z] = worldPositionOf(obj);
        return <ItemBlock key={id} item={item} position={[x, COUNTER_TOP_Y + 0.18, z]} />;
      })}
    </>
  );
}
