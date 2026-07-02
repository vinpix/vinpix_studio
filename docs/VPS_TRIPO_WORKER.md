# VPS Vinahost & Tripo 3D Worker — Tài liệu vận hành

> Xây dựng 2026-07-02. Đây là tài liệu "đào lại" cho toàn bộ hệ thống tạo model 3D
> tự động của tab **/team/3d-gen**: từ lúc bấm "Tạo 3D" trên web đến khi file GLB
> nằm trên S3 và hiện trong viewer — tất cả chạy qua một con VPS Vinahost.
> Bản sao code worker nằm trong repo tại [`tripo_worker/`](../tripo_worker/).

---

## 1. Tổng quan — vì sao có hệ thống này

Tài khoản Tripo (vinpix7@gmail.com) **không có API key** (gói starter chỉ dùng
được web studio). Để tự động hoá image→3D, một worker trên VPS dùng **Playwright
điều khiển studio.tripo3d.ai** bằng phiên đăng nhập thật (Chromium profile lưu
sẵn cookie Google), nhưng đọc trạng thái qua **API nội bộ** của Tripo (bắt được
từ network traffic) thay vì click mò UI — nên vừa không cần API key, vừa bền khi
Tripo đổi giao diện.

Nguyên tắc thiết kế quan trọng:
- **VPS không giữ bất kỳ AWS credential nào.** Mọi thứ đi qua Lambda: ảnh nguồn
  tải bằng presigned URL, model trả về bằng cách đưa URL cho lambda tự tải.
- **Lỗi hạ tầng không phá job.** Chưa login / mạng lỗi → job giữ nguyên `queued`
  và tự thử lại; chỉ lỗi generation thật mới đánh `failed`.
- **Một worker duy nhất, chạy tuần tự** (VPS chỉ có 2GB RAM, dùng chung với
  GlitchTip).

## 2. Thông tin VPS

| Mục | Giá trị |
|---|---|
| Nhà cung cấp | Vinahost (gói CheapSSD 2) |
| IP | `125.212.218.24` (hostname `56297.vpsvinahost.vn`) |
| OS / phần cứng | Ubuntu 24.04 · 25GB disk · 2GB RAM + **4GB swap** (2 swapfile) |
| Đăng nhập | `root`, password auth (hỏi chủ dự án) **hoặc** SSH key `~/.ssh/id_ed25519` của máy dev (key RSA cũ bị server từ chối) |
| SSH | `ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes root@125.212.218.24` |

### Port đã mở (ufw)

| Port | Dùng cho |
|---|---|
| 22 | SSH |
| 80/443 | nginx (GlitchTip) |
| **8377** | Webhook + health của tripo-worker (bảo vệ bằng `?token=` trong `.env`) |
| **6080** | noVNC — chỉ dùng khi cần đăng nhập lại Tripo |

### Các dịch vụ trên VPS

| Dịch vụ | Chạy bằng | Ghi chú |
|---|---|---|
| **tripo-worker** | systemd `tripo-worker.service` | Chủ đề của tài liệu này. `MemoryMax=1400M` để không chèn ép GlitchTip |
| GlitchTip 6 + Postgres 18 | docker-compose tại `/root/glitchtip/` | Error tracker, web :8000 sau nginx. DB ~6.7GB (chiếm phần lớn disk). Prune crons tại `/etc/cron.d/glitchtip-retention` |
| nginx | systemd | Reverse proxy cho GlitchTip |

Disk thường ở ~68-70%. Muốn giải phóng thêm ~3GB: giảm
`GLITCHTIP_EVENT_RETENTION_DAYS` 30→14 trong docker-compose.yml của GlitchTip.

## 3. Kiến trúc pipeline 3D Gen

```
  Web /team/3d-gen ("Tạo 3D" / "Tạo lại" / nút huỷ)
        │ POST /api/lambda
        ▼
  Lambda vinpixstudio (ap-southeast-1)  ──── DynamoDB vinpix_team_tasks
        │  generateBatch3D / retryBatch3D:        (pk=BATCH, images[].model3d)
        │  đánh dấu queued + fire webhook
        ▼  POST http://125.212.218.24:8377/run?token=…   (best-effort, timeout 3s)
  ┌──────────────────────── VPS ────────────────────────┐
  │ worker.mjs (systemd, single-flight, poll 5' dự phòng)│
  │   1. listBatch3DQueue  ← kéo job queued/running      │
  │   2. re-check job còn trong queue (chống huỷ-race)   │
  │   3. getPresignedUrl → tải ảnh nguồn về tmp/         │
  │   4. tripo.mjs (Playwright, Chromium profile ./profile)
  │      • goto /workspace/generate                      │
  │      • setInputFiles → upload thẳng lên S3 của Tripo │
  │      • click "Generate Model" (HD v3.1 = 55 credits) │
  │      • tap image_to_model → lấy taskId + projectId   │
  │      • page tự poll /v2/studio/progress (~3s/lần)    │
  │      • xong → lấy data.model_url từ project detail   │
  │   5. updateBatch3DJob(success, modelUrl, taskId)     │
  │   6. pushCredits → updateTripoStatus (badge trên web)│
  └──────────────────────────────────────────────────────┘
        │ (bước 5: LAMBDA tự tải GLB từ CDN Tripo)
        ▼
  S3 springboard2025 / vinpixstudio/3dgen_models/{batchId}/{imageId}.glb
        │
        ▼
  Web poll getBatch3DStatus (8s) → "Xem 3D" (three.js + MeshoptDecoder)
```

