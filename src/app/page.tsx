'use client';

import Wall from '@/components/Wall';
import CommentForm from '@/components/CommentForm';
import MessageList from '@/components/MessageList';

export default function Home() {
  return (
    <Wall>
      <div className="space-y-12">
        {/* コメント投稿フォーム */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-ink mb-4">
            お祝いのメッセージを投稿
          </h2>
          <p className="text-lg text-muted font-sans">
            新郎新婦への温かいお言葉をお聞かせください
          </p>
        </div>
        
        <CommentForm />
        
        {/* 上品な区切り線 */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-accent/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-6 bg-bg-start text-accent font-medium">みんなのメッセージ</span>
          </div>
        </div>
        
        {/* メッセージリスト */}
        <MessageList />
      </div>
    </Wall>
  );
}
