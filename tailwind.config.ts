import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#0090FE',
          background: '#F2F8FF',
          hover: '#0085EB',
        },
        progress: {
          pink: '#FFCFCF',
          yellow: '#FFECB2',
          blue: '#CFEBF5',
          purple: '#F8E2FF',
          green: '#D6F2E8',
        },
        chip: {
          red: '#FD9596',
          green: '#ADCEAF',
        },
        red: {
          DEFAULT: '#FF0800',
        },
        gray: {
          1: '#5A5A5A',
          2: '#7E7E7E',
          3: '#ACACAC',
          4: '#D9D9D9',
        },
        black: {
          DEFAULT: '#000000',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
      },
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
      zIndex: {
        star: '2',
        menu: '3',
        modal: '100',
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '20px',
      },
      fontSize: {
        12: '0.75rem',
        14: '0.875rem',
        16: '1rem',
        20: '1.25rem',
        24: '1.5rem',
        32: '2rem',
        40: '2.5rem',
        48: '3rem',
      },
    },
  },
  plugins: [],
};
export default config;
