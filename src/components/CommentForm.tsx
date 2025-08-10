'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CommentForm() {
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !comment.trim()) return;

    console.log('投稿開始 - loading状態をtrueに設定');
    setLoading(true);
    setError(null);
    
    try {
      console.log('Firestore保存処理開始');
      console.log('保存するデータ:', {
        nickname: nickname.trim(),
        comment: comment.trim(),
        createdAt: 'serverTimestamp()'
      });
      
      // Firestoreに保存
      const docRef = await addDoc(collection(db, "messages"), {
        nickname: nickname.trim(),
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });
      console.log('Firestore保存完了 - ドキュメントID:', docRef.id);

      console.log('フォームクリア処理開始');
      // フォームをクリア
      setNickname('');
      setComment('');
      console.log('フォームクリア完了');

      // 送信完了状態を表示
      setSubmitted(true);
      console.log('送信完了状態設定完了');
      
      // 2秒後に送信完了状態を解除
      setTimeout(() => {
        setSubmitted(false);
        console.log('送信完了状態解除完了');
      }, 2000);

    } catch (error: unknown) {
      console.error('送信エラー詳細:', error);
      
      let errorMessage = '投稿に失敗しました。';
      
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        console.error('エラーコード:', firebaseError.code);
        console.error('エラーメッセージ:', firebaseError.message);
        
        if (firebaseError.code === 'permission-denied') {
          errorMessage = '権限がありません。Firestoreのセキュリティルールを確認してください。';
        } else if (firebaseError.code === 'unavailable') {
          errorMessage = 'Firebaseサービスが利用できません。ネットワーク接続を確認してください。';
        } else if (firebaseError.code === 'unauthenticated') {
          errorMessage = '認証が必要です。';
        }
      }
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      console.log('finallyブロック実行 - loading状態をfalseに設定');
      // 成功・失敗問わず必ずローディング解除
      setLoading(false);
      console.log('loading状態をfalseに設定完了');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-[var(--radius-large)] shadow-[var(--shadow-soft)] relative">
      <h2 className="text-2xl font-serif font-bold text-center mb-8 text-[var(--ink)]">
        コメントを投稿
      </h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-[var(--radius-bubble)] animate-fadeSlideIn">
          <p className="text-sm font-sans">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-[var(--ink)] mb-2 font-sans">
            ニックネーム <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-3 text-base text-[var(--ink)] bg-white/80 border-2 border-[var(--muted)]/30 rounded-[var(--radius-bubble)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200 font-sans"
            placeholder="あなたの名前"
            required
            maxLength={20}
            aria-describedby="nickname-help"
          />
          <p id="nickname-help" className="mt-1 text-xs text-[var(--muted)] font-sans">
            最大20文字まで
          </p>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-[var(--ink)] mb-2 font-sans">
            コメント <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-3 text-base text-[var(--ink)] bg-white/80 border-2 border-[var(--muted)]/30 rounded-[var(--radius-bubble)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 resize-none transition-all duration-200 font-sans"
            placeholder="お祝いのメッセージを入力してください"
            rows={4}
            required
            maxLength={200}
            aria-describedby="comment-help"
          />
          <p id="comment-help" className="mt-1 text-xs text-[var(--muted)] font-sans">
            {comment.length}/200文字
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !nickname.trim() || !comment.trim()}
          className="w-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 text-white py-4 px-6 rounded-[var(--radius-bubble)] font-medium font-sans hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {loading ? '送信中...' : submitted ? '送信完了' : '送信'}
        </button>
      </form>
    </div>
  );
}
