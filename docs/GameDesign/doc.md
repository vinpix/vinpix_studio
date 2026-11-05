# Game Design Studio

`/game_design` là internal tool cho Kitchen Together. World (quốc gia) là trục chính:

| Route | Việc | Component |
| --- | --- | --- |
| `/game_design/worlds` | Danh sách world (card: preview map, số level/món, độ khó) | `studio/WorldsIndex.tsx` |
| `/game_design/worlds/[id]?tab=levels` | Strip level, ma trận món/level (chỉ đọc), panel level: map, thời gian, độ khó, **mở món mới** (nơi duy nhất), sao, ghi chú | `studio/tabs/LevelsTab.tsx` |
| `/game_design/worlds/[id]?tab=dishes` | Lưới món + editor: nguyên liệu → sơ chế (1 nguyên liệu / bước) → trạm hoàn thiện | `studio/tabs/DishesTab.tsx` |
| `/game_design/worlds/[id]?tab=settings` | Tên, cờ, theme, mô tả, màu, trạm mặc định | `studio/tabs/SettingsTab.tsx` |
| `/game_design/map_studio?map=<id>&back=<levelId>` | Editor 2D/3D; có `back` thì hiện thanh "Về level" | `GameDesignApp.tsx` + `studio/MapStudioClient.tsx` |

## Dữ liệu

- Toàn bộ dữ liệu là dummy, lưu localStorage: `vinpix.gameDesign.studio.v1` (worlds/dishes/levels)
  và `vinpix.gameDesign.maps.v1` (map workspace). Nút "Reset dummy data" ở sidebar nạp lại seed.
- Model & seed: `src/features/game-design/studio/{types,seed,store}.ts`.
- `Level.mapId` trỏ tới `MapDoc.id` trong workspace. Store tự tạo map mẫu cho level seed và level mới.
- Món "khả dụng" ở một level = mọi món có trong `newDishIds` của level đó và các level trước nó
  (xem `availableDishIds`). Một món chỉ mở lần đầu ở tối đa một level.

## Map editor

- `MapScene3D.tsx` sở hữu scene 3D, nắng, env map, mặt sàn hứng bóng (shadowMaterial trong suốt).
- Lighting mặc định trong `viewSettings.ts` (key localStorage v5). Xem [3D shadows](./shadows.md).
- Tool Vẽ: click 1 ô hoặc kéo tô vùng chữ nhật; chuột phải kéo xoá vùng. Tool Chọn: kéo để quét
  vùng, chỉ khi kéo object đã chọn mới di chuyển.

Plan gốc: [studio-plan.md](./studio-plan.md).

## Model 3D từ Kitchen Together Unity

- Nguồn: `~/kitchen-together-root/Kitchen Together Unity/Assets/Resources/MapObjectCatalog.asset` (69 object đặt được trong game). Catalog web `src/features/game-design/catalog.ts` phủ đủ 69 mục (kể cả alias `oven`, `bowl_counter`, `meat_uncook_counter`).
- 46 GLB gốc lấy từ Godot export (`public/map-preview/object-manifest.json`). 26 GLB còn lại (Sài Gòn decor, lò than, nồi cơm, thùng nguyên liệu mới, xe sườn…) build bằng Blender 2.93 từ prefab Unity: `scripts/blender/build_unity_map_assets.py` (chạy `blender -b --python scripts/blender/build_unity_map_assets.py -- <key...>`). Quy tắc: Unity → glTF mirror X; FBX Tripo giữ nguyên hướng Blender import, scale Unity ≥ 50 chia 100.
- Kiểm tra phủ: script tạm `coverage.ts` (resolveCatalogEntry cho mọi godotType/objectType Unity) — mọi mục phải resolve và có file.
