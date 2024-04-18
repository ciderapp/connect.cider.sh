// https://nuxt.com/docs/api/configuration/nuxt-config
import materialIcons from "quasar/icon-set/svg-material-icons";
import roundedMaterialIcons from "quasar/icon-set/svg-material-icons-round";
import fontAwesome from "quasar/icon-set/fontawesome-v6";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      "@nuxtjs/kinde",
      "nuxt-quasar-ui"
  ],
  kinde: {
    authDomain: process.env.NUXT_KINDE_AUTH_DOMAIN,
    clientId: process.env.NUXT_KINDE_CLIENT_ID,
    clientSecret: process.env.NUXT_KINDE_CLIENT_SECRET,
    redirectURL: process.env.NUXT_KINDE_REDIRECT_URL,
    logoutRedirectURL: process.env.NUXT_KINDE_LOGOUT_REDIRECT_URL,
    postLoginRedirectURL: process.env.NUXT_KINDE_POST_LOGIN_REDIRECT_URL,
  },
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      autoSubfolderIndex: false
    },
  },
  quasar: {
    config: {
      dark: true
    },
    sassVariables: "~/assets/quasar-variables.scss",
    iconSet: {
      ...materialIcons,
      ...roundedMaterialIcons,
      ...fontAwesome,
    },
    extras: {
      fontIcons: ["material-icons", "fontawesome-v6", "material-icons-round"],
    },
    plugins: ["Dialog", "Notify"],
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
})