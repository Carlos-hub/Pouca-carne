/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        char: "#1C1411",      // marrom carbonizado — fundo
        smoke: "#261C18",     // superfície elevada
        grill: "#3A2A23",     // bordas e divisórias
        ember: "#E4572E",     // laranja brasa — ação principal
        mustard: "#F2C14E",   // destaque, estados pendentes
        pickle: "#7A8B3C",    // verde picles — confirmação
        cream: "#F6EFE7",     // texto principal
        ash: "#A99388",       // texto secundário
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "system-ui", "sans-serif"],
        sans: ["'Instrument Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      keyframes: {
        "rise": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "stamp": {
          "0%": { opacity: "0", transform: "scale(1.6) rotate(-8deg)" },
          "60%": { opacity: "1", transform: "scale(0.94) rotate(-8deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-8deg)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        rise: "rise .5s cubic-bezier(.2,.7,.3,1) both",
        stamp: "stamp .35s cubic-bezier(.2,.8,.3,1) both",
        shimmer: "shimmer 1.6s infinite",
        "slide-in": "slide-in .28s cubic-bezier(.2,.7,.3,1) both",
      },
    },
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
  },
  plugins: [],
}
