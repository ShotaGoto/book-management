# Book Management

フルスタック書籍管理アプリ。

**スタック:** React + Tailwind CSS + Zustand (フロントエンド) / Go + Echo + sqlc + PostgreSQL (バックエンド) / AWS ECS + S3 + CloudFront (本番)

## Quick Start

```bash
# 1. PostgreSQL 起動
docker compose up -d db

# 2. 環境変数を設定
cp .env.example .env

# 3. マイグレーション適用
psql $DATABASE_URL -f backend/db/migrations/001_create_books.sql

# 4. バックエンド起動
cd backend && go mod tidy && go run ./cmd/api

# 5. フロントエンド起動 (別ターミナル)
cd frontend && npm install && npm run dev
```

http://localhost:5173 を開く。

## ディレクトリ構成

```
book-management/
├── frontend/      # React SPA
├── backend/       # Go API server
├── docs/adr/      # Architecture Decision Records
└── docker-compose.yml
```

詳細は [CLAUDE.md](./CLAUDE.md) を参照。
