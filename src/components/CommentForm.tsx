'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CommentForm() {
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !comment.trim()) return;

    console.log('投稿開始 - loading状態をtrueに設定');
    setLoading(true);
    
    try {
      console.log('Firestore保存処理開始');
      // Firestoreに保存
      await addDoc(collection(db, "messages"), {
        nickname: nickname.trim(),
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });
      console.log('Firestore保存完了');

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

    } catch (error) {
      console.error('送信エラー:', error);
      alert('投稿に失敗しました。もう一度お試しください。');
    } finally {
      console.log('finallyブロック実行 - loading状態をfalseに設定');
      // 成功・失敗問わず必ずローディング解除
      setLoading(false);
      console.log('loading状態をfalseに設定完了');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        コメントを投稿
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
            ニックネーム *
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 text-lg text-gray-900 bg-gray-50 border-[1.5px] border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 transition-colors"
            placeholder="あなたの名前"
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            コメント *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 text-lg text-gray-900 bg-gray-50 border-[1.5px] border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 resize-none transition-colors"
            placeholder="お祝いのメッセージを入力してください"
            rows={3}
            required
            maxLength={200}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !nickname.trim() || !comment.trim()}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-md font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '送信中...' : submitted ? '送信完了' : '送信'}
        </button>
      </form>
    </div>
  );
}
