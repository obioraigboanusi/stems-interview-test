const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.8rem',
        sm: '1rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    // fontSize: {
    //   xs: [
    //     //14px, 16px
    //     '.75rem',
    //     {
    //       letterSpacing: '-0.01em',
    //       lineHeight: 1.2,
    //       margin: 0,
    //       fontWeight: 500,
    //     },
    //   ],
    //   sm: [
    //     //14px, 16px
    //     '1rem',
    //     {
    //       letterSpacing: '-0.01em',
    //       lineHeight: 1.2,
    //       margin: 0,
    //       fontWeight: 500,
    //     },
    //   ],
    //   base: [
    //     //16px, 18px
    //     '1.125rem',
    //     {
    //       lineHeight: 1.2,
    //       margin: 0,
    //       fontWeight: 500,
    //     },
    //   ],
    //   lg: [
    //     // 18px, 24px, 30px
    //     'clamp(1.25rem, 1rem + 0.56vw, 1.875rem)',
    //     {
    //       letterSpacing: '-0.01em',
    //       fontWeight: 600,
    //     },
    //   ],
    //   xl: [
    //     // 24px, 33px, 41px
    //     'clamp(1.5rem, 1.17rem + 1vw, 2.56rem)',
    //     {
    //       letterSpacing: '-0.015em',
    //       fontWeight: 600,
    //     },
    //   ],
    //   '2xl': [
    //     // 33px, 41px, 51px
    //     'clamp(2.05rem, 1.5rem + 1.2vw, 3.18rem)',
    //     {
    //       letterSpacing: '-0.015em',
    //       fontWeight: 600,
    //     },
    //   ],
    //   '3xl': [
    //     // 41px, 54px, 67px
    //     'clamp(2.56rem, 1.58rem + 2vw, 4.18rem)',
    //     {
    //       letterSpacing: '-0.015em',
    //       lineHeight: 1.12,
    //       fontWeight: 600,
    //     },
    //   ],
    //   '4xl': [
    //     // 54px, 72px, 90px
    //     'clamp(3.375rem, 2.7rem + 2vw, 5.62rem)',
    //     {
    //       letterSpacing: '-0.015em',
    //       fontWeight: 600,
    //     },
    //   ],
    //   '5xl': [
    //     // 62px, 96px, 120px
    //     'clamp(3.875rem, 3.3rem + 3vw, 7.5rem)',
    //     {
    //       letterSpacing: '-0.015em',
    //       lineHeight: 1.2,
    //       fontWeight: 600,
    //     },
    //   ],
    //   '6xl': [
    //     '15vw',
    //     {
    //       lineHeight: 1,
    //       fontWeight: 600,
    //     },
    //   ],
    // },
    extend: {
      boxShadow: {
        highlight: '0px 2px 20px 5px rgba(93, 62, 255, 0.2)',
      },
      fontFamily: {
        sans: ['var(--font-pp)', ...fontFamily.sans],
      },
      borderRadius: {
        '100vw': '100vw',
        full: '100%',
      },
      colors: {
        dark1: '#080617',
        dark2: '#22202E',
        white: '#F8F7FD',
        primary: '#6C5DD3',
        vibrant: '#5D3EFF',
        error: '#ef4444',
      },
      animation: {
        text: 'text 5s ease infinite',
        overlayShow: 'overlayShow 150ms ease-in',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        overlayShow: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-radix'),
    require('tailwindcss-animate'),
  ],
};
