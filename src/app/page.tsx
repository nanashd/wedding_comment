'use client';

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
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            💒 結婚式コメントウォール 💒
          </h1>
          <p className="text-2xl text-gray-600 mb-12">
            お祝いのメッセージを共有しましょう
          </p>
          
          <div className="space-y-6">
            <div>
              <a 
                href="/post" 
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                📝 メッセージを投稿する
              </a>
            </div>
            
            <div>
              <a 
                href="/wall" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl py-4 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                🖥️ スクリーン表示を見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
