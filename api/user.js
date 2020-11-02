/*
 * @Author: your name
 * @Date: 2020-10-25 22:17:13
 * @LastEditTime: 2020-11-03 00:18:29
 * @LastEditors: Please set LastEditors
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

// 添加follow
export const addFollow = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  });
};

// 取消follow
export const deleteFollow = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  });
};

// 获取 profile
export const getProfile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  });
}

// update user， settings
export const updateUser = params => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data: params
  });
};