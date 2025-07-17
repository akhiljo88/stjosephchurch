/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      colors: {
        church: {
          primary: '#1a1a2e',
          secondary: '#16213e',
          accent: '#0f3460',
          gold: '#d4af37',
          lightGold: '#f4e4a6',
          cream: '#faf8f3',
          silver: '#c0c0c0',
          burgundy: '#722f37',
          navy: '#2c3e50',
          pearl: '#f8f6f0',
        },
        sacred: {
          blue: '#1e3a8a',
          purple: '#6b46c1',
          gold: '#f59e0b',
          white: '#ffffff',
          cream: '#fef7ed',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'cross-glow': 'crossGlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        crossGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)',
            transform: 'scale(1.05)'
          },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'christian-pattern': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d4af37" fill-opacity="0.1"%3E%3Cpath d="M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      boxShadow: {
        'divine': '0 25px 50px -12px rgba(212, 175, 55, 0.25)',
        'sacred': '0 20px 40px -12px rgba(30, 58, 138, 0.25)',
        'elegant': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};