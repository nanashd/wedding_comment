'use client';

import { ReactNode } from 'react';

interface WallProps {
  children: ReactNode;
}

export default function Wall({ children }: WallProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* かわいい装飾要素 */}
      <div className="absolute top-10 left-8 w-6 h-6 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-32 right-12 w-4 h-4 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* かわいい装飾ライン */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"></div>
      
      {/* LINE風ヘッダー */}
      <header className="chat-header text-center py-8 px-4 relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30"></div>
        
        {/* かわいいアイコン */}
        <div className="relative z-10 flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm border-2 border-white/50 shadow-lg">
            <span className="text-3xl">💒</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
              結婚式コメントウォール
            </h1>
            <p className="text-base md:text-lg text-white/95 font-medium">
              💕 お祝いのメッセージ 💕
            </p>
          </div>
        </div>
        
        {/* かわいい装飾ライン */}
        <div className="relative z-10 flex items-center justify-center space-x-3">
          <div className="w-12 h-1 bg-white/60 rounded-full"></div>
          <span className="text-white/90 text-lg">✨💖✨</span>
          <div className="w-12 h-1 bg-white/60 rounded-full"></div>
        </div>
        
        {/* かわいい装飾要素 */}
        <div className="absolute top-4 left-4 text-2xl opacity-60">🌸</div>
        <div className="absolute top-4 right-4 text-2xl opacity-60">🌺</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-60">🌷</div>
        <div className="absolute bottom-4 right-4 text-2xl opacity-60">🌹</div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 max-w-5xl py-6">
        {children}
      </main>
      
      {/* フッター装飾 */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none"></div>
      
      {/* かわいい装飾要素（下部） */}
      <div className="absolute bottom-20 right-8 w-4 h-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-32 left-16 w-3 h-3 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
}
