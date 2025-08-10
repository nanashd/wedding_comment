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
        background: 'var(--bg-primary)',
        foreground: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        accent: 'var(--accent-pink)',
        ink: 'var(--text-primary)',
      },
      borderRadius: {
        'radius-small': 'var(--radius-small)',
        'radius-medium': 'var(--radius-medium)',
        'radius-large': 'var(--radius-large)',
        'radius-bubble': 'var(--radius-bubble)',
      },
      boxShadow: {
        'shadow-soft': 'var(--shadow-soft)',
        'shadow-medium': 'var(--shadow-medium)',
        'shadow-bubble': 'var(--shadow-bubble)',
      },
      animation: {
        'fadeSlideIn': 'fadeSlideIn 0.3s ease-out',
        'pop': 'pop 0.3s ease-out',
        'heartBeat': 'heartBeat 1.3s ease-in-out',
        'floatBokeh': 'floatBokeh 6s ease-in-out infinite',
        'typing': 'typing 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeSlideIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
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
      },
    },
  },
  plugins: [],
}
