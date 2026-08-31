/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Senso red, kept from the existing brand (#CA0508) but darkened
        // slightly so white text on it clears 4.5:1. Reserved for actions.
        brand: {
          DEFAULT: "#B4231C",
          deep: "#7C1712",
          tint: "#FCEFED",
          raw: "#CA0508",
        },
        ink: { DEFAULT: "#1C1F26", 2: "#4A505C", muted: "#6A7080" },
        paper: { DEFAULT: "#FAF7F6", surface: "#FFFFFF", 2: "#F3EEEC" },
        line: { DEFAULT: "#E5DDDA", strong: "#D2C7C3" },
        open: { DEFAULT: "#0E6B4E", tint: "#E6F2ED" },
        shut: { DEFAULT: "#8A5A00", tint: "#FBF1DF" },
      },
      fontFamily: {
        // Both families ship harmonised Bengali and Latin, so a mixed string
        // like "OAE টেস্ট" does not switch font mid-sentence.
        sans: ["Hind Siliguri", "Noto Sans Bengali", "system-ui", "sans-serif"],
        display: ["Anek Bangla", "Hind Siliguri", "system-ui", "sans-serif"],
      },
      maxWidth: { prose: "66ch" },
    },
  },
  plugins: [],
};
