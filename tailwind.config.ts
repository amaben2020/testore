module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          light: '#F8F9FB',
          dark: '#5C5C5C',
        },
      },
      fontFamily: {
        primary: 'var(--font-poppins)',
        sans: ['var(--font-poppins)'],
      },
      boxShadow: {
        sm: '0px 1px 3px 0px rgba(0, 0, 0, 0.04)', // Small shadow
        md: '0px 6px 6px 0px rgba(0, 0, 0, 0.03)', // Medium shadow
        lg: '0px 13px 8px 0px rgba(0, 0, 0, 0.02)', // Large shadow
        xl: '0px 23px 9px 0px rgba(0, 0, 0, 0.01)', // Extra-large shadow
        '2xl': '0px 35px 10px 0px rgba(0, 0, 0, 0)', // 2XL shadow
      },
      borderColor: {
        DEFAULT: 'rgba(222, 222, 222, 1)', // Default border color
      },
    },
  },
};
