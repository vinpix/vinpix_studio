# Game Design Studio — gắn backend (plan, 2026-09-19)

Hiện trạng: `/game_design` (worlds / levels / món / map) lưu toàn bộ ở localStorage
(`vinpix.gameDesign.studio.v1`, `vinpix.gameDesign.maps.v1`), không auth, không share
được giữa máy. Mục tiêu: dữ liệu nằm trên DynamoDB qua Lambda `vinpixstudio` (account
`lamronny`), tự lưu khi chỉnh, chặn người lạ bằng passcode team.

## Kiến trúc

```
Browser (/game_design)
  store.ts (worlds/dishes/levels, in-memory) ─┐
  mapStore.ts (MapDoc list, in-memory)        ├─ sync.ts: hàng đợi lưu (debounce 600ms, gộp, retry)
                                              ▼
  POST /api/game-design  { function: "gd*", params }   ← cookie vinpix_team_session bắt buộc
                                              ▼
  Lambda vinpixstudio  → src/game_design.py → DynamoDB vinpix_game_design (PK pk, SK sk)
```

### DynamoDB `vinpix_game_design` (on-demand)

| pk      | sk        | nội dung                      |
|---------|-----------|-------------------------------|
| WORLD   | worldId   | World (JSON fields)           |
| DISH    | dishId    | Dish                          |
| LEVEL   | levelId   | Level                         |
| MAP     | mapId     | MapDoc (objects[] đầy đủ)     |

Mỗi item thêm `updatedAt` (ISO). Số float → Decimal khi ghi, về int/float khi đọc.

### Lambda functions (prefix `gd`)

| function | params | trả về |
|----------|--------|--------|
| `gdLoad` | – | `{ worlds, dishes, levels, maps, empty }` |
| `gdSave` | `{ worlds?, dishes?, levels?, maps?, deletes?: [{kind,id}] }` | `{ ok, savedAt, counts }` — batch upsert/xoá |
| `gdReset` | `{ confirm: true }` | xoá sạch bảng (client seed lại ngay sau đó) |

### Next.js

- `src/app/api/game-design/route.ts`: proxy tới `LAMBDA_FUNCTION_URL`, chỉ cho `gd*`,
  từ chối 401 nếu thiếu cookie `vinpix_team_session`.
- `middleware.ts`: guard `/game_design/*` bằng cùng cookie team; chưa login →
  `/team/login?next=<path>`; trang login đọc `next` (chỉ nhận path nội bộ).

### Frontend

- `studio/sync.ts`: `gdCall()`, `SyncQueue` (pending theo `KIND#id`, flush debounce, trạng
  thái `idle | saving | saved | error`, retry 3s khi lỗi), `useSyncStatus()`.
- `studio/store.ts`: bỏ localStorage; `load()` gọi `gdLoad` (rỗng → đẩy SEED + map mẫu
  lên server); `write()` diff state cũ/mới → enqueue upsert/delete. API `studio.*`,
  `useStudio()` giữ nguyên cho component. Thêm `useStudioStatus()`.
- `mapStore.ts`: danh sách MapDoc in-memory + `upsert/remove`, đồng bộ qua SyncQueue;
  `useMapStore()` thay `useMaps`. `activeId` của editor vẫn để localStorage (UI pref).
- `GameDesignApp.tsx`: `ws.maps` lấy từ mapStore, mọi mutation gọi `mapStore.upsert/remove`
  (autosave lên server), bỏ `loadWorkspace/saveWorkspace`.
- `StudioShell.tsx`: gọi `load()` khi mount, hiện màn "Đang tải" / lỗi + nút thử lại; góc
  dưới hiện trạng thái lưu; nút Reset → `gdReset` + seed lại (confirm).

## Thứ tự làm

1. `vinpix_lambda/src/game_design.py` + dispatcher; tạo bảng; zip + `update-function-code`;
   smoke test bằng curl (`gdLoad`).
2. API route + middleware + login `next`.
3. sync.ts, store.ts, mapStore.ts; sửa GameDesignApp, useMaps, StudioShell.
4. `tsc --noEmit`, eslint, smoke test trình duyệt tại `localhost:3002/game_design`.

## Trạng thái (2026-09-19)

Đã làm xong và deploy: bảng `vinpix_game_design` (lamronny, ap-southeast-1), Lambda `vinpixstudio`
có `gdLoad/gdSave/gdReset`, route `/api/game-design`, middleware guard, store/mapStore/sync,
editor autosave. Smoke test: tải từ server, sửa tên level, vẽ map → server nhận, badge "Đã lưu".
Deploy Lambda: `cd vinpix_lambda && zip -qr ../vinpix_lambda.zip lambda_function.py src -x '*__pycache__*'
&& aws --profile lamronny --region ap-southeast-1 lambda update-function-code --function-name vinpixstudio --zip-file fileb://../vinpix_lambda.zip`.

## Ngoài phạm vi

- Multi-user realtime / conflict resolution (last-write-wins theo record).
- Export map sang bảng `kt_maps` của game (vẫn dùng nút Export JSON).
