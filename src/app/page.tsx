'use client';

import Wall from '@/components/Wall';

export default function Home() {
  return (
    <Wall>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--ink)] mb-8">
            お祝いのメッセージを共有しましょう
          </h2>
          
          <div className="space-y-8">
            <div>
              <a 
                href="/post" 
                className="group inline-block bg-gradient-to-r from-[var(--accent)] to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xl py-5 px-10 rounded-[var(--radius-large)] transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0 focus-ring"
              >
                <span className="inline-block mr-3 group-hover:scale-110 transition-transform duration-200">📝</span>
                メッセージを投稿する
              </a>
            </div>
            
            <div>
              <a 
                href="/wall" 
                className="group inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl py-5 px-10 rounded-[var(--radius-large)] transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0 focus-ring"
              >
                <span className="inline-block mr-3 group-hover:scale-110 transition-transform duration-200">🖥️</span>
                スクリーン表示を見る
              </a>
            </div>
          </div>
          
          <p className="text-[var(--muted)] mt-12 text-base font-sans">
            結婚式の余興として、ゲストの皆様からの温かいお言葉をリアルタイムで共有できます
          </p>
        </div>
      </div>
    </Wall>
  );
}
