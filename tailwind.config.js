export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#c9a96e',
        'gold-light': '#e8d5b0',
        'gold-dark': '#a07840',
        'dark-bg': '#080808',
        'dark-card': '#111111',
        'dark-surface': '#1a1a1a',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
    },
  },
  plugins: [],
}
