import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F4F1',
        'cream-light': '#FFF8F6',
        'cream-warm': '#F7E7E1',
        blush: '#E8C4C4',
        lavender: '#D9B8FF',
        sky: '#BEE3F8',
        peach: '#FFE5D4',
        dark: '#1A1A1A',
        'warm-text': '#2A2A2A',
        muted: '#8A8A8A',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
export default config
