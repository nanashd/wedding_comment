'use client';

import { Comment } from '@/types/comment';
import LikeButton from './LikeButton';
import { toggleLike } from '@/lib/firebase';

interface MessageBubbleProps {
  comment: Comment;
  isOwn: boolean;
  currentUser?: string; // 現在のユーザーのニックネーム
}

export default function MessageBubble({ comment, isOwn, currentUser }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // いいねの状態を管理
  const isLiked = currentUser ? comment.likedBy.includes(currentUser) : false;
  const initialLikes = comment.likes || 0;

  // いいねの処理
  const handleLike = async () => {
    if (!currentUser) return;
    
    const success = await toggleLike(comment.id, currentUser, isLiked);
    if (!success) {
      console.error('いいねの更新に失敗しました');
    }
  };

  // 左右配置に応じたスタイル設定
  const isRight = isOwn;
  const containerClass = isRight ? 'justify-end' : 'justify-start';
  const avatarClass = isRight ? 'ml-3' : 'mr-3';

  return (
    <div className={`flex ${containerClass} my-4 mx-3 animate-fadeSlideIn`}>
      <div className={`max-w-[80%] ${isRight ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-end ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* かわいいアバター */}
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center text-lg font-bold text-white shadow-lg ${avatarClass} flex-shrink-0 border-3 border-white/80 ring-2 ring-pink-200/50`}>
            {comment.nickname.charAt(0).toUpperCase()}
          </div>
          
          {/* LINE風チャットバブル */}
          <div className={`relative px-5 py-4 w-full ${isRight ? 'order-1' : 'order-2'}`}>
            {/* ニックネーム */}
            <div className={`font-bold mb-2 text-sm ${isRight ? 'text-white/90' : 'text-gray-700'} ${isRight ? 'text-right' : 'text-left'}`}>
              {comment.nickname}
            </div>
            
            {/* チャットバブル本体 */}
            <div className={`relative ${isRight ? 'bg-gradient-to-r from-pink-400 to-purple-500' : 'bg-white'} rounded-3xl px-5 py-3 shadow-lg border ${isRight ? 'border-pink-300/30' : 'border-gray-200'}`}>
              {/* チャットバブルの尻尾 */}
              <div className={`absolute top-4 ${isRight ? '-right-2' : '-left-2'} w-4 h-4 ${isRight ? 'bg-gradient-to-r from-pink-400 to-purple-500' : 'bg-white'} transform rotate-45 border-r border-b ${isRight ? 'border-pink-300/30' : 'border-gray-200'}`}></div>
              
              {/* コメントテキスト */}
              <div className={`break-words text-base leading-relaxed whitespace-pre-wrap font-medium ${isRight ? 'text-white' : 'text-gray-800'}`}>
                {comment.comment}
              </div>
            </div>
            
            {/* 時刻 */}
            <div className={`mt-3 text-xs ${isRight ? 'text-white/70' : 'text-gray-500'} ${isRight ? 'text-right' : 'text-left'}`}>
              {formatTime(comment.createdAt)}
            </div>
          </div>
        </div>

        {/* いいねボタン */}
        <div className={`mt-3 ${isRight ? 'text-right' : 'text-left'} flex ${isRight ? 'justify-end' : 'justify-start'}`}>
          <LikeButton
            initialLikes={initialLikes}
            onLike={handleLike}
            disabled={!currentUser}
            isLiked={isLiked}
          />
        </div>
      </div>
    </div>
  );
}
