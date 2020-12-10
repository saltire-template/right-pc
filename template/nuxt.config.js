
const webpack = require('webpack')

let plugins = []

if(process.env.NODE_ENV === 'production'){
  plugins.push("transform-remove-console")
}

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '关于我们 | 维权骑士-让原创更值钱',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: '原创 维权 维权骑士 字体 授权'
    },
    {
      hid: 'description',
      name: 'description',
      content: '关于我们 | 公司简介 | 发展历史 | 产品服务。维权骑士产品业务包括版权监测保护工具，授权管理工具，内容分发服务，确权管理工具，自媒体能力提升课程，版权课程，在线原创度检测工具，新媒体营销变现服务。'
    }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/jquery.min.js', ssr: false }
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/font-awesome/css/font-awesome.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/view-design',
    '@/plugins/api',
    '@/plugins/md5',
    '@/plugins/common',
    '@/plugins/baseUrl',
    '@/store/index',
    {
      src: '@/plugins/saltire_util',
      ssr: false,
      mode: 'client'
    },
    {
      src: '@/plugins/message',
      ssr: false,
      mode: 'client'
    },
    // '@/plugins/verification/disk/longbow.slidercaptcha',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  server: {
    port: 8080, // default: 3000
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost' // default: localhost,
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    "/login": {
      target: 'http://rightknights-back-login-service:8080',
      pathRewrite: { "^/login": "" },
      secure: false,
      ws: true,  // proxy websockets
      changeOrigin: true,  // needed for virtual hosted sites
    },
    "/us": {
      target: 'http://rightknights-back-us-service:8080',
      pathRewrite: { "^/us": "" },
      changeOrigin: true,  // needed for virtual hosted sites
    },
    "/space": {
      target: 'http://rightknights-back-space-service:8080',
      pathRewrite: { "^/space": "" },
      changeOrigin: true,  // needed for virtual hosted sites
    },
    "/pay": {
      target: 'http://rightknights-back-pay-service:8080',
      pathRewrite: { "^/pay": "" },
      changeOrigin: true,  // needed for virtual hosted sites
    },
    "/home": {
      target: 'http://rightknights-back-index-service:8080',
      pathRewrite: { "^/home": "" },
      changeOrigin: true,  // needed for virtual hosted sites
    },
  },
  /*
  ** Build configuration
  */
  build: {
    plugins: [
      // new webpack.ProvidePlugin({
      //   '$': 'jQuery'
      // })
    ],
    babel:{
      'plugins': plugins
    }
  }
}
