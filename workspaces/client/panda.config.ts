import { defineConfig, definePreset } from "@pandacss/dev";

const acmePreset = definePreset({
  theme: {
    extend: {
      tokens: {
        colors: { primary: { value: 'blue.500' } }
      }
    }
  },
  name: "acmePreset"
})

export default defineConfig({
  // Whether to use css reset
  presets: ['@pandacss/dev/presets', acmePreset],
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "../app/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "../app/styled-system",
});
