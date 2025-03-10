import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      mobile: { min: "0px", max: "639px" },
      tablet: { min: "640px", max: "1024px" },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#0090FE",
          background: "#F2F8FF",
          hover: "#0085EB",
        },
        progress: {
          pink: "#FFCFCF",
          yellow: "#FFECB2",
          blue: "#CFEBF5",
          purple: "#F8E2FF",
          green: "#D6F2E8",
        },
        chip: {
          red: "#FD9596",
          green: "#ADCEAF",
          bronze: "#AD5600",
          silver: "#435F7A",
          gold: "#EC9A00",
          platinum: "#27E2A4",
          diamond: "#00B4FC",
          ruby: "#FF0062",
        },
        red: {
          DEFAULT: "#FF0800",
        },
        gray: {
          1: "#5A5A5A",
          2: "#7E7E7E",
          3: "#ACACAC",
          4: "#D9D9D9",
          5: "#EDEDED",
          6: "#7a7a7a",
        },
        black: {
          DEFAULT: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
      },
      zIndex: {
        star: "2",
        menu: "3",
        modal: "100",
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "20px",
      },
      fontSize: {
        12: "0.75rem",
        14: "0.875rem",
        16: "1rem",
        20: "1.25rem",
        24: "1.5rem",
        32: "2rem",
        36: "2.25rem",
        40: "2.5rem",
        48: "3rem",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Tailwind의 기본 스타일 리셋 비활성화
  },
};
export default config;
