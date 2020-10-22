import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com' // api 基础路径
});

// 请求拦截器

// 响应拦截器

export default instance;