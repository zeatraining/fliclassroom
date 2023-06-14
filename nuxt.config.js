import colors from 'vuetify/es5/util/colors'
import i18n from './config/i18n.json'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - FliClassroom',
    title: 'FliClassroom',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    [
      '@nuxtjs/i18n',
      {
        //vueI18nLoader: true,
        defaultLocale: 'en',
        locales: [
          {
            code: 'es',
            name: 'Español',
            img: 'mexico',
          },
          {
            code: 'en',
            name: 'English',
            img: 'usa',
          },
        ],
        vueI18n: i18n,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    //baseURL: 'http://localhost:8000/api/',
    baseURL: 'http://172.16.24.113/api/',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login : { url: '/auth/login', method: 'post' }, //, propertyName: 'token'
          logout: false,
          user: false,
        },
      }
    },
    //localStorage: false,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#FF6C37',
          accent: '#FD6C35',
          navbar: '#1F6093',
          sidebar: '#B9CEDE',
          drawer: '#FFDBCD',
          color1: '#1E6094',
          color2: '#FD6C35',
          color3: '#FA748D',
          color4: '#56637D',
          color5: '#8E6665',
          color6: '#C6694D',
          color7: '#333333',

          Recordar: '#FF0000',
          Comprender: '#FF7722',
          Aplicar: '#FFFF00',
          Analizar: '#77DD77',
          Evaluar: '#7777FF',
          Crear: '#2277FF',
          RecordarClaro: '#FFCDD2',
          ComprenderClaro: '#FFAB91',
          AplicarClaro: '#FFF9C4',
          AnalizarClaro: '#AED581',
          EvaluarClaro: '#B39DDB',
          CrearClaro: '#81D4FA',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          color1: '#1E6094',
          color2: '#FD6C35',
          color3: '#AA748D',
          color4: '#06637D',
          color5: '#3E6665',
          color6: '#86694D',
          color7: '#333333',

          Recordar: '#AF0000',
          Comprender: '#AF7722',
          Aplicar: '#AFAF00',
          Analizar: '#77AD77',
          Evaluar: '#7777AF',
          Crear: '#2277AF',
          RecordarClaro: '#E57373',
          ComprenderClaro: '#FF7043',
          AplicarClaro: '#FFEE58',
          AnalizarClaro: '#7CB342',
          EvaluarClaro: '#7E57C2',
          CrearClaro: '#039BE5',
        },

      }
    }
  },

  toast: {
    position: 'top-right',
    duration: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
