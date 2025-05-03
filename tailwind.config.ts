import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        code: "var(--code)",
        foreground: "var(--foreground)",
        textcolor: "var(--textcolor)",
      },
      fontFamily: {
        helvetica: ["Helvetica"],
        georgia: ["Georgia"],
      },
    },
  },
  plugins: [],
} satisfies Config;
