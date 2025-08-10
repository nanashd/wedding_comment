'use client';

import { ReactNode } from 'react';

interface WallProps {
  children: ReactNode;
}

export default function Wall({ children }: WallProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景グラデーション */}
      <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-start)] to-[var(--bg-end)]" />
      
      {/* 装飾要素 - 左上のリング */}
      <div className="fixed top-8 left-8 w-32 h-32 opacity-25 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="var(--gold-light)" strokeWidth="2" fill="none" opacity="0.6"/>
          <circle cx="50" cy="50" r="35" stroke="var(--gold-dark)" strokeWidth="1" fill="none" opacity="0.4"/>
          <circle cx="50" cy="50" r="25" stroke="var(--gold-light)" strokeWidth="1" fill="none" opacity="0.3"/>
        </svg>
      </div>
      
      {/* 装飾要素 - 右上のチャペル */}
      <div className="fixed top-8 right-8 w-32 h-32 opacity-30 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80 L50 20 L80 80 L70 80 L70 90 L30 90 L30 80 Z" fill="var(--gold-light)" opacity="0.4"/>
          <rect x="40" y="80" width="20" height="10" fill="var(--gold-dark)" opacity="0.3"/>
          <circle cx="50" cy="30" r="3" fill="var(--gold-light)" opacity="0.6"/>
        </svg>
      </div>
      
      {/* Bokeh風の光の玉 */}
      <div className="fixed top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-transparent rounded-full blur-3xl animate-floatBokeh pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-3xl animate-floatBokeh pointer-events-none z-0" style={{ animationDelay: '4s' }} />
      <div className="fixed top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-yellow-200/15 to-transparent rounded-full blur-2xl animate-floatBokeh pointer-events-none z-0" style={{ animationDelay: '2s' }} />
      
      {/* メインコンテンツ */}
      <div className="relative z-10">
        {/* ヘッダー */}
        <header className="text-center py-12 px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--ink)] mb-4 drop-shadow-sm">
            結婚式コメントウォール
          </h1>
          {/* ゴールドライン */}
          <div className="w-48 h-0.5 bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold-dark)] mx-auto rounded-full shadow-sm" />
          <p className="text-lg md:text-xl text-[var(--muted)] mt-6 font-sans">
            お祝いのメッセージがリアルタイムで表示されます
          </p>
        </header>
        
        {/* コンテンツエリア */}
        <main className="container mx-auto px-4 max-w-6xl">
          {children}
        </main>
      </div>
    </div>
  );
}
