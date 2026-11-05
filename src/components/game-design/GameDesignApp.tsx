"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  ChevronDown,
  ClipboardPaste,
  Copy,
  CopyPlus,
  Download,
  EyeOff,
  FilePlus2,
  Grid2x2,
  Layers,
  MousePointer2,
  Paintbrush,
  Pencil,
  Play,
  Plus,
  Redo2,
  Compass,
  RotateCcw,
  RotateCw,
  Search,
  SlidersHorizontal,
  Square,
  Tag,
  Trash2,
  Undo2,
  Upload,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { CATALOG, LAYER_META, normalizeKey } from "@/features/game-design/catalog";
import {
  copyObjects,
  createMapDoc,
  entryOf,
  exportMapJson,
  importMapJson,
  loadActiveMapId,
  moveObjects,
  objectLayer,
  pasteObjects,
  removeObjects,
  resizeMap,
  rotateObjects,
  autoOrient,
  setObjectLabel,
  saveActiveMapId,
  starterMap,
  touch,
  uid,
  worldPositionOf,
} from "@/features/game-design/mapDoc";
import { mapStore, useMapStore } from "@/features/game-design/mapStore";
import { levelCode, levelsOf, useStudio } from "@/features/game-design/studio/store";
import { getThumbnail, thumbKey } from "@/features/game-design/thumbnails";
import { loadViewSettings, saveViewSettings, DEFAULT_VIEW_SETTINGS, type ViewSettings } from "@/features/game-design/viewSettings";
import ViewSettingsPanel from "./ViewSettingsPanel";
import {
  layerTypeOf,
  type EditorTool,
  type LayerVisibility,
  type MapDoc,
  type MapLayer,
  type MapObject,
  type Rotation,
  type ViewMode,
} from "@/features/game-design/types";
import { cn } from "@/lib/utils";
import MapEditor2D, { clampZoom, type Thumbs } from "./MapEditor2D";
import type { CameraPreset, SceneDiag } from "./MapScene3D";
import type { PlayHud } from "./DuckPlayer";

const MapScene3D = dynamic(() => import("./MapScene3D"), {
  ssr: false,
  loading: () => <div className="h-full w-full grid place-items-center text-sm text-gray-500">Đang tải 3D…</div>,
});

const HISTORY_LIMIT = 80;
const ALL_VISIBLE: LayerVisibility = { floor: true, counter: true, movable: true, decor: true };

