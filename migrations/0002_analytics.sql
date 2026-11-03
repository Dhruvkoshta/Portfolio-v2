-- Migration 0002: Privacy-preserving anonymous page view statistics
CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at INTEGER NOT NULL,
  path TEXT NOT NULL,
  country TEXT DEFAULT 'XX',
  referrer TEXT DEFAULT 'direct'
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
