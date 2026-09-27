CREATE TABLE IF NOT EXISTS scores (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  world INTEGER NOT NULL,
  stage INTEGER NOT NULL,
  difficulty TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  completed INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS scores_rank ON scores (score DESC, created_at ASC);
