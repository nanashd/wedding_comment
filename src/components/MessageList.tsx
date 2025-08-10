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
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 font-medium text-lg">メッセージを読み込み中...</p>
          <div className="mt-4 text-2xl animate-pulse">💕</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* LINE風チャットルーム */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        {/* チャットルームヘッダー */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 px-6 py-4 text-white">
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <span className="ml-4 font-bold text-lg">💬 お祝いメッセージ</span>
          </div>
        </div>
        
        {/* メッセージエリア */}
        <div 
          ref={scrollRef} 
          className="h-[65vh] md:h-[70vh] overflow-y-auto p-4 space-y-2 relative scroll-smooth bg-gradient-to-b from-pink-50/50 to-purple-50/50"
        >
          {comments.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 animate-bounce">💌</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">まだメッセージがありません</h3>
              <p className="text-gray-500 text-lg mb-4">最初のメッセージを投稿してみませんか？</p>
              <div className="text-4xl animate-pulse">✨💖✨</div>
            </div>
          ) : (
            <div className="space-y-2">
              {comments.map((comment, index) => (
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
        
        {/* チャットルームフッター */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 text-center border-t border-pink-200/50">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span className="text-sm">💕</span>
            <p className="font-medium text-sm">リアルタイムで更新中...</p>
            <span className="text-sm">💕</span>
          </div>
        </div>
      </div>
      
      {/* かわいい装飾要素 */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
}
