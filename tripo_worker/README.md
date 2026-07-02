# Tripo 3D worker (VPS)

> **Tài liệu đầy đủ (kiến trúc, API map, runbook, sự cố):**
> [docs/VPS_TRIPO_WORKER.md](../docs/VPS_TRIPO_WORKER.md)

Worker tự động cho queue `/team/3d-gen`: nhận job từ lambda `vinpixstudio`,
dùng Playwright điều khiển https://studio.tripo3d.ai/ (tài khoản đăng nhập sẵn
trong profile Chromium), rồi trả model GLB về S3 qua lambda.

**Bản chạy thật nằm trên VPS Vinahost** `125.212.218.24:/root/tripo-worker/`
(systemd service `tripo-worker`). Thư mục này là bản sao để version-control —
sửa ở đây rồi `scp` lên VPS và `systemctl restart tripo-worker`.

## Luồng hoạt động

```
web /team/3d-gen ──"Tạo 3D"/"Tạo lại"──▶ lambda generateBatch3D / retryBatch3D
                                              │  (webhook :8377/run?token=…)
                                              ▼
                                   worker.mjs trên VPS (poll 5' dự phòng)
                                              │  listBatch3DQueue
                                              ▼
                            tripo.mjs: upload ảnh → Generate Model (55 credits)
                            → theo dõi POST /v2/studio/progress (page tự poll)
                            → lấy data.model_url từ project/detail/v3 (PBR GLB)
                                              │
                                              ▼
                        updateBatch3DJob(success, modelUrl) — lambda tải GLB
                        và lưu vào s3://…/vinpixstudio/3dgen_models/{batch}/{img}.glb
```

Lỗi login/hạ tầng giữ job ở `queued` (tự retry lần chạy sau); chỉ lỗi
generation thật sự mới đánh `failed`.

## Files

- `worker.mjs` — HTTP trigger (`/run`, `/health` — cần `?token=`) + xử lý queue tuần tự
- `tripo.mjs` — Playwright automation studio.tripo3d.ai (đã map API 2026-07-02)
- `login.sh` / `stop-login.sh` / `login-browser.mjs` — đăng nhập Tripo 1 lần qua noVNC (port 6080)
- `tripo-worker.service` — systemd unit (`/etc/systemd/system/`)
- `.env.example` — biến môi trường (bản thật: `/root/tripo-worker/.env`)

## Debug trên VPS

```bash
journalctl -u tripo-worker -f                  # log
ls /root/tripo-worker/debug/                   # screenshot từng bước + api.log
curl "http://localhost:8377/health?token=$TOKEN"
```

Nếu Tripo đổi UI: xem screenshot trong `debug/` và `debug/api.log` để chỉnh
selector trong `tripo.mjs`. Nếu hết hạn đăng nhập (`needLogin: true` trong
health): chạy `bash login.sh`, mở `http://125.212.218.24:6080/vnc.html`,
đăng nhập lại rồi `bash stop-login.sh`.
