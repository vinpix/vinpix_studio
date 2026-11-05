"""Build map-preview GLBs from Kitchen Together Unity prefabs (missing entries only).
Unity space -> glTF space: mirror X (pos.x = -x; quat = (x,-y,-z,w)). Blender is Z-up;
glTF exporter maps Blender (x,y,z) -> glTF (x,z,-y), so a glTF-space transform is written
into Blender as pos (x,-z,y), quat (w, x,-z,y)."""
import bpy, json, math, os, sys
from mathutils import Vector, Quaternion, Matrix
U = "/Users/kietle/kitchen-together-root/Kitchen Together Unity/Assets/Art/Imported/"
OUT = "/Users/kietle/Desktop/Development/next_project/vinpix_studio/public/map-preview/assets/"
REPORT = os.path.join(os.path.dirname(__file__), "build_report.json")
PICKLE_Q = (-0.0, 0.9277, 0.0, 0.3733)  # unity instance rot with the FBX -90X importer fix removed (yaw ~136deg)

def uq(q):  # unity (x,y,z,w) -> Quaternion(w,x,y,z)
    return Quaternion((q[3], q[0], q[1], q[2]))

# parts: (file, unity_pos, unity_quat_xyzw, unity_scale, opts)
SPEC = {
  "lo_than_counter":      [("SaiGon/lo_than.glb", (0,0,0), (0,0,0,1), (1,0.65,1), {})],
  "noi_com":              [("Restaurant/NoiCom/noi_com_lo_than.fbx", (0,0,0), (0,0.7071,0,0.7071), (2.5,1.71,2.5), {"fbx_tripo":True})],  # instance -90X already stripped
  "food_spawn":           [("Restaurant/crate.gltf", (0,0,0), (0,0,0,1), (1,1,1), {})],
  "carrot_counter":       [("Restaurant/crate_carrots.gltf", (0,0,0), (0,0,0,1), (1,1,1), {})],
  "ham_counter":          [("Restaurant/crate_ham.gltf", (0,0,0), (0,0,0,1), (1,1,1), {})],
  "potato_counter":       [("Restaurant/crate_potatoes.gltf", (0,0,0), (0,0,0,1), (1,1,1), {})],
  "pickle_counter":       [("Restaurant/crate.gltf", (0,0,0), (0,0,0,1), (1,1,1), {}),
                           ("Restaurant/ComSuon/food/a bunch of pickle.fbx", (0,0.173,0), PICKLE_Q, (2.29,2.29,2.29), {"fbx_tripo":True})],
  "rice_raw_counter":     [("Restaurant/crate.gltf", (0,0,0), (0,0,0,1), (1,1,1), {}),
                           ("Restaurant/ComSuon/food/rices.fbx", (0,0.88,0), (0,0,0,1), (1.88,1.88,1.88), {"fbx_tripo":True})],
  "suon_raw_counter":     [("Restaurant/ComSuon/food_truct/food_truct.fbx", (0,0,0), (0,0,0,1), (2,2,2), {"fbx_tripo":True})],
  "pizza_oven":           [("Restaurant/pizza_oven.gltf", (0,0,0), (0,0,0,1), (1,1,1), {})],
}
for n in "bike clock conveyer_art cot_den cot_dien gach random_asian_object saigon_wall shop sign street_plat table_and_chair tru_nuoc vegetable_store xe".split():
    SPEC[n] = [("SaiGon/"+n+".glb", (0,0,0), (0,0,0,1), (1,1,1), {})]

def import_file(path):
    before = set(bpy.data.objects)
    if path.lower().endswith(".fbx"):
        bpy.ops.import_scene.fbx(filepath=path)
    else:
        bpy.ops.import_scene.gltf(filepath=path)
    new = [o for o in bpy.data.objects if o not in before]
    roots = [o for o in new if o.parent is None or o.parent not in new]
    return new, roots

def fix_fbx_textures(objs, folder):
    """Blender's FBX importer often loses the albedo (different file name). Bind the first png next to the fbx."""
    pngs = [f for f in os.listdir(folder) if f.lower().endswith(".png") and not any(k in f.lower() for k in ("normal","metallic","rough","smooth"))]
    if not pngs: return
    img = bpy.data.images.load(os.path.join(folder, pngs[0]))
    for o in objs:
        if o.type != "MESH": continue
        for slot in o.material_slots:
            m = slot.material
            if not m: continue
            m.use_nodes = True
            bsdf = next((n for n in m.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
            if not bsdf: continue
            linked = bsdf.inputs["Base Color"].links
            if linked and linked[0].from_node.type == "TEX_IMAGE" and linked[0].from_node.image and linked[0].from_node.image.has_data:
                continue
            tex = m.node_tree.nodes.new("ShaderNodeTexImage"); tex.image = img
            m.node_tree.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])

report = {}
ONLY = set(sys.argv[sys.argv.index("--")+1:]) if "--" in sys.argv else None
for key, parts in SPEC.items():
    if ONLY and key not in ONLY: continue
    bpy.ops.wm.read_factory_settings(use_empty=True)
    root = bpy.data.objects.new("MapPreviewExportRoot", None)
    bpy.context.scene.collection.objects.link(root)
    for (file, pos, quat, scl, opts) in parts:
        path = U + file
        objs, roots = import_file(path)
        if file.lower().endswith(".fbx"):
            fix_fbx_textures(objs, os.path.dirname(path))
        q = uq(quat)
        s = Vector(scl)
        if opts.get("fbx_tripo"):
            # Unity keeps Tripo FBX at 1/100 (cm); Blender already imports meters. Strip the -90X importer fix.
            if max(s) >= 50: s = s / 100.0
        # unity -> gltf (mirror X)
        gp = Vector((-pos[0], pos[1], pos[2]))
        gq = Quaternion((q.w, q.x, -q.y, -q.z))
        gs = Vector((s.x, s.y, s.z))
        # gltf -> blender (Y-up -> Z-up)
        holder = bpy.data.objects.new(key + "_part", None)
        bpy.context.scene.collection.objects.link(holder)
        holder.parent = root
        holder.location = Vector((gp.x, -gp.z, gp.y))
        holder.rotation_mode = "QUATERNION"
        holder.rotation_quaternion = Quaternion((gq.w, gq.x, -gq.z, gq.y))
        holder.scale = Vector((gs.x, gs.z, gs.y))
        for r in roots:
            r.parent = holder
    bpy.context.view_layer.update()
    mn = Vector((1e9,)*3); mx = Vector((-1e9,)*3)
    for o in bpy.data.objects:
        if o.type != "MESH": continue
        for c in o.bound_box:
            w = o.matrix_world @ Vector(c)
            mn = Vector(map(min, mn, w)); mx = Vector(map(max, mx, w))
    size = mx - mn
    out = OUT + key + ".glb"
    bpy.ops.export_scene.gltf(filepath=out, export_format="GLB", export_apply=True, export_lights=False, export_cameras=False)
    report[key] = {"size_x": round(size.x,2), "size_z": round(size.y,2), "height": round(size.z,2), "min_y": round(mn.z,2), "bytes": os.path.getsize(out)}
    print("BUILT", key, report[key])
json.dump(report, open(REPORT, "w"), indent=1)