export default function GameDesignApp({ initialMapId = null }: { initialMapId?: string | null } = {}) {
  const maps = useMapStore();
  const studioData = useStudio();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collapsedWorlds, setCollapsedWorlds] = useState<Set<string>>(new Set());
  const [mapsCollapsed, setMapsCollapsed] = useState(false);
  useEffect(() => {
    try {
      setMapsCollapsed(localStorage.getItem("gd.mapsCollapsed") === "1");
    } catch {
      /* ignore */
    }
  }, []);
  // draggable divider between the map list and the palette
  const [mapsHeight, setMapsHeight] = useState(256);
  useEffect(() => {
    try {
      const h = Number(localStorage.getItem("gd.mapsHeight"));
      if (h >= 80) setMapsHeight(h);
    } catch {
      /* ignore */
    }
  }, []);
  const onMapsDividerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = mapsHeight;
    const max = Math.max(160, window.innerHeight - 320);
    let h = startH;
    const move = (ev: PointerEvent) => {
      h = Math.min(max, Math.max(80, startH + ev.clientY - startY));
      setMapsHeight(h);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.style.cursor = "";
      try {
        localStorage.setItem("gd.mapsHeight", String(Math.round(h)));
      } catch {
        /* ignore */
      }
    };
    document.body.style.cursor = "row-resize";
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const toggleMaps = () => {
    setMapsCollapsed((v) => {
      try {
        localStorage.setItem("gd.mapsCollapsed", v ? "0" : "1");
      } catch {
        /* ignore */
      }
      return !v;
    });
  };

  // maps grouped by world (through level.mapId); unlinked maps go to "Khác"
  const mapGroups = useMemo(() => {
    const byId = new Map(maps.map((m) => [m.id, m]));
    const used = new Set<string>();
    const groups: Array<{ id: string; label: string; items: Array<{ map: MapDoc; code: string | null; label: string }> }> = [];
    for (const w of studioData.worlds) {
      const items: Array<{ map: MapDoc; code: string | null; label: string }> = [];
      for (const lv of levelsOf(studioData, w)) {
        const m = lv.mapId ? byId.get(lv.mapId) : null;
        if (!m || used.has(m.id)) continue;
        used.add(m.id);
        const code = levelCode(studioData, lv);
        // seed names repeat "World 1.2 · " — hide that prefix since the group + code already say it
        const prefix = `${w.name} ${code} · `;
        items.push({ map: m, code, label: m.name.startsWith(prefix) ? m.name.slice(prefix.length) : m.name });
      }
      groups.push({ id: w.id, label: `${w.flag} ${w.name}`, items });
    }
    const rest = maps.filter((m) => !used.has(m.id)).map((map) => ({ map, code: null, label: map.name }));
    if (rest.length || !groups.length) groups.push({ id: "__other", label: "Khác · chưa gán level", items: rest });
    return groups;
  }, [maps, studioData]);
  const [tool, setTool] = useState<EditorTool>("place");
  const [activeKey, setActiveKey] = useState<string | null>("base_counter");
  // custom counters the designer named; reusable from the palette (persisted per browser + union of labels in maps)
  const [activeLabel, setActiveLabel] = useState<string>("");
  const [savedCustom, setSavedCustom] = useState<string[]>([]);
  const [newCustomName, setNewCustomName] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("gd.customCounters");
      if (raw) setSavedCustom(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);
  const persistCustom = (list: string[]) => {
    setSavedCustom(list);
    try {
      localStorage.setItem("gd.customCounters", JSON.stringify(list));
    } catch {
      /* ignore */
    }
  };
  const customCounters = useMemo(() => {
    const inMaps = new Set<string>();
    for (const m of maps) for (const o of m.objects) if (o.label && entryOf(o)?.custom) inMaps.add(o.label);
    return Array.from(new Set([...savedCustom, ...inMaps]));
  }, [maps, savedCustom]);
  const pickCustom = (name: string) => {
    setActiveKey("custom_counter");
    setActiveLabel(name);
    setTool("place");
    setSelectedIds([]);
  };
  const addCustom = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    if (!customCounters.includes(clean)) persistCustom([...savedCustom, clean]);
    setNewCustomName(null);
    pickCustom(clean);
  };
  const [activeRot, setActiveRot] = useState<Rotation>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [view, setView] = useState<ViewMode>("2d");
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>("orbit");
  const [fitToken, setFitToken] = useState(0);
  const [visibility, setVisibility] = useState<LayerVisibility>(ALL_VISIBLE);
  const [zoom, setZoom] = useState(1);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [thumbs, setThumbs] = useState<Thumbs>({});
  const [showLabels, setShowLabels] = useState(true);
  const [clipboard, setClipboard] = useState<MapObject[]>([]);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [viewSettings, setViewSettings] = useState<ViewSettings>(DEFAULT_VIEW_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [diag, setDiag] = useState<SceneDiag | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hud, setHud] = useState<PlayHud | null>(null);
  const hoverCell = useRef<[number, number] | null>(null);
  const history = useRef<{ past: MapDoc[]; future: MapDoc[] }>({ past: [], future: [] });
  const fileInput = useRef<HTMLInputElement>(null);

  // ---- pick the open map (maps themselves come from mapStore, synced to the backend)
  useEffect(() => {
    const all = mapStore.getAll();
    if (!all.length) {
      const first = starterMap();
      mapStore.upsert(first);
      setActiveId(first.id);
      return;
    }
    const has = (id: string | null) => Boolean(id && all.some((m) => m.id === id));
    const wanted = has(initialMapId) ? initialMapId : null;
    const saved = loadActiveMapId();
    setActiveId(wanted ?? (has(saved) ? saved : all[0].id));
  }, [initialMapId]);

  // scroll the open map into view in the grouped list
  useEffect(() => {
    document.querySelector<HTMLElement>("[data-map-active='true']")?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  // keep a valid selection if the open map disappears; remember it for next time
  useEffect(() => {
    if (!maps.length || !activeId) return;
    if (!maps.some((m) => m.id === activeId)) setActiveId(maps[0].id);
    else saveActiveMapId(activeId);
  }, [maps, activeId]);

  // ---- view settings
  useEffect(() => setViewSettings(loadViewSettings()), []);
  useEffect(() => {
    const t = window.setTimeout(() => saveViewSettings(viewSettings), 300);
    return () => window.clearTimeout(t);
  }, [viewSettings]);

  // ---- thumbnails (oblique, rendered in-browser, one per rotation; rot 0 first for the palette)
  useEffect(() => {
    let alive = true;
    const run = (rot: Rotation) => {
      for (const e of CATALOG) {
        if (!e.assetUrl) continue;
        if (e.layer === 0 && rot !== 0) continue;
        getThumbnail(e, rot)
          .then((th) => alive && setThumbs((t) => ({ ...t, [thumbKey(e.key, rot)]: th })))
          .catch(() => undefined);
      }
    };
    // rot 0 right away (palette + most tiles); other rotations once the UI is idle
    run(0);
    const later = window.setTimeout(() => {
      if (!alive) return;
      ([90, 180, 270] as Rotation[]).forEach((r, i) => window.setTimeout(() => alive && run(r), i * 1500));
    }, 4000);
    return () => {
      alive = false;
      window.clearTimeout(later);
    };
  }, []);

  const doc = useMemo(() => maps.find((m) => m.id === activeId) ?? null, [maps, activeId]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  // ---- doc mutation with history
  const commit = useCallback((next: MapDoc, record = true) => {
    const cur = mapStore.get(next.id);
    if (!cur) return;
    if (record && cur !== next) {
      const h = history.current;
      h.past = [...h.past.slice(-HISTORY_LIMIT + 1), cur];
      h.future = [];
    }
    mapStore.upsert(next);
  }, []);

  const undo = useCallback(() => {
    if (!doc) return;
    const h = history.current;
    const prev = h.past.pop();
    if (!prev || prev.id !== doc.id) {
      if (prev) h.past.push(prev);
      return;
    }
    h.future.push(doc);
    commit(prev, false);
  }, [doc, commit]);

  const redo = useCallback(() => {
    if (!doc) return;
    const h = history.current;
    const next = h.future.pop();
    if (!next || next.id !== doc.id) {
      if (next) h.future.push(next);
      return;
    }
    h.past.push(doc);
    commit(next, false);
  }, [doc, commit]);

  // ---- selection helpers
  const select3D = useCallback((id: string | null, additive: boolean) => {
    if (!id) return setSelectedIds([]);
    setSelectedIds((cur) => (additive ? (cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id]) : [id]));
  }, []);

  /** Rotate the selection, or the placement direction when nothing is selected. */
  const rotate = useCallback(
    (delta: 90 | -90) => {
      if (doc && selectedIds.length) {
        const next = rotateObjects(doc, selectedIds, delta);
        if (next === doc) showToast("Không xoay được: bị vướng object khác hoặc ra ngoài map");
        else commit(next);
        return;
      }
      setActiveRot((r) => ((((r + delta) % 360) + 360) % 360) as Rotation);
    },
    [doc, selectedIds, commit, showToast],
  );

  /** Face counters toward the floor, walls into the room, corners along their arms, belts toward deliver. */
  const orient = useCallback(
    (onlySelection: boolean) => {
      if (!doc) return;
      const ids = onlySelection && selectedIds.length ? selectedIds : undefined;
      const next = autoOrient(doc, ids);
      if (next === doc) return showToast("Hướng đã đúng, không đổi gì");
      const n = next.objects.filter((o, i) => o.rot !== doc.objects[i]?.rot).length;
      commit(next);
      showToast(`Đã xoay lại ${n} object${ids ? " đang chọn" : ""}`);
    },
    [doc, selectedIds, commit, showToast],
  );

  const deleteSelected = useCallback(() => {
    if (!doc || !selectedIds.length) return;
    commit(removeObjects(doc, selectedIds));
    setSelectedIds([]);
  }, [doc, selectedIds, commit]);

  const copySelected = useCallback(() => {
    if (!doc || !selectedIds.length) return;
    const clip = copyObjects(doc, selectedIds);
    setClipboard(clip);
    showToast(`Đã copy ${clip.length} object`);
  }, [doc, selectedIds, showToast]);

  const paste = useCallback(
    (at?: [number, number]) => {
      if (!doc || !clipboard.length) return;
      const target = at ?? hoverCell.current ?? [0, 0];
      const { doc: next, ids } = pasteObjects(doc, clipboard, target[0], target[1]);
      if (next === doc) return showToast("Không dán được (ngoài map)");
      commit(next);
      setSelectedIds(ids);
      setTool("select");
    },
    [doc, clipboard, commit, showToast]
  );

  const duplicateSelected = useCallback(() => {
    if (!doc || !selectedIds.length) return;
    const clip = copyObjects(doc, selectedIds);
    const minX = Math.min(...doc.objects.filter((o) => selectedIds.includes(o.id)).map((o) => o.gx));
    const minY = Math.min(...doc.objects.filter((o) => selectedIds.includes(o.id)).map((o) => o.gy));
    const { doc: next, ids } = pasteObjects(doc, clip, minX + 1, minY + 1);
    if (next === doc) return;
    commit(next);
    setSelectedIds(ids);
    setTool("select");
  }, [doc, selectedIds, commit]);

  // ---- map list ops
  const resetHistory = () => {
    history.current = { past: [], future: [] };
    setSelectedIds([]);
  };
  const switchMap = (id: string) => {
    resetHistory();
    setActiveId(id);
  };
  const newMap = () => {
    const m = createMapDoc({ name: `Map ${maps.length + 1}` });
    mapStore.upsert(m);
    setActiveId(m.id);
    resetHistory();
  };
  const duplicateMap = () => {
    if (!doc) return;
    const m = createMapDoc({ ...doc, id: undefined, name: `${doc.name} (copy)`, objects: doc.objects.map((o) => ({ ...o, id: uid() })) });
    mapStore.upsert(m);
    setActiveId(m.id);
    resetHistory();
  };
  const deleteMap = () => {
    if (!doc) return;
    if (!window.confirm(`Xoá "${doc.name}"? Map sẽ bị xoá trên server.`)) return;
    const rest = maps.filter((m) => m.id !== doc.id);
    mapStore.remove(doc.id);
    if (!rest.length) {
      const fresh = createMapDoc({ name: "Map 1" });
      mapStore.upsert(fresh);
      setActiveId(fresh.id);
    } else {
      setActiveId(rest[0].id);
    }
    resetHistory();
  };

  // ---- export / import
  const download = (name: string, text: string) => {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };
  const exportCurrent = () => {
    if (!doc) return;
    download(`${doc.name.replace(/[^\w.-]+/g, "_") || "map"}.json`, JSON.stringify(exportMapJson(doc), null, 2));
  };
  const copyJson = async () => {
    if (!doc) return;
    await navigator.clipboard.writeText(JSON.stringify(exportMapJson(doc), null, 2));
    showToast("Đã copy JSON");
  };
  const onImportFile = async (file: File) => {
    try {
      const text = await file.text();
      const { doc: imported, warnings } = importMapJson(JSON.parse(text), file.name.replace(/\.json$/i, ""));
      mapStore.upsert(imported);
      setActiveId(imported.id);
      resetHistory();
      showToast(warnings.length ? `Import xong, ${warnings.length} cảnh báo (xem console)` : "Import xong");
      if (warnings.length) console.warn("[game_design] import warnings:", warnings);
    } catch (e) {
      showToast(`Import lỗi: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  // ---- play mode (drops the Kitchen Together duck into the 3D view)
  const startPlay = useCallback(() => {
    setSelectedIds([]);
    setShowSettings(false);
    setView("3d");
    setHud(null);
    setPlaying(true);
  }, []);
  const stopPlay = useCallback(() => {
    setPlaying(false);
    setHud(null);
    setFitToken((t) => t + 1);
  }, []);
  const switchView = useCallback(
    (v: ViewMode) => {
      if (v === "2d" && playing) stopPlay();
      setView(v);
    },
    [playing, stopPlay]
  );

  // ---- keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) return;
      const mod = e.metaKey || e.ctrlKey;
      const k = e.key.toLowerCase();
      if (playing) {
        // play mode owns the keyboard (DuckPlayer); only Esc leaves
        if (e.key === "Escape") stopPlay();
        return;
      }
      if (!mod && k === "p") {
        e.preventDefault();
        return startPlay();
      }
      if (mod) {
        if (k === "z") {
          e.preventDefault();
          return e.shiftKey ? redo() : undo();
        }
        if (k === "y") return (e.preventDefault(), redo());
        if (k === "c") return (e.preventDefault(), copySelected());
        if (k === "v") return (e.preventDefault(), paste());
        if (k === "d") return (e.preventDefault(), duplicateSelected());
        if (k === "a" && doc) {
          e.preventDefault();
          setSelectedIds(doc.objects.filter((o) => objectLayer(o) !== 0).map((o) => o.id));
          setTool("select");
          return;
        }
        return;
      }
      const nudge = (dx: number, dy: number) => {
        if (!doc || !selectedIds.length) return;
        e.preventDefault();
        commit(moveObjects(doc, selectedIds, dx, dy));
      };
      switch (e.key) {
        case "v":
        case "V":
          return setTool("select");
        case "b":
        case "B":
          return setTool("place");
        case "Tab":
          e.preventDefault();
          return switchView(view === "2d" ? "3d" : "2d");
        case "Escape":
          setSelectedIds([]);
          return setTool("select");
        case "r":
        case "R":
          return rotate(e.shiftKey ? -90 : 90);
        case "o":
        case "O":
          return orient(!e.shiftKey);
        case "Delete":
        case "Backspace":
          return deleteSelected();
        case "ArrowLeft":
          return nudge(-1, 0);
        case "ArrowRight":
          return nudge(1, 0);
        case "ArrowUp":
          return nudge(0, -1);
        case "ArrowDown":
          return nudge(0, 1);
        default:
          return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIds, doc, commit, undo, redo, copySelected, paste, duplicateSelected, deleteSelected, rotate, orient, playing, startPlay, stopPlay, switchView, view]);

  const filteredCatalog = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter(
      (e) => e.label.toLowerCase().includes(q) || e.key.toLowerCase().includes(q) || (e.aliases ?? []).some((a) => a.toLowerCase().includes(q))
    );
  }, [search]);

  const grouped = useMemo(() => {
    const g: Record<MapLayer, typeof CATALOG> = { 0: [], 1: [], 2: [], 3: [] };
    for (const e of filteredCatalog) g[e.layer].push(e);
    return g;
  }, [filteredCatalog]);

  const selectedObjs = useMemo(() => (doc ? doc.objects.filter((o) => selectedIds.includes(o.id)) : []), [doc, selectedIds]);
  const selected = selectedObjs.length === 1 ? selectedObjs[0] : null;
  const selectedEntry = selected ? entryOf(selected) : null;

  if (!doc) {
    return <div className="h-full grid place-items-center text-sm text-gray-500">Đang tải…</div>;
  }

  return (
    <div className="h-full w-full overflow-hidden bg-[#f0f0f0] text-black font-sans flex flex-col">
      <header className="h-12 shrink-0 border-b-2 border-black bg-white flex items-center gap-1 px-3 relative z-40">
        <div className="flex items-center gap-2 pr-2 mr-0.5 border-r border-black/15 shrink-0">
          <span className="w-2.5 h-2.5 bg-black" />
          <span className="font-bold uppercase tracking-wider text-[13px] whitespace-nowrap hidden lg:inline">Map Editor</span>
        </div>

        <Group label="View">
          <Seg>
            <TopBtn active={view === "2d"} onClick={() => switchView("2d")} icon={<Grid2x2 className="w-4 h-4" />} label="2D" kbd="Tab" title="Vẽ top-down" />
            <TopBtn active={view === "3d" && !playing} onClick={() => switchView("3d")} icon={<Box className="w-4 h-4" />} label="3D" kbd="Tab" title="Xem 3D" />
          </Seg>
          <Seg>
            {playing ? (
              <TopBtn active onClick={stopPlay} icon={<Square className="w-4 h-4" />} label="Dừng" kbd="Esc" title="Dừng chơi thử" />
            ) : (
              <TopBtn onClick={startPlay} icon={<Play className="w-4 h-4" />} label="Play" kbd="P" title="Thả con vịt vào map · WASD di chuyển · Space dash · F tương tác · E chặt" />
            )}
          </Seg>
        </Group>

        {view === "2d" ? (
          <>
            <Group label="Tool">
              <Seg>
                <TopBtn active={tool === "place"} onClick={() => setTool("place")} icon={<Paintbrush className="w-4 h-4" />} label="Vẽ" kbd="B" title="Vẽ · click 1 ô · kéo tô vùng chữ nhật · chuột phải xoá" />
                <TopBtn active={tool === "select"} onClick={() => setTool("select")} icon={<MousePointer2 className="w-4 h-4" />} label="Chọn" kbd="V" title="Chọn · kéo để quét vùng · kéo object đã chọn để dời · Shift+click thêm" />
              </Seg>
            </Group>
            <Group label="Zoom">
              <Seg>
                <TopBtn onClick={() => setZoom((z) => clampZoom(z - 0.1))} icon={<ZoomOut className="w-4 h-4" />} title="Thu nhỏ" />
                <button onClick={() => setZoom(1)} className="h-8 px-1.5 text-[11px] tabular-nums w-11 text-center hover:bg-black/5" title="Về 100%">
                  {Math.round(zoom * 100)}%
                </button>
                <TopBtn onClick={() => setZoom((z) => clampZoom(z + 0.1))} icon={<ZoomIn className="w-4 h-4" />} title="Phóng to" />
              </Seg>
              <Seg>
                <TopBtn active={showLabels} onClick={() => setShowLabels((s) => !s)} icon={<Tag className="w-4 h-4" />} title="Hiện tên trên tile" />
              </Seg>
            </Group>
          </>
        ) : playing ? null : (
          <Group label="Camera">
            <Seg>
              <TopBtn active={cameraPreset === "orbit"} onClick={() => { setCameraPreset("orbit"); setFitToken((t) => t + 1); }} label="Orbit" title="Xoay tự do" />
              <TopBtn active={cameraPreset === "top"} onClick={() => { setCameraPreset("top"); setFitToken((t) => t + 1); }} label="Top" title="Nhìn từ trên" />
              <TopBtn onClick={() => setFitToken((t) => t + 1)} icon={<RotateCcw className="w-4 h-4" />} title="Reset camera" />
            </Seg>
            <Seg>
              <TopBtn active={showSettings} onClick={() => setShowSettings((v) => !v)} icon={<SlidersHorizontal className="w-4 h-4" />} label="Ánh sáng" title="Env map, nắng, bóng đổ" />
            </Seg>
          </Group>
        )}

        <Group label="Edit">
          <EditMenu
            selectedCount={selectedIds.length}
            clipboardCount={clipboard.length}
            items={[
              { label: "Undo", kbd: "⌘Z", icon: <Undo2 className="w-4 h-4" />, onClick: undo },
              { label: "Redo", kbd: "⇧⌘Z", icon: <Redo2 className="w-4 h-4" />, onClick: redo, divider: true },
              { label: "Copy", kbd: "⌘C", icon: <Copy className="w-4 h-4" />, onClick: copySelected, disabled: !selectedIds.length },
              { label: "Dán tại ô đang trỏ", kbd: "⌘V", icon: <ClipboardPaste className="w-4 h-4" />, onClick: () => paste(), disabled: !clipboard.length, badge: clipboard.length || undefined },
              { label: "Nhân bản", kbd: "⌘D", icon: <CopyPlus className="w-4 h-4" />, onClick: duplicateSelected, disabled: !selectedIds.length, divider: true },
              { label: "Xoá", kbd: "Del", icon: <Trash2 className="w-4 h-4" />, onClick: deleteSelected, disabled: !selectedIds.length, danger: true },
            ]}
          />
        </Group>

        <Group label="Layer">
          <LayerMenu visibility={visibility} onChange={setVisibility} />
        </Group>

        <div className="flex-1 min-w-2" />

        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => fileInput.current?.click()} className="btn-outline" title="Import map JSON (Kitchen Together / export của editor)">
            <Upload className="w-4 h-4" /> <span className="hidden xl:inline">Import</span>
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onImportFile(f);
              e.currentTarget.value = "";
            }}
          />
          <button onClick={copyJson} className="btn-outline" title="Copy JSON vào clipboard">
            <Copy className="w-4 h-4" /> <span className="hidden xl:inline">JSON</span>
          </button>
          <button onClick={exportCurrent} className="btn-solid" title="Tải JSON cho game">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex">
        {/* left: maps + palette */}
        <aside className="w-72 shrink-0 border-r-2 border-black bg-white flex flex-col min-h-0">
          <div className={cn("p-2 pb-1", mapsCollapsed && "border-b border-black/20")}>
            <div className={cn("flex items-center justify-between", !mapsCollapsed && "mb-1")}>
              <button
                type="button"
                onClick={toggleMaps}
                aria-expanded={!mapsCollapsed}
                className="flex-1 min-w-0 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-black -ml-1 pl-1 h-6"
                title={mapsCollapsed ? "Mở danh sách map" : "Thu gọn danh sách map"}
              >
                <ChevronDown className={cn("w-3.5 h-3.5 shrink-0 transition-transform duration-200", mapsCollapsed && "-rotate-90")} />
                Maps
                {mapsCollapsed && <span className="ml-1 normal-case tracking-normal font-semibold text-black truncate">· {doc.name}</span>}
              </button>
              <button onClick={newMap} className="p-1 hover:bg-black hover:text-white" title="Map mới">
                <FilePlus2 className="w-4 h-4" />
              </button>
            </div>
            <div className={cn("overflow-auto -mx-1", mapsCollapsed && "hidden")} style={{ maxHeight: mapsHeight }}>
              {mapGroups.map((g) => {
                const collapsed = collapsedWorlds.has(g.id);
                const hasActive = g.items.some((it) => it.map.id === doc.id);
                return (
                  <div key={g.id}>
                    <button
                      type="button"
                      aria-expanded={!collapsed}
                      onClick={() =>
                        setCollapsedWorlds((prev) => {
                          const next = new Set(prev);
                          if (next.has(g.id)) next.delete(g.id);
                          else next.add(g.id);
                          return next;
                        })
                      }
                      className={cn(
                        "w-full flex items-center gap-1.5 px-2 h-7 text-[10px] font-bold uppercase tracking-wider border-y border-black/10 sticky top-0 z-10 select-none transition-colors",
                        "bg-[#f0f0f0] text-gray-600 hover:bg-black hover:text-white",
                        collapsed && hasActive && "text-black",
                      )}
                      title={collapsed ? "Mở nhóm" : "Thu gọn nhóm"}
                    >
                      <ChevronDown className={cn("w-3.5 h-3.5 shrink-0 transition-transform duration-200", collapsed && "-rotate-90")} />
                      <span className="truncate flex-1 text-left">{g.label}</span>
                      {collapsed && hasActive && <span className="w-1.5 h-1.5 bg-current rounded-full" title="Đang mở map trong nhóm này" />}
                      <span className="tabular-nums opacity-60">{g.items.length}</span>
                    </button>
                    <div className={cn("grid transition-[grid-template-rows] duration-200 ease-out", collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]")}>
                      <div className={cn("min-h-0 overflow-hidden transition-opacity duration-200", collapsed ? "opacity-0" : "opacity-100")}>
                    {!g.items.length && <div className="px-2 py-1 text-[11px] text-gray-400">Chưa có map</div>}
                    {g.items.map(({ map: m, code, label }) =>
                renamingId === m.id ? (
                  <input
                    key={m.id}
                    autoFocus
                    defaultValue={m.name}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => {
                      const name = e.target.value.trim();
                      if (name && name !== m.name) commit(touch({ ...m, name }), false);
                      setRenamingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                      if (e.key === "Escape") setRenamingId(null);
                    }}
                    className="w-full px-2 py-1 text-sm border border-black outline-none"
                  />
                ) : (
                  <button
                    key={m.id}
                    data-map-active={m.id === doc.id ? "true" : undefined}
                    onClick={() => switchMap(m.id)}
                    onDoubleClick={() => setRenamingId(m.id)}
                    title="Double-click để đổi tên"
                    className={cn("w-full text-left px-2 py-1 text-sm flex items-center justify-between", m.id === doc.id ? "bg-black text-white" : "hover:bg-black/5")}
                  >
                    <span className="truncate">
                      {code && <span className={cn("tabular-nums mr-1.5", m.id === doc.id ? "text-white/60" : "text-gray-400")}>{code}</span>}
                      {label}
                    </span>
                    <span className={cn("text-[10px] tabular-nums", m.id === doc.id ? "text-white/60" : "text-gray-400")}>{m.objects.length}</span>
                  </button>
                ),
                    )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {!mapsCollapsed && (
            <div
              onPointerDown={onMapsDividerDown}
              onDoubleClick={() => setMapsHeight(256)}
              className="group h-2 shrink-0 cursor-row-resize border-b border-black/20 relative hover:bg-black/5"
              title="Kéo để chỉnh chiều cao danh sách map · double-click để về mặc định"
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-black/25 group-hover:bg-black" />
            </div>
          )}

          <div className="p-2 border-b border-black/20">
            <div className="flex items-center gap-1 border border-black px-2 h-8">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm: thớt, tủ lạnh, wall…" className="flex-1 text-sm outline-none bg-transparent" />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <span className="text-gray-500">Hướng đặt:</span>
              <button onClick={() => setActiveRot((r) => ((((r - 90) % 360) + 360) % 360) as Rotation)} className="p-1 border border-black hover:bg-black hover:text-white" title="Xoay trái (⇧R)">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="tabular-nums w-10 text-center font-semibold">{activeRot}°</span>
              <button onClick={() => setActiveRot((r) => (((r + 90) % 360) as Rotation))} className="p-1 border border-black hover:bg-black hover:text-white" title="Xoay phải (R)">
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto p-2">
            <div className="mb-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1 mb-1">
                <Layers className="w-3 h-3" /> Custom counter
                <span className="ml-auto font-normal normal-case tracking-normal text-gray-400">{customCounters.length}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {customCounters.map((name) => {
                  const active = tool === "place" && activeKey === "custom_counter" && activeLabel === name;
                  return (
                    <div key={name} className={cn("relative border transition-colors bg-white", active ? "border-black ring-2 ring-black" : "border-black/20 hover:border-black")}>
                      <button onClick={() => pickCustom(name)} className="w-full aspect-square grid place-items-center p-1" title={`Đặt "${name}" lên map`}>
                        <span className="w-full h-full border-2 border-black grid place-items-center text-[10px] font-bold text-center leading-tight px-0.5 break-words">{name}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!window.confirm(`Bỏ "${name}" khỏi palette? Các ô đã đặt trên map vẫn giữ nguyên.`)) return;
                          persistCustom(savedCustom.filter((n) => n !== name));
                          if (activeLabel === name) setActiveLabel("");
                        }}
                        className="absolute top-0.5 right-0.5 w-4 h-4 grid place-items-center bg-white border border-black/30 text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600"
                        title="Bỏ khỏi palette"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  );
                })}
                {newCustomName === null ? (
                  <button onClick={() => setNewCustomName("")} className="aspect-square border border-dashed border-black/40 hover:border-black grid place-items-center text-[10px] font-semibold text-gray-600 hover:text-black" title="Tạo custom counter mới: đặt tên rồi vẽ lên map">
                    <span className="flex flex-col items-center gap-0.5">
                      <Plus className="w-4 h-4" /> Tạo mới
                    </span>
                  </button>
                ) : (
                  <div className="col-span-3 flex gap-1">
                    <input
                      autoFocus
                      value={newCustomName}
                      onChange={(e) => setNewCustomName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addCustom(newCustomName);
                        if (e.key === "Escape") setNewCustomName(null);
                      }}
                      placeholder="Tên counter, VD: Lò pizza"
                      className="flex-1 min-w-0 border border-black px-2 h-8 text-sm"
                    />
                    <button onClick={() => addCustom(newCustomName)} className="btn-solid h-8 px-2" title="Lưu (Enter)">
                      OK
                    </button>
                    <button onClick={() => setNewCustomName(null)} className="btn-outline h-8 px-2" title="Huỷ (Esc)">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {([0, 1, 2, 3] as MapLayer[]).map((layer) =>
              grouped[layer].length ? (
                <div key={layer} className="mb-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1 mb-1">
                    <Layers className="w-3 h-3" /> {LAYER_META[layer].label}
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {grouped[layer].filter((e) => !e.custom).map((e) => {
                      const active = tool === "place" && activeKey && normalizeKey(activeKey) === normalizeKey(e.key);
                      const thumb = thumbs[thumbKey(e.key, 0)];
                      return (
                        <button
                          key={e.key}
                          onClick={() => {
                            setActiveKey(e.key);
                            setTool("place");
                            setSelectedIds([]);
                          }}
                          className={cn("text-left border transition-colors overflow-hidden", active ? "border-black ring-2 ring-black" : "border-black/20 hover:border-black")}
                          title={`${e.key} · ${e.footprint[0]}×${e.footprint[1]} ô${e.assetUrl ? "" : " · chưa có model"}`}
                        >
                          <div className="aspect-square w-full grid place-items-center" style={{ backgroundColor: e.color }}>
                            {thumb ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={thumb.url} alt={e.label} className="w-full h-full object-contain" draggable={false} />
                            ) : e.custom ? (
                              <span className="w-3/4 aspect-square border-2 border-dashed border-black grid place-items-center text-[9px] font-bold">Aa</span>
                            ) : (
                              <span className="text-[10px] text-gray-500">{e.assetUrl ? "…" : "—"}</span>
                            )}
                          </div>
                          <div className="px-1 py-0.5 text-[10px] font-semibold leading-tight truncate bg-white">{e.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </aside>

        {/* center */}
        <main className="flex-1 min-w-0 min-h-0 relative">
          {view === "2d" ? (
            <MapEditor2D
              doc={doc}
              tool={tool}
              activeKey={activeKey}
              activeLabel={activeKey === "custom_counter" ? activeLabel : undefined}
              activeRot={activeRot}
              selectedIds={selectedIds}
              visibility={visibility}
              zoom={zoom}
              thumbs={thumbs}
              showLabels={showLabels}
              onChange={commit}
              onSelect={setSelectedIds}
              onToolChange={setTool}
              onHoverCell={(c) => (hoverCell.current = c)}
              onZoom={setZoom}
            />
          ) : (
            <>
              <MapScene3D
                doc={doc}
                selectedIds={selectedIds}
                visibility={visibility}
                cameraPreset={cameraPreset}
                fitToken={fitToken}
                settings={viewSettings}
                onSelect={select3D}
                onDiag={setDiag}
                playing={playing}
                onHud={setHud}
              />
              {showSettings && !playing && <ViewSettingsPanel value={viewSettings} onChange={setViewSettings} onClose={() => setShowSettings(false)} diag={diag} />}
              {playing && <PlayOverlay hud={hud} onStop={stopPlay} />}
            </>
          )}
          {!playing && (
            <div className="absolute bottom-2 left-2 right-2 text-[11px] text-gray-500 bg-white/85 px-2 py-1 border border-black/10 pointer-events-none">
              {view === "2d"
                ? "B vẽ (kéo tô vùng chữ nhật) · V chọn (kéo quét vùng, kéo object đã chọn để dời, Shift+click thêm) · chuột phải xoá (kéo xoá vùng, Alt xoá cả sàn) · R xoay · O tự xoay hướng · mũi tên dịch · ⌘C/⌘V/⌘D copy-dán-nhân bản · ⌘A chọn hết · ⌘Z undo · cuộn/pinch zoom · Shift+cuộn pan · Tab 3D · P chơi thử"
                : "Kéo xoay · cuộn zoom · click chọn (Shift+click thêm) · R xoay · O tự xoay hướng · Del xoá · Tab về 2D · P chơi thử"}
            </div>
          )}
          {!playing && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/95 border border-black p-1 text-xs shadow-sm">
              <span className="px-1 text-gray-500 hidden sm:inline">{selectedIds.length ? `Xoay ${selectedIds.length} object` : `Hướng đặt ${activeRot}°`}</span>
              <button onClick={() => rotate(-90)} className="p-1.5 border border-black hover:bg-black hover:text-white" title="Xoay trái (⇧R)">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button onClick={() => rotate(90)} className="p-1.5 border border-black hover:bg-black hover:text-white" title="Xoay phải (R)">
                <RotateCw className="w-4 h-4" />
              </button>
              <button onClick={() => orient(true)} className="p-1.5 border border-black hover:bg-black hover:text-white" title={selectedIds.length ? "Tự xoay hướng nhóm đang chọn (O)" : "Tự xoay hướng cả map (O)"}>
                <Compass className="w-4 h-4" />
              </button>
            </div>
          )}
          {toast && <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5">{toast}</div>}
        </main>

        {/* right: properties */}
        <aside className="w-64 shrink-0 border-l-2 border-black bg-white flex flex-col min-h-0 overflow-auto">
          <section className="p-3 border-b border-black/20">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Map</div>
            <label className="block text-xs text-gray-500 mb-1">Tên</label>
            <input value={doc.name} onChange={(e) => commit(touch({ ...doc, name: e.target.value }), false)} className="w-full border border-black px-2 h-8 text-sm mb-2" />
            <label className="block text-xs text-gray-500 mb-1">Ghi chú / món</label>
            <textarea
              value={doc.notes}
              onChange={(e) => commit(touch({ ...doc, notes: e.target.value }), false)}
              rows={2}
              placeholder="VD: Hamburger thập cẩm"
              className="w-full border border-black px-2 py-1 text-sm mb-2 resize-none"
            />
            <div className="flex gap-2">
              <NumField label="Rộng" value={doc.width} onChange={(v) => commit(resizeMap(doc, v, doc.height))} />
              <NumField label="Cao" value={doc.height} onChange={(v) => commit(resizeMap(doc, doc.width, v))} />
            </div>
            <div className="mt-2 text-[11px] text-gray-500">{doc.objects.length} object · 1 ô = 2 đơn vị world</div>
            <button onClick={() => orient(false)} className="btn-outline w-full justify-center mt-2" title="Bàn quay ra sàn trống, tường quay vào phòng, bàn góc nối nhánh, băng chuyền chạy tới Ra món (⇧O)">
              <Compass className="w-3.5 h-3.5" /> Tự xoay hướng cả map
            </button>
            <div className="mt-2 flex gap-1">
              <button onClick={duplicateMap} className="btn-outline flex-1 justify-center whitespace-nowrap">
                <Plus className="w-3.5 h-3.5" /> Nhân bản
              </button>
              <button onClick={deleteMap} className="btn-outline flex-1 justify-center whitespace-nowrap text-red-600 border-red-600">
                <Trash2 className="w-3.5 h-3.5" /> Xoá
              </button>
            </div>
          </section>

          <section className="p-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
              Đang chọn {selectedObjs.length > 1 ? `(${selectedObjs.length})` : ""}
            </div>
            {selectedObjs.length > 1 ? (
              <div className="text-sm space-y-2">
                <div className="text-xs text-gray-600">{selectedObjs.length} object · kéo để dời cả nhóm, mũi tên để dịch 1 ô</div>
                <div className="flex gap-1">
                  <button onClick={() => rotate(-90)} className="btn-outline flex-1 justify-center">
                    <RotateCcw className="w-3.5 h-3.5" /> Trái
                  </button>
                  <button onClick={() => rotate(90)} className="btn-outline flex-1 justify-center">
                    <RotateCw className="w-3.5 h-3.5" /> Phải
                  </button>
                </div>
                <button onClick={() => orient(true)} className="btn-outline w-full justify-center" title="Tự xoay theo phía sàn trống (O)">
                  <Compass className="w-3.5 h-3.5" /> Tự xoay hướng nhóm
                </button>
                <div className="flex gap-1">
                  <button onClick={copySelected} className="btn-outline flex-1 justify-center">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                  <button onClick={duplicateSelected} className="btn-outline flex-1 justify-center">
                    <Plus className="w-3.5 h-3.5" /> Nhân bản
                  </button>
                </div>
                <button onClick={deleteSelected} className="btn-outline w-full justify-center text-red-600 border-red-600">
                  <Trash2 className="w-3.5 h-3.5" /> Xoá {selectedObjs.length} object
                </button>
              </div>
            ) : selected ? (
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  {selectedEntry && thumbs[thumbKey(selectedEntry.key, selected.rot)] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumbs[thumbKey(selectedEntry.key, selected.rot)].url} alt="" className="w-10 h-10 object-contain border border-black/20" style={{ backgroundColor: selectedEntry?.color }} />
                  ) : (
                    <span className="inline-block w-4 h-4 border border-black" style={{ backgroundColor: selectedEntry?.color ?? "#fca5a5" }} />
                  )}
                  <span className="font-semibold">{selectedEntry?.label ?? selected.key}</span>
                </div>
                {selectedEntry?.custom && (
                  <label className="block">
                    <span className="block text-xs text-gray-500 mb-1">Nhãn (tự đặt tên)</span>
                    <input
                      autoFocus
                      value={selected.label ?? ""}
                      placeholder="VD: Lò pizza, Quầy sushi…"
                      onChange={(e) => commit(setObjectLabel(doc, selected.id, e.target.value), false)}
                      className="w-full border border-black px-2 h-8 text-sm"
                    />
                  </label>
                )}
                <Row k="object_type" v={selected.key} />
                <Row k="layer" v={`${objectLayer(selected)} (${layerTypeOf(objectLayer(selected))})`} />
                <Row k="grid" v={`[${selected.gx}, ${selected.gy}]`} />
                <Row k="world" v={`[${worldPositionOf(selected).map((n) => n.toFixed(1)).join(", ")}]`} />
                <Row k="rotation" v={`${selected.rot}°`} />
                <div className="flex gap-1 pt-1">
                  <button onClick={() => rotate(-90)} className="btn-outline flex-1 justify-center">
                    <RotateCcw className="w-3.5 h-3.5" /> Trái
                  </button>
                  <button onClick={() => rotate(90)} className="btn-outline flex-1 justify-center">
                    <RotateCw className="w-3.5 h-3.5" /> Phải
                  </button>
                </div>
                <button onClick={() => orient(true)} className="btn-outline w-full justify-center" title="Tự xoay theo phía sàn trống (O)">
                  <Compass className="w-3.5 h-3.5" /> Tự xoay hướng
                </button>
                <button onClick={deleteSelected} className="btn-outline w-full justify-center text-red-600 border-red-600">
                  <Trash2 className="w-3.5 h-3.5" /> Xoá object
                </button>
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                Tool <b>Chọn (V)</b>: click object, hoặc kéo trên vùng trống để chọn nhiều. Trong 3D click object để chọn.
              </p>
            )}
          </section>
        </aside>
      </div>

      <style jsx global>{`
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          height: 2rem;
          padding: 0 0.6rem;
          border: 1px solid #000;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: #fff;
          transition: background 0.15s, color 0.15s;
        }
        .btn-outline:hover:not(:disabled) {
          background: #000;
          color: #fff;
        }
        .btn-outline:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .btn-solid {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          height: 2rem;
          padding: 0 0.7rem;
          border: 1px solid #000;
          background: #000;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .btn-solid:hover {
          background: #2563eb;
          border-color: #2563eb;
        }
      `}</style>
    </div>
  );
}

const LAYER_ROWS: Array<[keyof LayerVisibility, string, string]> = [
  ["floor", "Sàn", "floor · layer 0"],
  ["counter", "Bàn / Counter", "counter · layer 1"],
  ["movable", "Movable", "movable · layer 2"],
  ["decor", "Tường / Decor", "decor · layer 3"],
];

/** In-game HUD for play mode: controls, held item, dash cooldown, interact target. */
function PlayOverlay({ hud, onStop }: { hud: PlayHud | null; onStop: () => void }) {
  const cooldown = hud?.dashCooldown ?? 0;
  return (
    <>
      <div className="absolute top-2 left-2 flex items-center gap-2 pointer-events-none">
        <div className="bg-black text-white text-[11px] font-bold uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 animate-pulse" /> Play
        </div>
        {hud?.loading && <div className="bg-white/90 border border-black text-[11px] px-2 py-1">Đang tải con vịt…</div>}
      </div>
      <button onClick={onStop} className="absolute top-2 right-2 btn-outline bg-white" title="Dừng (Esc)">
        <Square className="w-4 h-4" /> Dừng
      </button>

      {hud?.message && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1.5 pointer-events-none">{hud.message}</div>
      )}

      <div className="absolute bottom-2 left-2 right-2 flex items-end gap-2 pointer-events-none">
        <div className="bg-white/95 border-2 border-black px-3 py-2 min-w-48">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Đang cầm</div>
          <div className="flex items-center gap-2 mt-1 h-6">
            {hud?.held ? (
              <>
                <span className="w-4 h-4 border border-black" style={{ background: hud.held.color }} />
                <span className="text-sm font-semibold">{hud.held.label}</span>
              </>
            ) : (
              <span className="text-sm text-gray-400">Tay không</span>
            )}
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">Dash</div>
          <div className="h-1.5 w-full border border-black mt-1 overflow-hidden">
            <div className="h-full bg-black transition-[width] duration-100" style={{ width: `${Math.round((1 - cooldown) * 100)}%` }} />
          </div>
        </div>
        <div className="bg-white/95 border-2 border-black px-3 py-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Trước mặt</div>
          <div className="text-sm font-semibold mt-1 h-6 flex items-center">{hud?.targetLabel ?? <span className="text-gray-400">—</span>}</div>
          <div className="mt-2 text-[10px] text-gray-500 tabular-nums">Đã giao {hud?.delivered ?? 0} · đã chặt {hud?.chopped ?? 0}</div>
        </div>
        <div className="flex-1" />
        <div className="bg-white/85 border border-black/10 text-[11px] text-gray-600 px-2 py-1">
          <kbd className="font-mono">WASD</kbd>/mũi tên di chuyển · <kbd className="font-mono">Space</kbd> dash · <kbd className="font-mono">F</kbd> lấy/đặt · <kbd className="font-mono">E</kbd> chặt · <kbd className="font-mono">Esc</kbd> dừng
        </div>
      </div>
    </>
  );
}

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

type EditItem = {
  label: string;
  kbd: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  badge?: number;
  divider?: boolean;
  danger?: boolean;
};

function EditMenu({ items, selectedCount, clipboardCount }: { items: EditItem[]; selectedCount: number; clipboardCount: number }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);
  const badge = selectedCount || clipboardCount || undefined;

  return (
    <div ref={ref} className="relative">
      <Seg>
        <TopBtn
          active={open}
          onClick={() => setOpen((o) => !o)}
          icon={<Pencil className="w-4 h-4" />}
          label="Edit"
          title={selectedCount ? `${selectedCount} object đang chọn` : clipboardCount ? `${clipboardCount} object trong clipboard` : "Undo / redo / copy / dán / xoá"}
          badge={badge}
        />
      </Seg>
      {open && (
        <div className="absolute left-0 top-9 z-50 w-56 bg-white border border-black shadow-lg text-xs py-1">
          {items.map((it) => (
            <div key={it.label}>
              <button
                disabled={it.disabled}
                onClick={() => {
                  it.onClick();
                  close();
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-2 h-8 text-left",
                  it.disabled ? "opacity-35 cursor-not-allowed" : it.danger ? "hover:bg-red-600 hover:text-white" : "hover:bg-black hover:text-white"
                )}
              >
                {it.icon}
                <span className="font-semibold whitespace-nowrap">{it.label}</span>
                {it.badge ? <span className="min-w-4 h-4 px-1 rounded-full bg-blue-600 text-white text-[9px] grid place-items-center">{it.badge}</span> : null}
                <span className="ml-auto text-[10px] font-mono opacity-60 whitespace-nowrap">{it.kbd}</span>
              </button>
              {it.divider && <div className="my-1 border-t border-black/15" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LayerMenu({ visibility, onChange }: { visibility: LayerVisibility; onChange: (v: LayerVisibility) => void }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);
  const hidden = LAYER_ROWS.filter(([k]) => !visibility[k]).length;

  return (
    <div ref={ref} className="relative">
      <Seg>
        <TopBtn
          active={open}
          onClick={() => setOpen((o) => !o)}
          icon={hidden ? <EyeOff className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
          label="Layer"
          title="Ẩn/hiện layer"
          badge={hidden || undefined}
          dim={hidden > 0}
        />
      </Seg>
      {open && (
        <div className="absolute left-0 top-9 z-50 w-64 bg-white border border-black shadow-lg text-xs">
          {LAYER_ROWS.map(([k, lbl, sub]) => (
            <label key={k} className="flex items-center gap-2 px-2 h-8 hover:bg-black/5 cursor-pointer">
              <input type="checkbox" checked={visibility[k]} onChange={(e) => onChange({ ...visibility, [k]: e.target.checked })} className="accent-black" />
              <span className="font-semibold whitespace-nowrap">{lbl}</span>
              <span className="ml-auto text-[10px] text-gray-400 whitespace-nowrap">{sub}</span>
            </label>
          ))}
          <div className="border-t border-black/15 flex">
            <button onClick={() => onChange({ floor: true, counter: true, movable: true, decor: true })} className="flex-1 h-7 hover:bg-black hover:text-white">
              Hiện tất cả
            </button>
            <button onClick={() => onChange({ floor: false, counter: true, movable: true, decor: true })} className="flex-1 h-7 border-l border-black/15 hover:bg-black hover:text-white">
              Ẩn sàn
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 pr-1.5 mr-0.5 border-r border-black/15 shrink-0" aria-label={label} title={label}>
      {children}
    </div>
  );
}

function Seg({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center border border-black/70 overflow-hidden h-8">{children}</div>;
}

function TopBtn({
  active,
  onClick,
  icon,
  label,
  title,
  kbd,
  badge,
  disabled,
  dim,
}: {
  active?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
  title?: string;
  kbd?: string;
  badge?: number;
  disabled?: boolean;
  dim?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={kbd ? `${title ?? label ?? ""} (${kbd})` : title}
      disabled={disabled}
      className={cn(
        "relative h-8 px-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide transition-colors whitespace-nowrap border-r border-black/15 last:border-r-0",
        active ? "bg-black text-white" : "bg-white hover:bg-black/5",
        dim && !active && "text-gray-400",
        disabled && "opacity-35 cursor-not-allowed hover:bg-white"
      )}
    >
      {icon}
      {label}
      {kbd && !active && <span className="hidden 2xl:inline text-[9px] font-normal text-gray-400 ml-0.5">{kbd}</span>}
      {badge ? <span className="ml-0.5 min-w-4 h-4 px-1 rounded-full bg-blue-600 text-white text-[9px] grid place-items-center">{badge}</span> : null}
    </button>
  );
}

function NumField({ label, value, onChange, min = 2, max = 40 }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  const [text, setText] = useState(String(value));
  useEffect(() => { setText(String(value)); }, [value]);
  const apply = () => {
    const n = Math.round(Number(text));
    if (!Number.isFinite(n)) { setText(String(value)); return; }
    const clamped = Math.min(max, Math.max(min, n));
    if (clamped !== value) onChange(clamped);
    else setText(String(value));
  };
  return (
    <label className="flex-1 text-xs text-gray-500">
      {label}
      <input
        type="number"
        min={min}
        max={max}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={apply}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); (e.target as HTMLInputElement).blur(); } }}
        className="mt-1 w-full border border-black px-2 h-8 text-sm text-black"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2 text-xs">
      <span className="text-gray-500">{k}</span>
      <span className="font-mono text-right break-all">{v}</span>
    </div>
  );
}
