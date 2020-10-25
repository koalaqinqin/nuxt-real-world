/*
 * @Author: your name
 * @Date: 2020-10-25 22:17:13
 * @LastEditTime: 2020-10-25 23:59:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/api/user.js
 */
import { request } from '@/http/request';

// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  });
};

// 注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  });
};