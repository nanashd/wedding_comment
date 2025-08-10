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
  const avatarClass = isRight ? 'ml-4' : 'mr-4';

  return (
    <div className={`flex ${containerClass} my-5 mx-4 animate-fadeSlideIn`}>
      <div className={`max-w-[78%] ${isRight ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-end ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* 上品なアバター */}
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center text-lg font-bold text-ink shadow-elegant ${avatarClass} flex-shrink-0 border border-accent/30 ring-1 ring-accent/20`}>
            {comment.nickname.charAt(0).toUpperCase()}
          </div>
          
          {/* 上品なチャットバブル */}
          <div className={`relative px-5 py-4 w-full ${isRight ? 'order-1' : 'order-2'}`}>
            {/* ニックネーム */}
            <div className={`font-medium mb-2 text-xs text-muted ${isRight ? 'text-right' : 'text-left'}`}>
              {comment.nickname}
            </div>
            
            {/* チャットバブル本体 */}
            <div className={`relative ${isRight ? 'bg-bubble-right' : 'bg-bubble-left'} rounded-[28px] px-5 py-3 shadow-elegant border border-accent/10 shadow-inner-soft`}>
              {/* チャットバブルの尻尾 */}
              <div className={`absolute top-4 ${isRight ? '-right-2' : '-left-2'} w-3 h-3 ${isRight ? 'bg-bubble-right' : 'bg-bubble-left'} transform rotate-45 border-r border-b ${isRight ? 'border-accent/20' : 'border-accent/10'}`}></div>
              
              {/* コメントテキスト */}
              <div className={`break-words text-lg leading-relaxed whitespace-pre-wrap text-ink font-normal`}>
                {comment.comment}
              </div>
            </div>
            
            {/* 時刻 */}
            <div className={`mt-3 text-xs text-muted/70 ${isRight ? 'text-right' : 'text-left'}`}>
              {formatTime(comment.createdAt)}
            </div>
          </div>
        </div>

        {/* いいねボタン */}
        <div className={`mt-4 ${isRight ? 'text-right' : 'text-left'} flex ${isRight ? 'justify-end' : 'justify-start'}`}>
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