Thời gian thực tế: **~3.5 phút/model** kể từ lúc bấm (webhook đánh thức worker
sau ~2 giây; generation phía Tripo ~2.5-3 phút).

## 4. Files trên VPS — `/root/tripo-worker/`

| File | Vai trò |
|---|---|
| `worker.mjs` | HTTP server (`/run`, `/health` — cần `?token=`) + vòng xử lý queue + đồng bộ credits |
| `tripo.mjs` | Toàn bộ automation studio.tripo3d.ai + `fetchCredits()` |
| `.env` | **Secrets thật** (không có trong git): `LAMBDA_URL`, `WORKER_TOKEN`, `PORT=8377`, `POLL_INTERVAL_SEC=300`, `HEADLESS=1`, `JOB_TIMEOUT_MIN=20`, `VNC_PASS` |
| `profile/` | Chromium profile — **chứa phiên đăng nhập Tripo/Google**. Xoá là phải login lại |
| `token.json` | Bearer token của Tripo API (tự ghi mỗi lần browser chạy; `fetchCredits` dùng để khỏi mở browser) |
| `login.sh` / `stop-login.sh` / `login-browser.mjs` | Luồng đăng nhập 1 lần qua noVNC (mục 7) |
| `debug/` | Screenshot từng bước + `api.log` (traffic API Tripo) — nhìn vào đây khi selector hỏng |
| `tmp/` | Ảnh nguồn tải tạm (xoá sau khi job xong) |
| `ui-profile/`, `probe*.mjs`, `ui_*.mjs` | Profile + script test UI production (di sản các phiên test, giữ để tái dùng) |
| `/etc/systemd/system/tripo-worker.service` | Unit file (bản sao trong repo) |

**Deploy update:** sửa file trong `tripo_worker/` của repo → `scp` lên
`/root/tripo-worker/` → `systemctl restart tripo-worker`.

## 5. API nội bộ của Tripo studio (map 2026-07-02)

Base `https://api.tripo3d.ai`, auth `Authorization: Bearer <JWT ~372 ký tự>`
(lấy từ request của trang), **bắt buộc** kèm header `origin` + `referer` =
`https://studio.tripo3d.ai` (thiếu → lỗi 1017 "invalid domain").

| Endpoint | Ý nghĩa |
|---|---|
| `POST /v2/studio/storage/temporary_token` | Trang xin credential upload ảnh (upload đi thẳng S3 của Tripo, không qua api.*) |
| `POST /v2/studio/audit/image` | Kiểm duyệt ảnh (chạy khi bấm Generate) |
| `POST /v2/studio/operation/image_to_model` | **Tạo task.** Response: `data.operator_id` (= taskId), `data.project_id`. Body chứa settings (v3.1, pbr, texture detailed, face_limit 2M…) |
| `POST /v2/studio/progress` `{ids:[taskId]}` | Trạng thái: `status` (running/success/failed), `progress`, `left_time`. Trang tự poll ~3s/lần — worker chỉ tap response |
| `GET /v2/studio/project/detail/v3/{projectId}` | Sau khi success: `data.model_url` = **GLB PBR cuối** (signed CDN, dạng `tripo_pbr_model_{taskId}_meshopt.glb` — nén meshopt) |
| `GET /v2/studio/user/profile/payment` | Ví: `data.wallet.total_credit`, `expiring_credit`, `member.type` — nguồn của badge credits |

Chi phí: **HD v3.1 = 55 credits/model.**

## 6. Các lambda function liên quan (`vinpix_lambda/src/batch_3d.py`)

| Function | Ai gọi | Làm gì |
|---|---|---|
| `generateBatch3D` | Web | Đánh dấu ảnh `queued` + fire webhook `WORKER_3D_WEBHOOK_URL` (env var của lambda) |
| `retryBatch3D` | Web (nút "Tạo lại") | Requeue ảnh đã xong/lỗi. **Không xoá GLB cũ** — model mới ghi đè cùng key; giữ `prevModelKey/prevTaskId` để huỷ được |
| `cancelBatch3DJob` | Web (nút ✕ khi "Chờ xử lý") | Chỉ huỷ được khi còn `queued` → khôi phục model cũ (hoặc về `none`). Worker re-check queue trước mỗi job nên huỷ kịp trong ~15-20s đầu = 0 credits |
| `getBatch3DStatus` | Web (poll 8s) | Trả batch as-is |
| `listBatch3DQueue` | **Worker** | Kéo job queued/running (batchId, imageId, key ảnh, prompt) |
| `updateBatch3DJob` | **Worker** | Ghi kết quả. `status=success` + `modelUrl` → lambda **tự tải GLB** và lưu `3dgen_models/{batchId}/{imageId}.glb` |
| `updateTripoStatus` / `getTripoStatus` | Worker / Web | Snapshot ví Tripo (DynamoDB `pk=WORKER_STATUS sk=tripo`) → badge credits trên board (poll 60s, vàng <3 model, đỏ <1) |

