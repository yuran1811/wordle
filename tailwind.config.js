/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      animation: { flip: 'flip 1s ease-in-out' },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
      },
    },
  },
};
