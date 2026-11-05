# Game Design Studio — plan (Worlds · Levels · Map Studio · Recipes)

Mục tiêu: designer vẽ layout 2D → map 3D hiện ra (đã có), và thiết kế công thức món ăn theo
từng quốc gia (world), mỗi world có nhiều level, một số level mở món mới. Dữ liệu lưu trên DynamoDB qua Lambda
`vinpixstudio` (xem `backend-plan.md`); dữ liệu mẫu chỉ được seed khi bảng rỗng.

## Kiến trúc

```
src/app/game_design/
  layout.tsx            shell: sidebar trái (Worlds / Levels / Map Studio / Recipes)
  page.tsx              redirect → /game_design/worlds
  worlds/page.tsx       danh sách world + chi tiết (Overview / Dishes / Levels) + panel settings
  levels/page.tsx       progression strip theo world + ma trận "món / level" + panel level
  recipes/page.tsx      lưới món ăn + recipe flow (nguyên liệu → trạm → món)
  map_studio/page.tsx   GameDesignApp (editor 2D/3D hiện tại), nhận ?map=<id>

src/features/game-design/studio/
  types.ts              World, Dish, Level, Station, RecipeStep
  seed.ts               dữ liệu dummy: Italy, Japan, Vietnam, Mexico + maps mẫu
  store.ts              localStorage + useSyncExternalStore, actions (add/update/remove/reorder)

src/components/game-design/studio/
  StudioShell.tsx       sidebar + header breadcrumb (brand: viền đen 2px, nền trắng, caps label)
  ui.tsx                Panel, Label, Pill, StatusBadge, DifficultyDots, Stars, EmptyState
  WorldsView.tsx        list + tabs + world settings
  LevelsView.tsx        strip level, dish availability matrix, level detail
  RecipesView.tsx       dish cards + recipe editor
```

## Data model

- **World**: id, name, flag (emoji), region, description, theme, status (active|draft),
  defaultStations[], dishIds[] (thứ tự), levelIds[] (thứ tự).
- **Dish**: id, worldId, name, emoji, ingredients[] (catalog key: tomato counter…),
  stations[] (chop|stove|oven|chill|assemble), steps[] (recipe flow), status (ready|draft).
- **Level**: id, worldId, code "1.3", name, mapId (MapDoc id trong workspace), durationSec,
  players [min,max], difficulty 1–5, dishIds[] (khả dụng), newDishIds[] (mở lần đầu),
  stars {one,two,three} + mô tả.
- Món "khả dụng từ level X trở đi" được suy ra: level i có dish d nếu có level j ≤ i trong cùng
  world mà d ∈ newDishIds(j). Ma trận ở Levels hiển thị cam = mở mới, xanh = có sẵn.

## Liên kết Map Studio

- Level.mapId trỏ tới MapDoc trong workspace hiện có (`vinpix.gameDesign.workspace`).
- Seed tạo sẵn map cho mỗi level (biến thể từ starterMap) nếu workspace chưa có id đó.
- "Mở trong Map Studio" → `/game_design/map_studio?map=<id>`; editor chọn map đó làm active.
- Card level hiển thị preview 2D vẽ bằng SVG từ MapDoc (màu tile theo catalog).

## Brand

Giữ ngôn ngữ hiện có của editor: nền `#f0f0f0`, panel trắng viền đen 2px, label caps
tracking-wider, `btn-outline` / `btn-solid`, font Lexend, tiếng Việt, copy ngắn gọn. Không dùng
sidebar xanh lá của concept; sidebar đen-trắng, mục active nền đen chữ trắng.

## Thứ tự làm

1. types + seed + store
2. shell + routes, GameDesignApp chạy trong content (h-full, nhận ?map)
3. Worlds view  4. Levels view  5. Recipes view  6. tsc + eslint + smoke test trong browser
