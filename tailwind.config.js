export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#e8a598',
        'blush-light': '#f5d5cf',
        'blush-dark': '#d4847a',
        sage: '#8fa68d',
        'sage-light': '#c4d4c2',
        terra: '#c97b5a',
        'terra-light': '#e8b49a',
        cream: '#fdfaf7',
        'cream-2': '#f5f0eb',
        'cream-3': '#ede4da',
        'warm-dark': '#2d2520',
        'warm-brown': '#3d2c2c',
        'warm-mid': '#7a5c5c',
        'warm-muted': '#a08080',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
    },
  },
  plugins: [],
}
