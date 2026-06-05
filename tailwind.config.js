/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3157F6',
        indigo: {
          accent: '#6654F1',
        },
        cyan: {
          accent: '#44D7E8',
        },
        success: '#21A67A',
        critical: '#FF3B3B',
        warning: '#F59E0B',
        'bg-soft': '#F4F6FF',
        'text-primary': '#111827',
        'text-secondary': '#5B6475',
        'border-default': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(49,87,246,0.12), 0 2px 4px rgba(0,0,0,0.06)',
        'glow-blue': '0 0 20px rgba(49,87,246,0.2)',
        'glow-red': '0 0 12px rgba(255,59,59,0.2)',
      },
    },
  },
  plugins: [],
}
