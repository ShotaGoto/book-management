# ADR-0003: インフラ構成の変更（AWS → 無料枠中心）

- **日付:** 2026-06-10
- **ステータス:** 採用済み
- **変更前:** ADR-0001（S3+CloudFront / ECS / RDS）

## コンテキスト

初期コストを抑え、個人・小規模運用で維持できる構成に切り替える。

## 決定

| レイヤー | 変更前 | 変更後 | 理由 |
|---|---|---|---|
| フロントエンド配信 | S3 + CloudFront | **Cloudflare Pages** | 無料・CDN 標準搭載・デプロイが git push だけ |
| バックエンド | ECS (Fargate) | **Render** (Free tier) | 無料枠あり・Dockerfile そのまま使える・git push デプロイ |
| データベース | RDS PostgreSQL | **Supabase** (Free tier) | PostgreSQL 互換・無料枠 500MB・接続文字列のみ変更 |

## 影響範囲

### フロントエンド
- `VITE_API_BASE_URL` 環境変数で本番バックエンド URL を注入（未設定時は Vite プロキシ経由のローカル動作を維持）
- `public/_redirects` を追加して SPA ルーティングを有効化

### バックエンド
- CORS の許可オリジンを `CORS_ALLOW_ORIGINS` 環境変数で制御（カンマ区切り）
- Supabase は SSL 必須 → `DATABASE_URL` に `?sslmode=require` を付与
- `render.yaml` でデプロイ設定を管理

### ローカル開発
変更なし。docker-compose で PostgreSQL を起動し、`.env` で接続する。

## トレードオフ

- Render Free は 15 分無操作でスリープ → 初回リクエストに数秒かかる
- Supabase Free は 1 プロジェクト・500MB まで
- スケールアウトが必要になったタイミングで AWS / GCP へ戻すことを検討する
