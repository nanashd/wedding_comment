'use client';

import Wall from '@/components/Wall';
import CommentForm from '@/components/CommentForm';
import MessageList from '@/components/MessageList';

export default function Home() {
  return (
    <Wall>
      <div className="space-y-8">
        {/* コメント投稿フォーム */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-[var(--ink)] mb-4">
            お祝いのメッセージを投稿
          </h2>
          <p className="text-lg text-[var(--muted)] font-sans">
            新郎新婦への温かいお言葉をお聞かせください
          </p>
        </div>
        
        <CommentForm />
        
        {/* 区切り線 */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-pink-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-pink-500 font-medium">💕 みんなのメッセージ 💕</span>
          </div>
        </div>
        
        {/* メッセージリスト */}
        <MessageList />
      </div>
    </Wall>
  );
}
