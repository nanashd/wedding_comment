'use client';

import { useState } from 'react';

interface LikeButtonProps {
  initialLikes?: number;
  onLike?: (likes: number) => void;
  disabled?: boolean;
}

export default function LikeButton({ initialLikes = 0, onLike, disabled = false }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    if (disabled || isAnimating) return;

    setIsAnimating(true);
    
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      onLike?.(likes + 1);
    } else {
      setLikes(prev => Math.max(0, prev - 1));
      setIsLiked(false);
      onLike?.(Math.max(0, likes - 1));
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
        group inline-flex items-center gap-2 px-3 py-2 rounded-full
        transition-all duration-200 ease-out
        ${isLiked 
          ? 'text-pink-500 bg-pink-50 hover:bg-pink-100' 
          : 'text-[var(--muted)] bg-white/60 hover:bg-white/80 hover:text-pink-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer focus-ring'}
        ${isAnimating ? 'pointer-events-none' : ''}
        shadow-sm hover:shadow-md
      `}
    >
      {/* ハートアイコン */}
      <span 
        className={`
          text-2xl leading-none transition-all duration-200
          ${isLiked ? 'text-pink-500' : 'text-[var(--muted)] group-hover:text-pink-400'}
          ${isAnimating && isLiked ? 'animate-heartBeat' : ''}
          ${isAnimating && !isLiked ? 'animate-pop' : ''}
        `}
      >
        {isLiked ? '❤️' : '♡'}
      </span>
      
      {/* いいね数 */}
      <span className={`
        text-sm font-medium transition-colors duration-200
        ${isLiked ? 'text-pink-600' : 'text-[var(--muted)]'}
      `}>
        {likes}
      </span>
      
      {/* アクセシビリティ用の説明 */}
      <span className="sr-only">
        {isLiked ? 'いいね済み' : 'いいねする'}
      </span>
    </button>
  );
}
