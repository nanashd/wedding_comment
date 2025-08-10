'use client';

import { useState, useEffect } from 'react';
import { Comment } from '@/types/comment';
import LikeButton from './LikeButton';
import { toggleLike } from '@/lib/firebase';

interface MessageBubbleProps {
  comment: Comment;
  isOwn: boolean;
  currentUser?: string; // 現在のユーザーのニックネーム
}

export default function MessageBubble({ comment, isOwn, currentUser }: MessageBubbleProps) {
  // ランダムアイコンの配列
  const randomIcons = ['👤', '👨', '👩', '🧑', '👶', '👴', '👵', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍⚕️', '👩‍⚕️', '👨‍🍳', '👩‍🍳', '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀', '👨‍🏫', '👩‍🏫'];
  
  // ニックネームから一貫したアイコンを生成
  const getIcon = (nickname: string) => {
    const hash = nickname.split('').reduce((a, b) => {
      a = ((a << 5) - a + b.charCodeAt(0)) & 0xffffffff;
      return a;
    }, 0);
    return randomIcons[Math.abs(hash) % randomIcons.length];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // いいねの状態を管理（ローカル状態として管理）
  const [localLikes, setLocalLikes] = useState(comment.likes || 0);
  const [localIsLiked, setLocalIsLiked] = useState(currentUser ? comment.likedBy.includes(currentUser) : false);
  const [isUpdating, setIsUpdating] = useState(false);

  // コメントの更新時にローカル状態を同期
  useEffect(() => {
    setLocalLikes(comment.likes || 0);
    setLocalIsLiked(currentUser ? comment.likedBy.includes(currentUser) : false);
  }, [comment.likes, comment.likedBy, currentUser]);

  // いいねの処理
  const handleLike = async () => {
    if (!currentUser || isUpdating) return;
    
    console.log('いいね処理開始:', {
      commentId: comment.id,
      currentUser,
      currentLikes: localLikes,
      currentIsLiked: localIsLiked
    });
    
    setIsUpdating(true);
    
    try {
      // 現在の状態を保存（更新前）
      const currentIsLiked = localIsLiked;
      
      console.log('更新前の状態:', { currentIsLiked });
      
      // 楽観的更新（UIを先に更新）
      if (!currentIsLiked) {
        console.log('いいねを追加中...');
        setLocalLikes(prev => prev + 1);
        setLocalIsLiked(true);
      } else {
        console.log('いいねを削除中...');
        setLocalLikes(prev => Math.max(0, prev - 1));
        setLocalIsLiked(false);
      }
      
      // Firebaseに更新を送信（更新前の状態を渡す）
      console.log('Firebaseに更新を送信中:', { commentId: comment.id, currentUser, currentIsLiked });
      const success = await toggleLike(comment.id, currentUser, currentIsLiked);
      
      console.log('Firebase更新結果:', { success });
      
      if (!success) {
        console.log('Firebase更新失敗、UIを元に戻します');
        // 失敗した場合は元に戻す
        if (!currentIsLiked) {
          setLocalLikes(prev => prev - 1);
          setLocalIsLiked(false);
        } else {
          setLocalLikes(prev => prev + 1);
          setLocalIsLiked(true);
        }
        console.error('いいねの更新に失敗しました');
      } else {
        console.log('Firebase更新成功');
      }
    } catch (error) {
      console.log('エラーが発生:', error);
      // エラーが発生した場合も元に戻す
      // エラー時は元の状態に戻す必要があるので、現在のlocalIsLikedの状態を確認
      if (localIsLiked) {
        setLocalLikes(prev => prev - 1);
        setLocalIsLiked(false);
      } else {
        setLocalLikes(prev => prev + 1);
        setLocalIsLiked(true);
      }
      console.error('いいねの更新でエラーが発生:', error);
    } finally {
      setIsUpdating(false);
      console.log('処理完了');
    }
  };

  // 左右配置に応じたスタイル設定
  const isRight = isOwn;
  const containerClass = isRight ? 'justify-end' : 'justify-start';
  const avatarClass = isRight ? 'ml-4' : 'mr-4';

  return (
    <div className={`flex ${containerClass} my-5 mx-4 animate-fadeSlideIn`}>
      <div className={`max-w-[78%] ${isRight ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* 上品なアバター */}
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center text-2xl shadow-elegant ${avatarClass} flex-shrink-0 border border-accent/30 ring-1 ring-accent/20`}>
            {getIcon(comment.nickname)}
          </div>
          
          {/* メッセージとコントロールのコンテナ */}
          <div className={`flex-1 ${isRight ? 'order-1 mr-4' : 'order-2 ml-4'}`}>
            {/* ニックネーム */}
            <div className={`font-medium mb-2 text-sm text-muted ${isRight ? 'text-right' : 'text-left'}`}>
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
            
            {/* 時刻といいねボタンを横並びで配置 */}
            <div className={`flex items-center justify-between mt-3 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`text-xs text-muted/70`}>
                {formatTime(comment.createdAt)}
              </div>
              
              {/* いいねボタン */}
              <div className={`${isRight ? 'mr-auto' : 'ml-auto'}`}>
                <LikeButton
                  initialLikes={localLikes}
                  onLike={handleLike}
                  disabled={!currentUser || isUpdating}
                  isLiked={localIsLiked}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
