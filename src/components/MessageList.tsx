'use client';

import { useEffect, useRef, useState } from 'react';
import { useComments } from '@/hooks/useComments';
import MessageBubble from './MessageBubble';

export default function MessageList() {
  const { comments, loading } = useComments();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<string>('');

  // ローカルストレージからユーザー名を取得
  useEffect(() => {
    const savedUser = localStorage.getItem('wedding-comment-user');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current && comments.length > 0) {
      const scrollToBottom = () => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      };
      const timer = setTimeout(scrollToBottom, 200); // アニメーション用の遅延
      return () => clearTimeout(timer);
    }
  }, [comments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-6"></div>
          <p className="text-muted font-medium text-lg">メッセージを読み込み中...</p>
          <div className="mt-4 text-2xl animate-pulse text-accent">💚</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-content mx-auto">
      {/* 上品なメッセージコンテナ */}
      <div className="bg-white/95 backdrop-blur-sm rounded-[28px] shadow-elegant border border-accent/10 overflow-hidden">
        {/* コンテナヘッダー */}
        <div className="bg-gradient-to-r from-accent/10 to-accent/20 px-6 py-4 border-b border-accent/20">
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
            <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="ml-4 font-medium text-ink text-sm">お祝いメッセージ</span>
          </div>
        </div>
        
        {/* メッセージエリア */}
        <div 
          ref={scrollRef} 
          className="h-[65vh] md:h-[70vh] overflow-y-auto p-6 space-y-4 relative scroll-smooth bg-gradient-to-b from-bg-start/30 to-bg-end/30"
        >
          {comments.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6 animate-floatBokeh text-accent">💌</div>
              <h3 className="text-2xl font-serif font-bold text-ink mb-3">まだメッセージがありません</h3>
              <p className="text-muted text-lg mb-4">最初のメッセージを投稿してみませんか？</p>
              <div className="text-3xl animate-pulse text-accent">✨💚✨</div>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <MessageBubble 
                    comment={comment} 
                    isOwn={comment.nickname === currentUser} 
                    currentUser={currentUser}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* コンテナフッター */}
        <div className="bg-gradient-to-r from-accent/5 to-accent/10 p-4 text-center border-t border-accent/20">
          <div className="flex items-center justify-center space-x-2 text-muted">
            <span className="text-sm">💚</span>
            <p className="font-medium text-sm">リアルタイムで更新中...</p>
            <span className="text-sm">💚</span>
          </div>
        </div>
      </div>
      
      {/* 上品な装飾要素 */}
      <div className="absolute -top-4 -left-4 w-6 h-6 bg-accent/20 rounded-full animate-pulse"></div>
      <div className="absolute -top-4 -right-4 w-4 h-4 bg-accent/30 rounded-full animate-floatBokeh" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}
