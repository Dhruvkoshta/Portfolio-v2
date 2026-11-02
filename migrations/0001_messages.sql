-- Migration 0001: Messages table for Thermal Receipt contact inquiries
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  message TEXT NOT NULL,
  reply_to TEXT,
  user_agent TEXT,
  country TEXT,
  ip_hash TEXT,
  status TEXT DEFAULT 'unread'
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
