export default defineNuxtConfig({
  ssr: true, // nötig für `generate`
  nitro: {
    preset: "static", // sagt Nuxt: baue statische Website
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxt/image",
  ],
  googleFonts: {
    families: {
      Outfit: true,
    },
  },
  css: ["../app/assets/style.css"],
});
