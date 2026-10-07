-- 2026-10-08：排行榜依遊戲模式分開。既有紀錄分不出模式，依使用者決定全部算一般模式（standard）。
-- 對已上線的 D1 執行一次：npx wrangler d1 execute gutsy-scores --remote --file migrations/0001_add_mode.sql
ALTER TABLE scores ADD COLUMN mode TEXT NOT NULL DEFAULT 'standard';
CREATE INDEX IF NOT EXISTS scores_mode_rank ON scores (mode, score DESC, created_at ASC);
