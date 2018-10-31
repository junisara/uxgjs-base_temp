module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'uxgjs-base-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ux공작소 project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/earlyaccess/notosanskr.css' }
    ],
    script:[
      {src:'https://code.jquery.com/jquery-3.3.1.slim.min.js'},
      {src:'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js'},
      {src:'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'}
    ]
  },

  mode: 'spa',

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  modules: [
    ['nuxt-sass-resources-loader', '@/assets/scss/custom-bootstrap.scss'],
  ],

  css: [
    '~/assets/scss/custom-bootstrap.scss',
  ],

  plugins: [
    {
      src: '~/plugins/fireauth',
      ssr: false,
    },
    // new webpack.ProvidePlugin({
    //   $: 'jquery'
    // }),
    // '~/plugins/vue-js-modal',
    // '~/plugins/util',
  ],

  build: {
    vendor: [
      'firebase',
    ],

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  router: {
    middleware: 'router-auth'
  }
}

