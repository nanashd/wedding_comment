'use client';

import { ReactNode } from 'react';

interface WallProps {
  children: ReactNode;
}

export default function Wall({ children }: WallProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-bg-start to-bg-end">
      {/* ボケ風装飾要素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 左上のリング装飾 */}
        <div className="absolute top-20 left-16 w-32 h-32 opacity-25">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" className="text-ink"/>
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" fill="none" className="text-ink"/>
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" className="text-ink"/>
          </svg>
        </div>
        
        {/* 右上のチャペル装飾 */}
        <div className="absolute top-16 right-20 w-28 h-28 opacity-30">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 L80 30 L80 80 L20 80 L20 30 Z" stroke="currentColor" strokeWidth="2" fill="none" className="text-ink"/>
            <path d="M35 80 L35 90 L65 90 L65 80" stroke="currentColor" strokeWidth="2" fill="none" className="text-ink"/>
            <path d="M45 30 L45 50 M55 30 L55 50" stroke="currentColor" strokeWidth="1" className="text-ink"/>
            <circle cx="50" cy="15" r="3" fill="currentColor" className="text-ink"/>
          </svg>
        </div>
        
        {/* ボケ風の半透明円 */}
        <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-bokeh rounded-full animate-floatBokeh" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-bokeh rounded-full animate-floatBokeh" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-bokeh rounded-full animate-floatBokeh" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-bokeh rounded-full animate-floatBokeh" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-2/3 w-18 h-18 bg-bokeh rounded-full animate-floatBokeh" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* 上品なヘッダー */}
      <header className="relative text-center py-12 px-4 overflow-hidden">
        {/* 背景の微細な装飾 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        
        {/* メインタイトル */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4 drop-shadow-sm">
            結婚式コメントウォール
          </h1>
          
          {/* ゴールドライン */}
          <div className="w-32 h-0.5 bg-gradient-to-r from-gold to-gold-light mx-auto mb-6"></div>
          
          <p className="text-lg md:text-xl text-muted font-medium max-w-md mx-auto leading-relaxed">
            お祝いのメッセージを共有しましょう
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 max-w-content-wide mx-auto px-4 md:px-8 pb-12">
        {children}
      </main>
      
      {/* フッター装飾 */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-start via-bg-start/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
