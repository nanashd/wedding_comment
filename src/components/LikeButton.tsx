'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  initialLikes?: number;
  onLike?: () => void; // パラメータなしで呼び出し
  disabled?: boolean;
  isLiked?: boolean; // 外部からいいね状態を制御
}

export default function LikeButton({ 
  initialLikes = 0, 
  onLike, 
  disabled = false, 
  isLiked: externalIsLiked 
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(externalIsLiked || false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 外部のいいね状態が変更された場合の同期
  useEffect(() => {
    if (externalIsLiked !== undefined) {
      setIsLiked(externalIsLiked);
    }
  }, [externalIsLiked]);

  // いいね数の同期
  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  const handleLike = () => {
    if (disabled || isAnimating) return;

    setIsAnimating(true);
    
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      onLike?.();
    } else {
      setLikes(prev => Math.max(0, prev - 1));
      setIsLiked(false);
      onLike?.();
    }

    // アニメーション完了後に状態をリセット
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLike();
    }
  };

  return (
    <button
      onClick={handleLike}
      onKeyDown={handleKeyDown}
      disabled={disabled || isAnimating}
      aria-pressed={isLiked}
      aria-label={`${isLiked ? 'いいねを解除' : 'いいね'}: ${likes}件`}
      className={`
        group inline-flex items-center gap-2 px-4 py-2.5 rounded-full
        transition-all duration-300 ease-out transform
        ${isLiked 
          ? 'text-white bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 border-2 border-pink-300/50 shadow-lg' 
          : 'text-gray-600 bg-white/90 hover:bg-white hover:text-pink-500 border-2 border-gray-200 hover:border-pink-300/50 shadow-md hover:shadow-lg'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-200'}
        ${isAnimating ? 'pointer-events-none' : ''}
        backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0
      `}
    >
      {/* ハートアイコン */}
      <span 
        className={`
          text-xl leading-none transition-all duration-300
          ${isLiked ? 'text-white' : 'text-gray-400 group-hover:text-pink-500'}
          ${isAnimating && isLiked ? 'animate-heartBeat scale-125' : ''}
          ${isAnimating && !isLiked ? 'animate-pop scale-110' : ''}
        `}
      >
        {isLiked ? '💖' : '🤍'}
      </span>
      
      {/* いいね数 */}
      <span className={`
        text-sm font-bold transition-colors duration-300
        ${isLiked ? 'text-white' : 'text-gray-600 group-hover:text-pink-600'}
      `}>
        {likes}
      </span>
      
      {/* かわいい装飾 */}
      {isLiked && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-300 rounded-full animate-ping"></div>
      )}
      
      {/* アクセシビリティ用の説明 */}
      <span className="sr-only">
        {isLiked ? 'いいね済み' : 'いいねする'}
      </span>
    </button>
  );
}
