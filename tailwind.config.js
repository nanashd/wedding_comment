/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 上品で温かいデザインカラー
        'bg-start': '#fff6f3',      // ピンク寄りアイボリー
        'bg-end': '#fdeee7',        // 温かいアイボリー
        'accent': '#2ebd85',        // ブーケグリーン
        'ink': '#3a2e2b',           // 温かいこげ茶
        'muted': '#8d7f79',         // ミュートされた色
        'bubble-left': '#ffffff',    // 左側バブル（他者）
        'bubble-right': '#d6f5e8',  // 右側バブル（自分）
        'gold': '#eacc7c',          // ゴールド
        'gold-light': '#f7e7b4',    // ライトゴールド
        'bokeh': 'rgba(255, 255, 255, 0.1)', // ボケ風装飾
      },
      borderRadius: {
        'radius-small': 'var(--radius-small)',
        'radius-medium': 'var(--radius-medium)',
        'radius-large': 'var(--radius-large)',
        'radius-bubble': 'var(--radius-bubble)',
        '22': '22px',
        '28': '28px',
      },
      boxShadow: {
        'shadow-soft': 'var(--shadow-soft)',
        'shadow-medium': 'var(--shadow-medium)',
        'shadow-bubble': 'var(--shadow-bubble)',
        'elegant': '0 8px 24px rgba(0,0,0,.08)',
        'inner-soft': 'inset 0 1px 2px rgba(0,0,0,.05)',
      },
      animation: {
        'fadeSlideIn': 'fadeSlideIn 0.18s ease-out',
        'fadeSlideInUp': 'fadeSlideInUp 0.6s ease-out',
        'fadeSlideInDown': 'fadeSlideInDown 0.6s ease-out',
        'fadeSlideInLeft': 'fadeSlideInLeft 0.6s ease-out',
        'fadeSlideInRight': 'fadeSlideInRight 0.6s ease-out',
        'pop': 'pop 0.3s ease-out',
        'floatBokeh': 'floatBokeh 6s ease-in-out infinite',
        'heartBeat': 'heartBeat 1.3s ease-in-out',
        'typing': 'typing 1.4s ease-in-out infinite',
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeSlideIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(8px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeSlideInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeSlideInDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeSlideInLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeSlideInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        heartBeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
        floatBokeh: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)', 
            opacity: '0.7' 
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(180deg)', 
            opacity: '1' 
          },
        },
        typing: {
          '0%, 20%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(0)' },
          '80%': { transform: 'translateY(5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounce: {
          '0%, 20%, 53%, 80%, 100%': {
            transform: 'translate3d(0,0,0)',
          },
          '40%, 43%': {
            transform: 'translate3d(0,-30px,0)',
          },
          '70%': {
            transform: 'translate3d(0,-15px,0)',
          },
          '90%': {
            transform: 'translate3d(0,-4px,0)',
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '.5',
          },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
      },
      maxWidth: {
        'content': '1000px',
        'content-wide': '1100px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
