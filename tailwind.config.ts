import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(0 0 0 / 0.9)',
            '--tw-prose-headings': '#fff',
            '--tw-prose-links': '#2563eb', // blue-600
            '--tw-prose-bold': '#000',
            color: 'var(--tw-prose-body)',
            h1: {
              color: 'var(--tw-prose-headings)',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
            },
            'a': {
              color: 'var(--tw-prose-links)',
              '&:hover': {
                color: '#1d4ed8', // blue-700
              },
            },
            strong: {
              color: 'var(--tw-prose-bold)',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
