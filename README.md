# nuxt-real-world

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## 遇到的问题

- 路由鉴权 middleware
- 使用 `yarn generate` 打包为静态站点资源是绝对路径, 也就是部署github pages 的问题
- 使用 `yarn generate` 打包 动态路由如何解决
- 未登录时，点赞等接口调用需要重定向到 `/login` 页面
- profile 页面需要监听路由参数的变化，然后分别获取喜欢的文章和我的文章 

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
