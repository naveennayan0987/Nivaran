/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // App background
        bg: '#F5F2EE',
        'bg-card': '#FFFFFF',

        // Typography
        'text-primary':   '#1A1A1A',
        'text-secondary': '#6B7280',
        'text-muted':     '#9CA3AF',

        // Primary accent (Nivaran green)
        'accent':       '#2D6A4F',
        'accent-dark':  '#1E4D38',
        'accent-mid':   '#3A7D5E',
        'accent-light': '#D8EFE3',

        // Status: overdue (warm amber — NOT red)
        'overdue':        '#C97A12',
        'overdue-bg':     '#FEF3C7',
        'overdue-border': '#FCD34D',

        // Status: on-track (green)
        'on-track':    '#059669',
        'on-track-bg': '#D1FAE5',

        // Status: due-soon (soft amber)
        'due-soon':    '#B45309',
        'due-soon-bg': '#FEF3C7',

        // Borders
        'border-light': '#E8E4DF',
        'border-card':  '#EDEBE7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      maxWidth: {
        'mobile': '390px',
      },
      fontSize: {
        'xxs': '10px',
      },
    },
  },
  plugins: [],
}
