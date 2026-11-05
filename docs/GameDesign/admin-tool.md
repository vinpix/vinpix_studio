# Admin Tool (/game_design/admin) — 2026-09-19

Bản web của Unity `KT/Admin Tool` (Assets/Scripts/Editor/Admin/AdminToolWindow.cs), **không cần admin key**:
quyền = cookie team `vinpix_team_session` (middleware + route `/api/game-design`).

Khác với Unity (gọi `kitchenmain2` với `adminKey`), tool web đi qua Lambda `vinpixstudio`
(`vinpix_lambda/src/kt_admin.py`) và sửa thẳng bảng game trong cùng account `lamronny`:
`kitchen2_user` (PK uid, GSI username-index) và `kt_maps` (PK map_id). Không đụng code `kitchenmain2`
(source local đang có nhiều thay đổi chưa deploy).

| function | params | làm gì |
|---|---|---|
| `ktaLookup` | `username` hoặc `uid` | tóm tắt user: ví, levels, owned_maps (kèm title), tutorial, status |
| `ktaSetWallet` | `uid, mode=add\|set, coin?, gem?` | cộng/trừ (sàn 0) hoặc đặt số chính xác |
| `ktaUnlockLevels` | `uid, upTo?, levels?[], stars=3` | mở level 1→N, giữ sao cao hơn, **không** cộng coin thưởng |
| `ktaResetLevels` | `uid, level?` | xoá 1 level hoặc toàn bộ |
| `ktaGrantMap` / `ktaRevokeMap` | `uid, mapId` | ADD/DELETE `owned_maps` (grant kiểm tra map tồn tại, `force:true` bỏ qua) |
| `ktaResetTutorial` | `uid` | `is_pass_tutorial=false` |
| `ktaSearchMaps` | `q, limit≤50` | get_item theo map_id + scan contains(title/creator/map_id), tối đa 4000 item |

UI: `src/components/game-design/admin/AdminTool.tsx`, client `src/features/game-design/admin/api.ts`
(username gần đây lưu localStorage `vinpix.ktAdmin.recent.v1`). Thao tác phá huỷ (đặt ví, xoá level,
thu hồi map, reset tutorial) có confirm. Nhật ký bên phải hiện kết quả từng lệnh.

Deploy Lambda: xem `backend-plan.md`. Test đã chạy trên user tạm `kta_test_0001` (đã xoá).

## Bảo mật phiên (2026-09-20)

`loginTeam` giờ phát token ký HMAC: `"<expires>.<hmac_sha256(TEAM_PASSCODE, expires)[:32]>"`
(`team_tasks._sign_team_token` / `verifyTeamToken`). Route `/api/game-design` gửi cookie làm
`params.teamToken` cho mọi hàm `kta*`, Lambda từ chối 401 nếu token sai/hết hạn. Cookie cũ (uuid)
sẽ bị từ chối ở tool admin → đăng nhập lại 1 lần. Middleware và `gd*` vẫn chỉ kiểm tra cookie tồn tại.

Deployed: Lambda `vinpixstudio` + Cloudflare Worker `vinpix-studio` (`npm run deploy`).
