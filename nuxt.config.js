/*
 * @Author: your name
 * @Date: 2020-10-20 00:01:07
 * @LastEditTime: 2020-10-21 23:56:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/nuxt.config.js
 */
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-real-world',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
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
  router: { // 自定义路由表规则
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      console.log(routes);
      routes.splice(0); // 清除 nuxtJs 基于 pages 目录默认生成的路由表规则
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/register',
              name: 'register ',
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/profile/:username',
              name: 'profile ',
              component: resolve(__dirname, 'pages/profile')
            },
            {
              path: '/setting',
              name: 'setting ',
              component: resolve(__dirname, 'pages/setting')
            },
            {
              path: '/editor',
              name: 'editor ',
              component: resolve(__dirname, 'pages/editor')
            },
            {
              path: '/article/:slug',
              name: 'article ',
              component: resolve(__dirname, 'pages/article')
            }
          ]
        },
      ]);
    }
  }
}
