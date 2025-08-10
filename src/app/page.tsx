'use client';

import CommentForm from '@/components/CommentForm';
import CommentDisplay from '@/components/CommentDisplay';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white">
      {/* 背景テクスチャ */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-paper.png")',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* 光の玉アニメーション */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-sky-200/40 to-transparent rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '4s' }} />
      
      {/* メインコンテンツ */}
      <div className="relative z-10">
        {/* ヘッダー */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            💒 結婚式コメントウォール 💒
          </h1>
          <p className="text-xl text-gray-600">
            お祝いのメッセージを投稿してください
          </p>
        </div>
        
        {/* 投稿フォーム */}
        <div className="container mx-auto px-4 mb-8">
          <CommentForm />
        </div>
        
        {/* コメント表示 */}
        <div className="container mx-auto px-4">
          <CommentDisplay />
        </div>
      </div>
    </div>
  );
}
