/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        fest: {
          // Warm amber/orange primary — fest energy
          primary: {
            50: '#fff8ed',
            100: '#ffefd4',
            200: '#ffdba8',
            300: '#ffc070',
            400: '#ff9a37',
            500: '#ff7a0f',
            600: '#f05e06',
            700: '#c74708',
            800: '#9e3a0e',
            900: '#7f320f',
          },
          // Teal secondary — cool contrast
          secondary: {
            50: '#f0fdfa',
            100: '#ccfbef',
            200: '#99f6e0',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          },
          // Accent — hot pink for highlights
          accent: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
          success: {
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
          },
          warning: {
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
          },
          error: {
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
          },
          // Dark neutrals — near-black backgrounds
          dark: {
            50: '#f6f6f7',
            100: '#e2e2e4',
            200: '#c4c4c8',
            300: '#9b9ba1',
            400: '#6e6e76',
            500: '#4d4d55',
            600: '#3a3a42',
            700: '#2a2a30',
            800: '#1c1c22',
            900: '#111115',
            950: '#0a0a0d',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-out': 'fadeOut 0.4s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scroll-x': 'scrollX 30s linear infinite',
        'netflix-zoom': 'netflixZoom 2.5s ease-out forwards',
        'netflix-blur': 'netflixBlur 2.5s ease-out forwards',
        'netflix-fade': 'netflixFade 4s ease-in forwards',
        'intro-bg': 'introBg 3s ease-in-out forwards',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,122,15,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,122,15,0.6)' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        netflixZoom: {
          '0%': { transform: 'scale(0) rotate(-5deg)', opacity: '0' },
          '40%': { transform: 'scale(1.1) rotate(2deg)', opacity: '1' },
          '60%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        netflixBlur: {
          '0%': { filter: 'blur(20px)', opacity: '0' },
          '30%': { filter: 'blur(0px)', opacity: '1' },
          '70%': { filter: 'blur(0px)', opacity: '1' },
          '100%': { filter: 'blur(8px)', opacity: '0' },
        },
        netflixFade: {
          '0%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
        introBg: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.1)', opacity: '0' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
