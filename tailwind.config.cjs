/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"JetBrains Mono"', 'monospace'],
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },
        primary: {
          900: '#1E3A8A',
          800: '#1E40AF',
          700: '#1D4ED8',
          600: '#2563EB',
          500: '#3B82F6',
          400: '#60A5FA',
          300: '#93C5FD',
          200: '#BFDBFE',
          100: '#DBEAFE',
        },
        neon: {
          primary: '#00f2ff',
          purple: '#b026ff',
          blue: '#4d4dff',
          green: '#00ff9d',
          pink: '#ff69b4',
          red: '#ff4444',
          yellow: '#ffd700',
        },
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(255, 255, 255, 0.37)',
        'neon-primary': '0 0 5px theme("colors.neon.primary"), 0 0 20px theme("colors.neon.primary")',
        'neon-purple': '0 0 5px theme("colors.neon.purple"), 0 0 20px theme("colors.neon.purple")',
      },
    },
  },
  plugins: [],
} 