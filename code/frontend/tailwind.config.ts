import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { bg: "#FAFAF7", surface: "#FFFFFF", primary: "#F4B860", text: "#1F2937" }
    }
  },
  plugins: []
};

export default config;
