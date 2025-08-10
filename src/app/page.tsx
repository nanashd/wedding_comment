'use client';

import CommentForm from '@/components/CommentForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            結婚式コメントウォール
          </h1>
          <p className="text-gray-600">
            お祝いのメッセージを投稿してください
          </p>
        </div>
        <CommentForm />
      </div>
    </div>
  );
}
