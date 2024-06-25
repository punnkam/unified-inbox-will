import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Shadcn colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Custom colors
        icon: {
          primary: "#191919",
          secondary: "#4B5563",
          tertiary: "#71717A",
          brand: "#10275B",
          disabled: "#D1D5DB",
          error: "#EF4444",
          "error-alt": "#FB7185",
          success: "#10B981",
          active: "#3B82F6",
          "primary-inverse": "#FFFFFF",
        },
        brand: {
          50: "#CFD4DE",
          100: "#9FA9BD",
          200: "#707D9D",
          300: "#40527C",
          400: "#10275B",
          500: "#0D1F49",
          600: "#0A1737",
          700: "#061024",
          800: "#030812",
        },
        hosty: {
          50: "#D8ECFF",
          100: "#B1D8FF",
          200: "#89C5FF",
          300: "#62B1FF",
          400: "#3B9EFF",
          500: "#2F7ECC",
          600: "#235F99",
          700: "#183F66",
          800: "#0C2033",
        },
        ocean: {
          50: "#FAFBFF",
          100: "#F5F7FE",
          200: "#F1F6FF",
          300: "#EAF0FD",
          400: "#E5ECFD",
          500: "#B7BDCA",
          600: "#898E98",
          700: "#5C5E65",
        },
        fushia: {
          50: "#FDF4FF",
          100: "#FAE8FF",
          200: "#F5D0FE",
          300: "#F0ABFC",
          400: "#E879F9",
          500: "#D946EF",
          600: "#C026D3",
          700: "#A21CAF",
          800: "#86198F",
          900: "#701A75",
          950: "#4A044E",
        },
      },
      backgroundColor: {
        primary: "#FFFFFF",
        "primary-subtle": "#F9FAFB",
        secondary: "#F3F4F6",
        "secondary-hover": "#E4E4E7",
        hover: "#F4F4F5",
        pressed: "#E4E4E7",
        selected: "#E5ECFD",
        "selected-subtle": "#F1F6FF",
        success: "#10B981",
        "success-subtle": "#D1FAE5",
        error: "#EF4444",
        "error-subtle": "#FEE2E2",
        "error-alt": "#FFE4E6",
        "error-hover": "#DC2626",
        brand: "#10275B",
        "brand-hover": "#40527C",
        inverse: "#191919",
        "inverse-subtle": "#030812",
        disabled: "#F8F9FA",
      },
      textColor: {
        primary: "#191919",
        secondary: "#4B5563",
        tertiary: "#71717A",
        brand: "#10275B",
        disabled: "#A1A1AA",
        placeholder: "#A1A1AA",
        error: "#EF4444",
        "error-bold": "#DC2626",
        success: "#10B981",
        "success-bold": "#047857",
        link: "#3B82F6",
        "link-bold": "#2563EB",
        "primary-inverse": "#FFFFFF",
      },
      borderColor: {
        primary: "#F0F0F0",
        secondary: "#E4E4E7",
        "secondary-hover": "#D4D4D8",
        "secondary-disabled": "#E5E7EB",
        tertiary: "#F9FAFB",
        info: "#BFDBFE",
        active: "#2563EB",
        inverse: "#191919",
        "error-alt": "#FB7185",
        success: "#10B981",
      },
      fontSize: {
        // Title - semibold weight
        "title-6xl": ["48px", { lineHeight: "57.6px", fontWeight: 500 }],
        "title-5xl": ["40px", { lineHeight: "48px", fontWeight: 500 }],
        "title-4xl": ["36px", { lineHeight: "43.2px", fontWeight: 500 }],
        "title-3xl": ["30px", { lineHeight: "38.4px", fontWeight: 500 }],
        "title-2xl": ["24px", { lineHeight: "33.6px", fontWeight: 500 }],
        "title-xl": ["22px", { lineHeight: "28.8px", fontWeight: 500 }],
        "title-lg": ["18px", { lineHeight: "24px", fontWeight: 500 }],
        "title-md": ["16px", { lineHeight: "21.6px", fontWeight: 500 }],
        "title-sm": ["14px", { lineHeight: "19.2px", fontWeight: 500 }],

        // Subtitle - medium weight
        "subtitle-xl": ["22px", { lineHeight: "28.8px", fontWeight: 500 }],
        "subtitle-lg": ["18px", { lineHeight: "24px", fontWeight: 500 }],
        "subtitle-md": ["16px", { lineHeight: "21.6px", fontWeight: 500 }],
        "subtitle-sm": ["14px", { lineHeight: "19.2px", fontWeight: 500 }],
        "subtitle-xs": ["12px", { lineHeight: "16.8px", fontWeight: 500 }],
        "subtitle-2xs": ["10px", { lineHeight: "14.4px", fontWeight: 500 }],
        "subtitle-3xs": ["10px", { lineHeight: "12px", fontWeight: 500 }],

        // Body - regular weight
        "body-5xl": ["40px", { lineHeight: "48px", fontWeight: 400 }],
        "body-sm": ["14px", { lineHeight: "19.2px", fontWeight: 400 }],
        "body-xs": ["12px", { lineHeight: "16.8px", fontWeight: 400 }],
        "body-2xs": ["10px", { lineHeight: "14.4px", fontWeight: 400 }],
        "body-3xs": ["10px", { lineHeight: "12px", fontWeight: 400 }],

        // Bold - bold weight
        "bold-sm": ["14px", { lineHeight: "19.2px", fontWeight: 900 }],
        "bold-xs": ["12px", { lineHeight: "16.8px", fontWeight: 900 }],
        "bold-2xs": ["10px", { lineHeight: "14.4px", fontWeight: 900 }],
        "bold-2.5xs": ["11px", { lineHeight: "13.2px", fontWeight: 900 }],
        "bold-3xs": ["10px", { lineHeight: "12px", fontWeight: 900 }],
        "bold-section": ["10px", { lineHeight: "13.2px", fontWeight: 900 }],
      },
      lineHeight: {
        "3xs": "10px",
        "2xs": "12px",
        xs: "14px",
        sm: "16px",
        base: "18px",
        lg: "20px",
        xl: "24px",
        "2xl": "28px",
        "3xl": "32px",
        "4xl": "36px",
        "5xl": "40px",
        "6xl": "48px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      outlineColor: {
        active: "#2563EB",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            // Title Styles
            ".text-title-6xl": {
              fontSize: "48px",
              lineHeight: "57.6px",
              fontWeight: "700",
            },
            ".text-title-5xl": {
              fontSize: "40px",
              lineHeight: "48px",
              fontWeight: "700",
            },
            ".text-title-4xl": {
              fontSize: "36px",
              lineHeight: "43.2px",
              fontWeight: "700",
            },
            ".text-title-3xl": {
              fontSize: "30px",
              lineHeight: "38.4px",
              fontWeight: "700",
            },
            ".text-title-2xl": {
              fontSize: "24px",
              lineHeight: "33.6px",
              fontWeight: "700",
            },
            ".text-title-xl": {
              fontSize: "22px",
              lineHeight: "28.8px",
              fontWeight: "700",
            },
            ".text-title-lg": {
              fontSize: "18px",
              lineHeight: "24px",
              fontWeight: "700",
            },
            ".text-title-md": {
              fontSize: "16px",
              lineHeight: "21.6px",
              fontWeight: "700",
            },
            ".text-title-sm": {
              fontSize: "14px",
              lineHeight: "19.2px",
              fontWeight: "700",
            },

            // Subtitle Styles
            ".text-subtitle-xl": {
              fontSize: "22px",
              lineHeight: "28.8px",
              fontWeight: "500",
            },
            ".text-subtitle-lg": {
              fontSize: "18px",
              lineHeight: "24px",
              fontWeight: "500",
            },
            ".text-subtitle-md": {
              fontSize: "16px",
              lineHeight: "21.6px",
              fontWeight: "500",
            },
            ".text-subtitle-sm": {
              fontSize: "14px",
              lineHeight: "19.2px",
              fontWeight: "500",
            },
            ".text-subtitle-xs": {
              fontSize: "12px",
              lineHeight: "16.8px",
              fontWeight: "500",
            },
            ".text-subtitle-2xs": {
              fontSize: "10px",
              lineHeight: "14.4px",
              fontWeight: "500",
            },
            ".text-subtitle-3xs": {
              fontSize: "10px",
              lineHeight: "12px",
              fontWeight: "500",
            },

            // Body Styles
            ".text-body-5xl": {
              fontSize: "40px",
              lineHeight: "48px",
              fontWeight: "400",
            },
            ".text-body-sm": {
              fontSize: "14px",
              lineHeight: "19.2px",
              fontWeight: "400",
            },
            ".text-body-xs": {
              fontSize: "12px",
              lineHeight: "16.8px",
              fontWeight: "400",
            },
            ".text-body-2xs": {
              fontSize: "10px",
              lineHeight: "14.4px",
              fontWeight: "400",
            },
            ".text-body-3xs": {
              fontSize: "10px",
              lineHeight: "12px",
              fontWeight: "400",
            },

            // Bold Styles
            ".text-bold-sm": {
              fontSize: "14px",
              lineHeight: "19.2px",
              fontWeight: "700",
            },
            ".text-bold-xs": {
              fontSize: "12px",
              lineHeight: "16.8px",
              fontWeight: "700",
            },
            ".text-bold-2xs": {
              fontSize: "10px",
              lineHeight: "14.4px",
              fontWeight: "700",
            },
            ".text-bold-2.5xs": {
              fontSize: "11px",
              lineHeight: "13.2px",
              fontWeight: "700",
            },
            ".text-bold-3xs": {
              fontSize: "10px",
              lineHeight: "12px",
              fontWeight: "700",
            },
            ".text-bold-section": {
              fontSize: "10px",
              lineHeight: "13.2px",
              fontWeight: "700",
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      scrollbar: ["rounded"],
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
