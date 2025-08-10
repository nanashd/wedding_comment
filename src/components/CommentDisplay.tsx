'use client';

import { useEffect, useRef } from 'react';
import { useComments } from '@/hooks/useComments';
import CommentBubble from './CommentBubble';

export default function CommentDisplay() {
  const { comments, loading } = useComments();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 新しいコメントが来たら自動スクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">コメントを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col relative">
      {/* 背景レイヤー */}
      <div className="absolute inset-0 -z-10">
        {/* パステルグラデーション（Tailwind CSS） */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-sky-50 to-white" />
        {/* 紙のような薄いテクスチャ */}
        <div className="absolute inset-0 screen-wall-texture" />
        {/* bokeh風の光の玉（左上） */}
        <div className="screen-wall-bokeh-left" />
        {/* bokeh風の光の玉（右下） */}
        <div className="screen-wall-bokeh-right" />
      </div>

      {/* ヘッダー */}
      <div className="bg-green-500/90 backdrop-blur text-white p-4 text-center shadow-md z-10">
        <h1 className="text-2xl font-bold">結婚式コメントウォール</h1>
        <p className="text-sm opacity-90">お祝いのメッセージをお待ちしています</p>
      </div>

      {/* コメントエリア */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 relative"
      >
        {comments.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-700 bg-white/80 rounded-lg p-8">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xl font-medium">まだコメントがありません</p>
              <p className="text-sm opacity-80 mt-2">最初のコメントを投稿してみましょう！</p>
            </div>
          </div>
        ) : (
          comments.map((comment, index) => (
            <CommentBubble
              key={comment.id}
              comment={comment}
              isOwn={index % 2 === 0}
            />
          ))
        )}
      </div>

      {/* フッター */}
      <div className="bg-white/90 backdrop-blur p-4 text-center text-gray-600 text-sm border-t z-10">
        <p>リアルタイムで更新中...</p>
      </div>
    </div>
  );
}
