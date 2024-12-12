// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  ssr: true,
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  app: {
    head: {
      title: 'Trello Test',
      meta: [{ name: 'description', content: 'TEST' }],
    },
  },
  vue: {
    compilerOptions: {
      devtools: false,
    },
  },
  plugins: [
    '~/plugins/pinia.js',
  ],
  localforage: {
    instances: [
      {
        name: 'default',
        storeName: 'tasks',
      },
    ],
  },
});