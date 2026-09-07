/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#030712',
          navy: '#060d1f',
          panel: 'rgba(6, 17, 36, 0.75)',
          cyan: '#00f0ff',
          blue: '#0070f3',
          purple: '#7928ca',
          glow: 'rgba(0, 240, 255, 0.5)',
          border: 'rgba(0, 240, 255, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Share Tech Mono', 'monospace'],
        display: ['Space Grotesk', 'Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 4s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spinReverse 14s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.8))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.4))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
}
