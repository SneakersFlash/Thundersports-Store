import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-archivo)", "sans-serif"],
        body:    ["var(--font-archivo)", "sans-serif"],
        display: ["var(--font-archivo)", "sans-serif"],
      },
      colors: {
        // ── Semantic tokens (respect dark/light via CSS vars) ──────────────────
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // ── Brand palette (absolute) ───────────────────────────────────────────
        brand: {
          // Thunder Sports primary — Orange
          orange:        "#FF5D01",
          orangeDark:    "#D44F00",
          orangeLight:   "#FF8A4D",
          // Thunder Sports secondary — Blue
          blue:          "#004F81",
          blueDark:      "#003A5E",
          blueLight:     "#1A6FA3",
          // Legacy aliases — keep existing `brand-yellow*` utilities resolving to the new orange
          yellow:        "#FF5D01",
          yellowdark:    "#D44F00",
          yellowDark:    "#D44F00",
          yellowLight:   "#FF8A4D",
          amber:         "#FF7A1A",
          black:         "#0A0A0A",
          "gray-950":    "#0D0D0D",
          "gray-900":    "#111111",
          "gray-800":    "#1A1A1A",
          "gray-700":    "#242424",
          "gray-600":    "#2E2E2E",
          "gray-500":    "#3D3D3D",
          "gray-400":    "#606060",
          "gray-300":    "#888888",
          "gray-200":    "#B0B0B0",
          "gray-100":    "#D8D8D8",
          "gray-50":     "#F0F0F0",
          white:         "#F8F8F8",
          "light-bg":    "#F5F5F0",
          "light-card":  "#FFFFFF",
          "light-border":"#E2E2DC",
        },
      },
      spacing: {
        "navbar-h": "64px",
        "subnav-h": "40px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "cart-bounce": {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(1.3)" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bolt-pulse": {
          "0%, 100%": { opacity: "1",   transform: "scale(1)" },
          "50%":      { opacity: "0.7", transform: "scale(0.92)" },
        },
      },
      animation: {
        shimmer:       "shimmer 2s linear infinite",
        "cart-bounce": "cart-bounce 0.4s ease-in-out",
        "slide-up":    "slide-up 0.5s ease-out",
        "fade-in":     "fade-in 0.3s ease-out",
        "bolt-pulse":  "bolt-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--muted-foreground)/0.1) 50%, hsl(var(--muted)) 75%)",
        "orange-gradient":
          "linear-gradient(135deg, #FF8A4D 0%, #FF5D01 50%, #D44F00 100%)",
        "orange-glow":
          "radial-gradient(circle, rgba(255,93,1,0.15) 0%, transparent 70%)",
        "thunder-gradient":
          "linear-gradient(135deg, #FF5D01 0%, #004F81 100%)",
      },
      boxShadow: {
        "orange-sm": "0 0 12px rgba(255,93,1,0.25)",
        "orange-md": "0 0 24px rgba(255,93,1,0.30)",
        "orange-lg": "0 0 48px rgba(255,93,1,0.20)",
      },
    },
  },
  plugins: [],
};

export default config;