/*
 * @Author: your name
 * @Date: 2020-10-25 23:02:00
 * @LastEditTime: 2020-10-25 23:59:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/api/tag.js
 */
import { request } from '@/http/request';

// 获取文章标签列表
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}
