/*
 * @Author: your name
 * @Date: 2020-10-20 00:01:07
 * @LastEditTime: 2020-11-03 01:47:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/nuxt.config.js
 */
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? '/nuxt-real-world/' : '/';
const target = process.env.DEPLOY_ENV === 'GH_PAGES' ? 'static': 'server';
export default {
  target,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'luoqin\'s blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/dayjs.js',
    '~/http/request.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  proxy: {
    '/api': {
      target: 'https://conduit.productionready.io',
    }
  },
  generate: {
    routes: ['/profile/luoqin']
  },
  router: { // 自定义路由表规则
    base: routerBase,
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0); // 清除 nuxtJs 基于 pages 目录默认生成的路由表规则
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor/:slug?',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        },
      ]);
    }
  }
}
