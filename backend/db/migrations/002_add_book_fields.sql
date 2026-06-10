ALTER TABLE books
    ADD COLUMN IF NOT EXISTS author TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'unread'
        CHECK (status IN ('unread', 'reading', 'done')),
    ADD COLUMN IF NOT EXISTS memo   TEXT NOT NULL DEFAULT '';
