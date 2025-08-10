# 結婚式コメントウォール

結婚式の余興向け「LINE風コメントウォール」Webアプリです。参列者がWebページにアクセスしてコメントと写真を投稿すると、大画面にLINEのトーク画面風UIでリアルタイム表示されます。

## 機能

### 投稿機能（参列者用）
- ニックネーム入力欄
- コメント入力欄
- 写真添付ボタン（スマホはカメラ起動可）
- 写真はアップロード前に自動圧縮（最大200KB、最大長辺1280px）
- 送信後フォームクリア

### 表示機能（スクリーン用）
- LINE風UI（吹き出し左右交互配置）
- コメントとニックネームを表示
- 写真付きコメントは吹き出し内にサムネイル表示し、クリックでモーダル拡大
- 新着コメントが届くと自動スクロール

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **バックエンド**: Firebase
  - Firestore (リアルタイムデータベース)
  - Storage (画像保存)
- **画像圧縮**: browser-image-compression
- **言語**: TypeScript

## セットアップ

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd wedding_comment
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. Firebaseプロジェクトの設定

1. [Firebase Console](https://console.firebase.google.com/)で新しいプロジェクトを作成
2. Firestore Databaseを有効化
3. Storageを有効化
4. Webアプリを追加し、設定情報を取得

### 4. 環境変数の設定

`env.example`をコピーして`.env.local`を作成し、Firebase設定を入力：

```bash
cp env.example .env.local
```

`.env.local`ファイルを編集：
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firestoreセキュリティルールの設定

Firebase Consoleで以下のルールを設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{commentId} {
      allow read, write: if true;
    }
  }
}
```

### 6. Storageセキュリティルールの設定

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /comments/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

### 7. 開発サーバーの起動
```bash
npm run dev
```

http://localhost:3000 でアプリにアクセスできます。

## 使用方法

### 投稿モード
- 右上の「投稿」ボタンをクリック
- ニックネームとコメントを入力
- 必要に応じて写真を添付
- 「送信」ボタンで投稿

### 表示モード
- 右上の「表示」ボタンをクリック
- 全画面でコメントがリアルタイム表示
- 写真はクリックで拡大表示

## デプロイ

### Vercelでのデプロイ
1. GitHubにリポジトリをプッシュ
2. [Vercel](https://vercel.com)でプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

### その他のプラットフォーム
- Netlify
- Firebase Hosting
- その他の静的ホスティングサービス

## パフォーマンス・制限

- 写真は圧縮後にアップロードするため、通信負荷とストレージ使用量を軽減
- Lazy Loadで画像を遅延読み込み
- 無料プラン（Firebase Spark）で1日運用できる設計

## ライセンス

MIT License

## 注意事項

- 本アプリは結婚式などのイベントでの一時的な使用を想定しています
- 本格的な運用の場合は、適切なセキュリティ設定とユーザー認証を追加することを推奨します
- 写真の保存にはFirebase Storageを使用するため、使用量に応じて料金が発生する可能性があります
