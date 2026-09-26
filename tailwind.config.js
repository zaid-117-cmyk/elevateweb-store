/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cuberto: {
          black: '#000000',
          dark: '#0a0a0a',
          card: '#141414',
          surface: '#1c1c1c',
          border: 'rgba(255, 255, 255, 0.12)',
          lightBorder: 'rgba(0, 0, 0, 0.12)',
          lightCard: '#f5f5f5',
          lightSurface: '#ededed',
          white: '#ffffff',
          accent: '#0066cc',
          accentHover: '#2997ff',
        },
        obsidian: {
          950: '#05070B',
          900: '#080C14',
          850: '#0C111C',
          800: '#111726',
          700: '#1A2338',
          600: '#263350',
        },
        accent: {
          amber: '#F59E0B',
          amberHover: '#D97706',
          cyan: '#06B6D4',
          cyanHover: '#0891B2',
          emerald: '#10B981',
          purple: '#8B5CF6'
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Outfit', 'Cabinet Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        vintage: ['Cinzel', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 50px -10px rgba(245, 158, 11, 0.25)',
        'glow-cyan': '0 0 50px -10px rgba(6, 182, 212, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-mesh': 'radial-gradient(at 100% 0%, rgba(245, 158, 11, 0.08) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(6, 182, 212, 0.08) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
