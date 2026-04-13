/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.php",
    "./assets/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        gold: "var(--gold)",
        "gold-dark": "var(--gold-dark)",
        beige: "var(--beige)",
        "beige-dark": "var(--beige-dark)",
        ring: "var(--ring)",
        accent: "var(--accent)",
    "accent-foreground": "var(--accent-foreground)",
    muted: "var(--muted)",
    "muted-foreground": "var(--muted-foreground)",
    secondary: "var(--secondary)",
    "secondary-foreground": "var(--secondary-foreground)",
    primary: "var(--primary)",
    "primary-foreground": "var(--primary-foreground)",
      },
    },
  },
  plugins: [],
};