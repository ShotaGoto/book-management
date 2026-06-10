# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git

作業中は区切りのよいタイミング（機能単位・レイヤー単位など）でこまめにコミットしてください。

## ADR (Architecture Decision Records)

重要な技術判断は `docs/adr/` に記録されています。**調査・開発を始める前に必ず確認してください。**

新しい技術的意思決定（ライブラリ選定、設計変更など）を行う場合は `docs/adr/NNNN-<title>.md` を作成してください。

## Commands

### Frontend (`frontend/`)

```bash
npm install        # 初回セットアップ
npm run dev        # dev server (localhost:5173)
npm run build      # production build
npm run lint       # lint
```

### Backend (`backend/`)

```bash
go mod tidy                        # 初回セットアップ・依存関係の同期
go run ./cmd/api                   # API server 起動 (localhost:8080)
go build ./...                     # ビルド確認
go test ./...                      # 全テスト実行
go test ./internal/handler/...     # 特定パッケージのテスト実行
```

### ローカル DB

```bash
docker compose up -d db
cp .env.example .env
psql $DATABASE_URL -f backend/db/migrations/001_create_books.sql
```

### コード生成

```bash
# backend/ で実行
sqlc generate                                      # DB アクセスコード再生成
swag init -g cmd/api/main.go -o docs/swagger       # Swagger ドキュメント再生成
```

## Architecture

```
book-management/
├── frontend/      # React SPA (Vite + TypeScript + Tailwind + Zustand)
├── backend/       # Go API server (Echo + sqlc + PostgreSQL)
└── docs/adr/      # Architecture Decision Records
```

### Frontend (`frontend/src/`)

Feature-first + Atomic Design の組み合わせ:

```
src/
├── components/         # 共有 UI (atoms / molecules / organisms)
│   └── atoms/          # 最小再利用単位 (Button, Input, …)
├── features/           # ドメイン機能ごとに自己完結したディレクトリ
│   └── books/
│       ├── components/ # feature 固有コンポーネント
│       ├── pages/      # ルートレベルのページコンポーネント
│       └── store.ts    # Zustand slice
├── lib/
│   └── api.ts          # fetch クライアント (全 /api/v1/* 呼び出しをここに集約)
├── App.tsx
└── main.tsx
```

Vite が `/api` を `http://localhost:8080` へプロキシする。

### Backend (`backend/`)

```
backend/
├── cmd/api/main.go          # エントリポイント: DB・Echo・handler の組み立て
├── internal/
│   ├── domain/              # 純粋な Go 型 + リクエスト構造体
│   ├── handler/             # Echo handler (repo interface に依存)
│   └── repository/          # DB アクセス (sqlc 生成コードをラップ)
└── db/
    ├── migrations/          # 生 SQL マイグレーション
    ├── queries/             # sqlc アノテーション付き SQL → internal/db/ に生成
    └── sqlc.yaml
```

依存方向: `handler → domain ← repository`。handler は `bookRepo` インターフェース経由で repository に依存し、具体型には依存しない。

### データフロー

```
Browser → GET /api/v1/books → Echo router → handler → repository → PostgreSQL
                                                      ↘ domain.Book (JSON レスポンス)
```

## Conventions

**命名**
- React コンポーネント・ファイル: PascalCase
- Go パッケージ: lowercase 単語
- API ルート: kebab-case 複数形 (`/api/v1/books`)

**状態管理**: Zustand store は `features/<name>/store.ts` に置く。Feature をまたぐ global state は `src/stores/` に置く。

**DB アクセス**: `db/queries/*.sql` に sqlc アノテーション付きで SQL を書き、`sqlc generate` で生成する。ORM は使わない。

**環境変数**: ローカル開発は `.env`（`.env.example` からコピー）。本番値は ECS Task Definition で設定し、コードには含めない。

**バリデーション**: リクエストボディは `domain/` の構造体に `validate` タグを付け `go-playground/validator` で検証する。

**ログ**: `zerolog` (`log.Info()`, `log.Error()` など) を使う。本番パスで `fmt.Println` は使わない。
