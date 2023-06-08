import webpack from 'webpack'
// eslint-disable-next-line nuxt/no-cjs-in-config
const globalSize = require('./backend/getArticlesSize')
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  alias: {
    'images': `/assets/images`,
    'css': `/assets/css`,
    'utils': `/utils`,
    'doc': '/assets/doc'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'title', name: 'title', content: '个人博客' },
      { hid: 'description', name: 'description', content: '记录一些日常笔记，源码阅读笔记归纳，还有个人一些项目展示' },
      { hid: 'keywords', name: 'keywords', content: '博客，项目，算法思路，源码阅读，开源项目' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css' },
    ],
    script: [
      {
        type: 'text/javascript',
        charset: 'utf-8',
        innerHTML: `
        (function(h,e,a,t,m,p) {
            m=e.createElement(a);m.async=!0;m.src=t;
            p=e.getElementsByTagName(a)[0];p.parentNode.insertBefore(m,p);
        })(window,document,'script','https://u.heatmap.it/log.js');
        `
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  env: {
    globalSize
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/_variables.scss',
    '@/assets/css/common.scss',
    '@/assets/css/github-markdown-css.css',
    '@/assets/css/vue-bbs-theme.scss',
    '@/assets/css/github.scss',
    '@/assets/css/overwrite/index.scss',
    '@/assets/css/accordion.scss',
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /**
     * add external plugins
     */
    vendor: ["jquery", "animejs"],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
        anime: ['animejs', 'default'],
      })
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    publicPath: 'https://stonehank.github.io'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/custom.client.js',
    '~/plugins/vue-js-modal.client.js',
    '~/plugins/perfect-scrollbar.client.js',
    '~/plugins/vue-photo-preview.client.js',
    '~/plugins/vue-bbs.client.js',
    '~/plugins/custom.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', {
      defaultAssets: {
        icons: 'fa'
      },
      customVariables: ['~/assets/variables.scss'],
      theme: {
        treeShake: true,
        breakpoint: {
          thresholds: {
            xs: 600,
            sm: 960,
            md: 1264,
            lg: 1904,
          },
        },
        theme: {
          // dark: isDark,
          themes: {
            light: {
              primary: '#2c9ccc',
              secondary: '#cc2c64',
              accent: '#ccb12c',
              error: '#b71c1c',
              info: '#2196f3',
              success: '#4caf50',
              warning: '#FFC107',
            },
            dark: {
              primary: '#45a8d2',
              secondary: '#d44778',
              accent: '#d2b941',
              error: '#cf1d1d',
              info: '#2196f3',
              success: '#54cd58',
              warning: '#FFC107',
            }
          }
        },
        icons: {
          iconfont: 'fa',
        }
      },
    }],
    // '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // generate: {
  //   routes: require('./backend/getRouteInSpa'),
  // },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en',
  //   },
  //   icon: false
  // },
}
