# Stream Chat với Gemini — Cách triển khai

Tài liệu mô tả cách build trang `/chat-test`: chat với Gemini nhưng response **stream về từng token** thay vì trả 1 cục.

## Kiến trúc tổng quan

```
Browser (page.tsx)
   │  POST /api/chat-test  { messages, model }
   ▼
Next.js Route Handler (route.ts, runtime=nodejs)
   │  ai.models.generateContentStream(...)
   ▼
Gemini API  ──►  trả về chunk dần dần
   │
   │  mỗi chunk → đẩy 1 dòng SSE: data: {"delta":"..."}\n\n
   ▼
Browser đọc ReadableStream, parse SSE, append text vào bong bóng model → chữ hiện dần
```

Điểm mấu chốt: **không `await` toàn bộ response**. Dùng `generateContentStream` (async iterable) ở server, bọc trong một `ReadableStream`, client đọc bằng `response.body.getReader()`.

## Stack

- Next.js 15.5.9 (App Router, `src/app`)
- SDK: `@google/genai@2.8.0` (`bun add @google/genai`)
- Transport: **SSE** (Server-Sent Events) — text-based, đơn giản, không cần WebSocket
- Key: `GEMINI_API_KEY` trong `.env.local` (copy từ Lambda env `geminiAPIKey`)

## File tạo ra

| File | Vai trò |
|------|---------|
| `src/app/api/chat-test/route.ts` | Route handler — gọi Gemini, stream SSE về client |
| `src/app/chat-test/page.tsx` | UI client — gửi message, đọc stream, render token dần |
| `.env.local` | Thêm `GEMINI_API_KEY=` |

## 1. Server: stream từ Gemini → SSE

File: `src/app/api/chat-test/route.ts`

### Cấu hình runtime

```ts
export const runtime = "nodejs";        // cần Node runtime để stream từ SDK
export const dynamic = "force-dynamic"; // không cache response streaming
```

### Logic chính

1. Đọc `messages` (lịch sử chat) hoặc `message` (1 câu) từ body.
2. Map sang format SDK: `{ role, parts: [{ text }] }`.
3. Gọi `ai.models.generateContentStream({ model, contents })` → trả **async iterable**.
4. Bọc trong `ReadableStream`. Mỗi chunk → encode thành 1 message SSE.

```ts
const ai = new GoogleGenAI({ apiKey });

const contents = history.map((m) => ({
  role: m.role,
  parts: [{ text: m.text }],
}));

const encoder = new TextEncoder();
const send = (controller, payload) =>
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));

const stream = new ReadableStream({
  async start(controller) {
    try {
      const result = await ai.models.generateContentStream({ model, contents });
      for await (const chunk of result) {
        const delta = chunk.text;          // text của riêng chunk này
        if (delta) send(controller, { delta });
      }
      send(controller, { done: true });
    } catch (error) {
      send(controller, { error: error.message });
    } finally {
      controller.close();
    }
  },
});

return new Response(stream, {
  headers: {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  },
});
```

### Giao thức SSE

Mỗi event là 1 dòng `data: <json>` kết thúc bằng `\n\n`:

| Payload | Ý nghĩa |
|---------|---------|
| `{"delta":"..."}` | 1 mẩu text mới |
| `{"done":true}` | stream xong sạch |
| `{"error":"..."}` | lỗi khi generate |

> `\n\n` là **bắt buộc** — đó là dấu phân cách 1 event trong chuẩn SSE. Client tách stream theo `\n\n`.

## 2. Client: đọc stream, render dần

File: `src/app/chat-test/page.tsx` (`"use client"`)

### Đọc ReadableStream

```ts
const res = await fetch("/api/chat-test", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: history, model }),
});

const reader = res.body.getReader();
const decoder = new TextDecoder();
let buffer = "";

while (true) {
  const { value, done } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split("\n\n");
  buffer = lines.pop() ?? "";   // giữ lại mẩu chưa đủ \n\n cho vòng sau

  for (const line of lines) {
    if (!line.trim().startsWith("data:")) continue;
    const payload = JSON.parse(line.trim().slice(5).trim());
    if (payload.error) throw new Error(payload.error);
    if (payload.done) continue;
    if (payload.delta) appendToLastMessage(payload.delta);
  }
}
```

### Mấu chốt phía client

- **Buffer dở dang**: 1 lần `reader.read()` có thể cắt giữa event. Tách theo `\n\n`, phần cuối chưa đủ thì giữ lại (`buffer = lines.pop()`).
- **Optimistic UI**: trước khi fetch, render ngay bong bóng user + 1 bong bóng model rỗng. Mỗi `delta` append vào bong bóng model cuối → chữ mọc dần.
- **Immutable update**: copy mảng, thay phần tử cuối — không mutate state cũ.

```ts
setMessages((prev) => {
  const next = [...prev];
  const last = next[next.length - 1];
  next[next.length - 1] = { ...last, text: last.text + delta };
  return next;
});
```

## 3. Env setup

```bash
# .env.local
GEMINI_API_KEY=<copy từ Lambda env var: geminiAPIKey>
```

Route trả 500 `"GEMINI_API_KEY is not configured"` nếu thiếu key.

## 4. Chạy

```bash
bun add @google/genai   # 1 lần
bun run dev             # script: next dev --turbopack -p 3001
```

Mở `http://localhost:3001/chat-test`.

### Gotcha port

`dev` script hardcode `-p 3001`. Nếu port bị project khác chiếm (vd `firemotion-base`), trang sẽ 404 vì server đang serve app khác. Kiểm tra:

```bash
lsof -ti:3001          # PID nào đang giữ port
lsof -p <PID> | grep cwd   # project nào
```

Giải phóng: `lsof -ti:3001 | xargs kill`, rồi `bun run dev`.

## Cách verify nhanh (không cần browser)

```bash
curl -s -X POST http://localhost:3001/api/chat-test \
  -H "Content-Type: application/json" \
  -d '{"message":"hi"}'
# → data: {"delta":"Hi there! How can I help you today?"}
#   data: {"done":true}
```

## Mở rộng

- **Đổi model**: sửa `MODELS` trong `page.tsx` + default `DEFAULT_MODEL` trong `route.ts`. Model thật: `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-pro-preview`.
- **System prompt**: thêm `config: { systemInstruction: "..." }` vào `generateContentStream`.
- **Thinking / config khác**: truyền thêm field trong `config` (xem doc SDK).
- **Lưu lịch sử**: hiện chat chỉ ở client state. Muốn persist → ghép vào pattern Lambda `saveSmartChatState` như smart-chat thật.

## Tại sao SSE chứ không phải trả 1 cục

| Cách | Trải nghiệm |
|------|-------------|
| `generateContent` (cũ, smart-chat qua Lambda) | đợi xong toàn bộ → hiện 1 lần, lag cảm giác |
| `generateContentStream` + SSE (cái này) | token hiện ngay khi model sinh ra → cảm giác nhanh, giống ChatGPT |
