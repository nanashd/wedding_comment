'use client';

import { useEffect, useRef } from 'react';
import { useComments } from '@/hooks/useComments';
import MessageBubble from './MessageBubble';

export default function MessageList() {
  const { comments, loading } = useComments();
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastCommentRef = useRef<HTMLDivElement>(null);

  // 新しいコメントが来たら自動スクロール
  useEffect(() => {
    if (scrollRef.current && comments.length > 0) {
      const scrollToBottom = () => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      };
      
      // 少し遅延させてアニメーション完了後にスクロール
      const timer = setTimeout(scrollToBottom, 200);
      return () => clearTimeout(timer);
    }
  }, [comments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--accent)] mx-auto mb-6"></div>
          <p className="text-[var(--muted)] text-lg font-sans">コメントを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* コメントエリア */}
      <div
        ref={scrollRef}
        className="h-[70vh] md:h-[75vh] overflow-y-auto p-4 space-y-2 relative scroll-smooth"
      >
        {comments.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-[var(--muted)] bg-white/80 backdrop-blur-sm rounded-[var(--radius-large)] p-12 shadow-[var(--shadow-soft)]">
              <div className="text-6xl mb-6">💬</div>
              <p className="text-xl font-medium font-serif text-[var(--ink)] mb-2">まだコメントがありません</p>
              <p className="text-base opacity-80 font-sans">最初のコメントを投稿してみましょう！</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                ref={index === comments.length - 1 ? lastCommentRef : null}
              >
                <MessageBubble
                  comment={comment}
                  isOwn={index % 2 === 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="bg-white/90 backdrop-blur-sm p-4 text-center text-[var(--muted)] text-sm border-t border-white/20 rounded-b-[var(--radius-large)] shadow-[var(--shadow-soft)]">
        <p className="font-sans">リアルタイムで更新中...</p>
      </div>
    </div>
  );
}
