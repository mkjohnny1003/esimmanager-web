const ALLOWED_ORIGINS = new Set([
  "https://getesimmanager.com",
  "http://localhost:8765",
]);

function response(data, status, origin) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers.Vary = "Origin";
  }
  return new Response(status === 204 ? null : JSON.stringify(data), { status, headers });
}

// 2026-10-08：排行榜依遊戲模式分開（一般／地圖／計時賽）。沒帶 mode 的（舊版網頁、
// 加欄位前的舊紀錄）一律算一般模式。
const MODES = ["standard", "map", "timeattack"];

function validRun(run) {
  if (!run || typeof run !== "object") return false;
  const name = typeof run.name === "string" ? run.name.trim() : "";
  return /^[\p{L}\p{N} _.-]{1,20}$/u.test(name)
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(run.id)
    && Number.isSafeInteger(run.score) && run.score >= 0 && run.score <= 10000000
    && Number.isInteger(run.world) && run.world >= 1 && run.world <= 3
    && Number.isInteger(run.stage) && run.stage >= 1 && run.stage <= 10
    && ["EASY", "NORMAL", "HARD"].includes(run.difficulty)
    && Number.isInteger(run.duration_seconds)
    && run.duration_seconds >= 0 && run.duration_seconds <= 86400
    && typeof run.completed === "boolean"
    && (run.mode === undefined || MODES.includes(run.mode));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const url = new URL(request.url);
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return response({ error: "Origin not allowed" }, 403);
    }
    if (request.method === "OPTIONS") {
      return response({}, 204, origin);
    }
    if (url.pathname !== "/scores") {
      return response({ error: "Not found" }, 404, origin);
    }
    if (request.method === "GET") {
      const mode = url.searchParams.get("mode") || "standard";
      if (!MODES.includes(mode)) {
        return response({ error: "Invalid mode" }, 400, origin);
      }
      const result = await env.DB.prepare(
        "SELECT name, score, world, stage FROM scores WHERE mode = ? ORDER BY score DESC, created_at ASC LIMIT 20"
      ).bind(mode).all();
      return response({ mode, scores: result.results }, 200, origin);
    }
    if (request.method !== "POST") {
      return response({ error: "Method not allowed" }, 405, origin);
    }
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return response({ error: "Origin required" }, 403, origin);
    }
    let run;
    try {
      const body = await request.text();
      if (body.length > 1024) return response({ error: "Request too large" }, 413, origin);
      run = JSON.parse(body);
    } catch {
      return response({ error: "Invalid JSON" }, 400, origin);
    }
    if (!validRun(run)) {
      return response({ error: "Invalid run" }, 400, origin);
    }
    const id = run.id.toLowerCase();
    await env.DB.prepare(
      "INSERT OR IGNORE INTO scores (id, name, score, world, stage, difficulty, duration_seconds, completed, mode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(id, run.name.trim(), run.score, run.world, run.stage, run.difficulty,
      run.duration_seconds, run.completed ? 1 : 0, run.mode || "standard").run();
    return response({ saved: true }, 201, origin);
  },
};