Deploy lambda: `cd vinpix_lambda && zip -r ../vinpix_lambda.zip . && aws lambda
update-function-code --function-name vinpixstudio --zip-file
fileb://../vinpix_lambda.zip` (region ap-southeast-1; `update-function-code`
KHÔNG đụng env vars — nhưng `update-function-configuration` thì ghi đè toàn bộ,
phải merge env cũ trước).

## 7. Đăng nhập Tripo (khi session hết hạn)

Dấu hiệu: `/health` trả `needLogin: true`, hoặc log ghi "Chưa đăng nhập Tripo".
Job sẽ **nằm yên ở queued**, không mất gì.

```bash
ssh root@125.212.218.24
bash /root/tripo-worker/login.sh
# → mở http://125.212.218.24:6080/vnc.html trên máy bạn
#   (password VNC nằm trong /root/tripo-worker/.env)
# → đăng nhập studio.tripo3d.ai bằng Google vinpix7@gmail.com
# → xong: Ctrl+C, hoặc chạy: bash /root/tripo-worker/stop-login.sh
```

Worker tự restart sau khi stop-login và xử lý tiếp queue.

## 8. Runbook — lệnh thường dùng

```bash
# Trạng thái nhanh (từ bất kỳ đâu)
curl "http://125.212.218.24:8377/health?token=$WORKER_TOKEN"
# → {running, needLogin, lastError, processed, failed, credits}

# Đánh thức worker xử lý queue ngay
curl -X POST "http://125.212.218.24:8377/run?token=$WORKER_TOKEN"

# Trên VPS
journalctl -u tripo-worker -f          # log realtime
systemctl restart tripo-worker         # restart worker
ls -t /root/tripo-worker/debug/ | head # screenshot debug mới nhất
df -h / && free -h                     # disk / RAM

# Test nhanh queue từ máy dev (lambda function URL trong .env.local của repo)
curl -s -X POST "$LAMBDA_URL" -H 'Content-Type: application/json' \
  -d '{"function":"listBatch3DQueue","params":{}}'
```

## 9. Sự cố thường gặp

| Triệu chứng | Nguyên nhân | Xử lý |
|---|---|---|
| Job kẹt `queued` mãi | Worker chết / chưa login | `systemctl status tripo-worker`; xem `/health` → nếu `needLogin` làm mục 7 |
| Job `failed` với lỗi selector/timeout | Tripo đổi UI | Xem screenshot trong `debug/` + `debug/api.log`, sửa selector/endpoint trong `tripo.mjs`, scp lên, restart, bấm "Tạo lại" trên web |
| `image_to_model code≠0` | Hết credits / ảnh bị kiểm duyệt chặn | Xem message trong lỗi; nạp credits hoặc đổi ảnh |
| Badge credits không cập nhật | Token stale + queue rỗng lâu | Tự hồi mỗi giờ (sync hourly có fallback mở browser); ép ngay: `curl -X POST …/run?token=…` |
| "Xem 3D" không load model | GLB meshopt cần decoder | Đã gắn `MeshoptDecoder` trong `Model3DViewer.tsx` — kiểm tra console trình duyệt |
| VPS hết RAM / OOM | Chromium + GlitchTip đụng nhau | Worker có `MemoryMax=1400M` + 4GB swap; nếu vẫn kẹt: `systemctl restart tripo-worker` |
| Cả 2 job test đầu tiên fail kiểu `waitForResponse timeout` | (đã fix 2026-07-02) upload không đi qua endpoint đoán ban đầu | Không tái diễn — flow hiện tại dựa trên endpoint đã verify ở mục 5 |

## 10. Secrets nằm ở đâu (KHÔNG có trong git)

| Secret | Vị trí |
|---|---|
| Root password VPS | Chủ dự án giữ (Vinahost portal) |
| `WORKER_TOKEN` (webhook/health) | `/root/tripo-worker/.env` **và** lambda env `WORKER_3D_WEBHOOK_URL` |
| `VNC_PASS` | `/root/tripo-worker/.env` |
| Phiên Google/Tripo | `/root/tripo-worker/profile/` (cookie) + `token.json` (bearer, ngắn hạn) |
| AWS | **Không có trên VPS** — chỉ lambda có quyền S3/DynamoDB |

## 11. Mốc lịch sử

- **2026-07-02** — Xây toàn bộ: dọn VPS, cài Node 22 + Playwright, map API Tripo
  (probe2/probe3/probe4), worker end-to-end (3 model batch concept1), webhook
  lambda→VPS, tính năng retry + cancel + confirm modal + camera fit
  (commits `a4d497c`, `6733692`, badge credits), test full trên production.
- Ghi chú AI-session chi tiết hơn: memory `tripo-vps-worker` của Claude Code
  (máy dev, `~/.claude/projects/...-vinpix-studio/memory/`).
