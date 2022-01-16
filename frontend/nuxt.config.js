export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Runtime Config: https://nuxtjs.org/guide/runtime-config
  publicRuntimeConfig: {
    graphql: {
      endpoint: process.env.GRAPHQL_HTTP_ENDPOINT,
    },
    pusher: {
      key: process.env.PUSHER_APP_KEY,
      cluster: process.env.PUSHER_APP_CLUSTER,
      tls: process.env.PUSHER_APP_TLS,
      host: process.env.PUSHER_APP_HOST,
      port: process.env.PUSHER_APP_PORT,
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/apollo.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Apollo Configuration
  apollo: {
    clientConfigs: {
      default: '~/graphql/clients/pusher.ts',
    },
  },
}
