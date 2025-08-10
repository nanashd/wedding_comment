'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CommentForm() {
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !comment.trim()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Firestoreに保存
      await addDoc(collection(db, 'messages'), {
        nickname: nickname.trim(),
        comment: comment.trim(),
        createdAt: serverTimestamp(),
        likes: 0, // 初期いいね数
        likedBy: [], // 初期いいねユーザー配列
      });

      // 投稿成功時の処理
      setComment('');
      setNickname('');
      
      // ユーザー名をローカルストレージに保存（いいね機能用）
      localStorage.setItem('wedding-comment-user', nickname.trim());
      
      // 成功メッセージを表示
      setSuccess('メッセージが投稿されました！💚');
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error: unknown) {
      console.error('投稿エラー:', error);
      
      // エラーメッセージの設定
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'permission-denied') {
          setError('権限がありません。Firestoreのセキュリティルールを確認してください。');
        } else if (error.code === 'unavailable') {
          setError('Firestoreが利用できません。ネットワーク接続を確認してください。');
        } else {
          setError(`投稿に失敗しました: ${error.code}`);
        }
      } else {
        setError('投稿に失敗しました。しばらく時間をおいて再度お試しください。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-[28px] shadow-elegant border border-accent/10 relative overflow-hidden">
      {/* 上品な装飾要素 */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent/20 rounded-full animate-pulse"></div>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent/30 rounded-full animate-floatBokeh" style={{ animationDelay: '1s' }}></div>
      
      <h2 className="text-3xl font-serif font-bold text-center mb-8 text-ink relative">
        <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
          コメントを投稿
        </span>
      </h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50/80 border border-red-200/50 text-red-700 rounded-[22px] animate-fadeSlideIn">
          <div className="flex items-center">
            <span className="text-lg mr-2">⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-accent/10 border border-accent/20 text-accent rounded-[22px] animate-fadeSlideIn">
          <div className="flex items-center">
            <span className="text-lg mr-2">💚</span>
            <p className="text-sm font-medium">{success}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-ink mb-3">
            <span className="flex items-center">
              <span className="mr-2 text-accent">👤</span>
              ニックネーム <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-5 py-4 text-base text-ink bg-white/80 border border-accent/20 rounded-[22px] placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 font-medium shadow-inner-soft"
            placeholder="あなたの名前"
            required
            maxLength={20}
            aria-describedby="nickname-help"
          />
          <p id="nickname-help" className="mt-2 text-xs text-muted font-medium">
            最大20文字まで
          </p>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-ink mb-3">
            <span className="flex items-center">
              <span className="mr-2 text-accent">💬</span>
              コメント <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-5 py-4 text-base text-ink bg-white/80 border border-accent/20 rounded-[22px] placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none transition-all duration-200 font-medium shadow-inner-soft"
            placeholder="お祝いのメッセージを入力してください"
            rows={4}
            required
            maxLength={200}
            aria-describedby="comment-help"
          />
          <p id="comment-help" className="mt-2 text-xs text-muted font-medium">
            {comment.length}/200文字
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !nickname.trim() || !comment.trim()}
          className="w-full bg-accent text-white py-5 px-6 rounded-[22px] font-medium text-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:bg-muted/50 disabled:cursor-not-allowed transition-all duration-200 shadow-elegant hover:shadow-elegant/80 transform hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group"
        >
          {/* 上品な装飾 */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <span className="relative flex items-center justify-center">
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                送信中...
              </>
            ) : (
              <>
                <span className="mr-2">💌</span>
                送信
              </>
            )}
          </span>
        </button>
      </form>
      
      {/* 上品な装飾要素（下部） */}
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent/20 rounded-full animate-floatBokeh" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
}
