'use client';

import { Comment } from '@/types/comment';

interface MessageBubbleProps {
  comment: Comment;
  isOwn: boolean;
}

export default function MessageBubble({ comment, isOwn }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 左右配置に応じたスタイル設定
  const isRight = isOwn;
  const bubbleBg = isRight ? 'bg-[var(--bubble-right)]' : 'bg-[var(--bubble-left)]';
  const textColor = 'text-[var(--ink)]';
  const nicknameColor = 'text-[var(--muted)]';
  const timeColor = 'text-[var(--muted)] opacity-70';
  const tailPosition = isRight ? 'right-[-6px]' : 'left-[-6px]';
  const tailColor = isRight ? 'border-l-[var(--bubble-right)]' : 'border-r-[var(--bubble-left)]';

  return (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'} my-4 mx-2 animate-fadeSlideIn`}>
      <div className={`max-w-[78%] md:max-w-[75%] ${isRight ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-end ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* アバター */}
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-200 to-green-200 flex items-center justify-center text-base md:text-lg font-medium text-[var(--ink)] shadow-sm ${isRight ? 'ml-3' : 'mr-3'} flex-shrink-0`}>
            {comment.nickname.charAt(0).toUpperCase()}
          </div>
          
          {/* 吹き出し */}
          <div className={`relative ${bubbleBg} rounded-[var(--radius-large)] px-5 py-4 shadow-[var(--shadow-soft)] w-full`}>
            {/* 吹き出しの尻尾 */}
            <div className={`absolute top-4 ${tailPosition} w-0 h-0 border-4 border-transparent ${tailColor}`} />
            
            {/* ニックネーム */}
            <div className={`font-medium mb-2 ${nicknameColor} text-sm md:text-base`}>
              {comment.nickname}
            </div>
            
            {/* コメントテキスト */}
            <div className={`${textColor} break-words text-base md:text-lg leading-relaxed whitespace-pre-wrap`}>
              {comment.comment}
            </div>
            
            {/* 時刻 */}
            <div className={`mt-3 ${timeColor} text-right text-xs md:text-sm`}>
              {formatTime(comment.createdAt)}
            </div>
          </div>
        </div>

        {/* いいね表示 */}
        <div className={`mt-2 ${isRight ? 'text-right' : 'text-left'} flex ${isRight ? 'justify-end' : 'justify-start'}`}>
          <div className="inline-flex items-center gap-1">
            <span className="text-2xl leading-none text-pink-400">♡</span>
            <span className="text-sm leading-none text-[var(--muted)]">{comment.likes ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
