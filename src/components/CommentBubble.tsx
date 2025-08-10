'use client';

import { useState } from 'react';
import { Comment } from '@/types/comment';

interface CommentBubbleProps {
  comment: Comment;
  isOwn: boolean;
}

export default function CommentBubble({ comment, isOwn }: CommentBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 左右配置に応じたスタイル設定
  const isLeft = comment.isLeft ?? isOwn;
  const bubbleBg = isLeft ? 'bg-white' : 'bg-green-500';
  const textColor = isLeft ? 'text-[#222]' : 'text-white';
  const nicknameColor = isLeft ? 'text-gray-600' : 'text-green-100';
  const timeColor = isLeft ? 'text-gray-400' : 'text-green-100';
  const tailColor = isLeft ? 'border-r-white' : 'border-l-green-500';

  return (
    <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'} my-[20px] mx-[15px]`}>
      <div className={`max-w-[80%] md:max-w-[75%] ${isLeft ? 'order-1' : 'order-2'}`}>
        <div className={`flex items-end ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
          {/* アバター */}
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 flex items-center justify-center text-base md:text-lg font-medium text-gray-600 ${isLeft ? 'mr-3' : 'ml-3'}`}>
            {comment.nickname.charAt(0).toUpperCase()}
          </div>
          
          {/* 吹き出し */}
          <div className={`relative ${bubbleBg} rounded-2xl px-5 py-4 shadow-sm w-full`}>
            {/* 吹き出しの尻尾 */}
            <div className={`absolute top-4 ${isLeft ? '-left-2' : '-right-2'} w-0 h-0 border-4 border-transparent ${tailColor}`} />
            
            {/* ニックネーム */}
            <div className={`font-medium mb-2 ${nicknameColor} text-[1.1rem] md:text-[1.5rem]`}>
              {comment.nickname}
            </div>
            
            {/* コメントテキスト */}
            <div className={`${textColor} break-words text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] xl:text-[2.5rem] leading-[1.5]`}>
              {comment.comment}
            </div>
            
            {/* 時刻 */}
            <div className={`mt-2 ${timeColor} text-right text-sm md:text-base`}>
              {formatTime(comment.createdAt)}
            </div>
          </div>
        </div>

        {/* いいね表示（表示のみ） */}
        <div className={`mt-2 ${isLeft ? 'text-left' : 'text-right'} flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
          <div className="inline-flex items-center gap-1">
            <span className="text-[2rem] leading-none">♡</span>
            <span className="text-[1.6rem] leading-none">{comment.likes ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
