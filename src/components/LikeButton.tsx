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
        group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full
        transition-all duration-300 ease-out transform
        ${isLiked 
          ? 'text-white bg-accent hover:bg-accent/90 border border-accent/30 shadow-elegant' 
          : 'text-muted bg-white/80 hover:bg-white hover:text-accent border border-accent/20 hover:border-accent/30 shadow-elegant/50 hover:shadow-elegant'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/30'}
        ${isAnimating ? 'pointer-events-none' : ''}
        backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0
      `}
    >
      {/* ハートアイコン */}
      <span 
        className={`
          text-lg leading-none transition-all duration-300
          ${isLiked ? 'text-white' : 'text-muted group-hover:text-accent'}
          ${isAnimating && isLiked ? 'animate-heartBeat scale-125' : ''}
          ${isAnimating && !isLiked ? 'animate-pop scale-110' : ''}
        `}
      >
        {isLiked ? '❤️' : '🤍'}
      </span>
      
      {/* いいね数 */}
      <span className={`
        text-sm font-medium transition-colors duration-300
        ${isLiked ? 'text-white' : 'text-muted group-hover:text-accent'}
      `}>
        {likes}
      </span>
      
      {/* 上品な装飾 */}
      {isLiked && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent/60 rounded-full animate-ping"></div>
      )}
      
      {/* アクセシビリティ用の説明 */}
      <span className="sr-only">
        {isLiked ? 'いいね済み' : 'いいねする'}
      </span>
    </button>
  );
}
