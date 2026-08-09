/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          hover: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#0D9488',
          hover: '#0F766E',
        },
        bg: {
          base: '#F8FAFC',
          surface: '#FFFFFF',
          muted: '#F1F5F9',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          onPrimary: '#FFFFFF',
        },
        success: {
          bg: '#DCFCE7',
          text: '#166534',
          border: '#4ADE80',
        },
        warning: {
          bg: '#FEF3C7',
          text: '#92400E',
          border: '#FBBF24',
        },
        error: {
          bg: '#FEE2E2',
          text: '#991B1B',
          border: '#F87171',
        },
        info: {
          bg: '#E0F2FE',
          text: '#075985',
          border: '#38BDF8',
        },
        ai: {
          bg: '#F3E8FF',
          text: '#581C87',
          border: '#C084FC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(30, 58, 138, 0.5)',
      },
      minHeight: {
        'touch': '44px',
      }
    },
  },
  plugins: [],
}
