/*
 * @Author: your name
 * @Date: 2020-10-25 22:17:13
 * @LastEditTime: 2020-10-25 23:56:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/http/request.js
 */
import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com' // api 基础路径
});

// 请求拦截器
// 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {

  // 请求拦截器
  request.interceptors.request.use(function (config) {
    // 请求就会经过这里
    const { user } = store.state;

    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`;
    }

    // 返回 config 请求配置对象
    return config;
  }, (error) => {
    // 如果请求失败(此时请求还没有发出去)就会进入这里
    // Do something with request error
    return Promise.reject(error);
  })
};