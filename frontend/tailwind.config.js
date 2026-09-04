/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#030712',
          900: '#070c1b',
          850: '#0b1329',
          800: '#0f1b38',
          700: '#16284f',
          600: '#1d376b',
          500: '#254a8e',
        },
        cyan: {
          glow: '#00f0ff',
          neon: '#00d8f6',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          glow: '#ffd700',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, #16284f 0%, #070c1b 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(22, 40, 79, 0.6) 0%, rgba(7, 12, 27, 0.8) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00f0ff 0%, #0088ff 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
