/*
 * @Author: your name
 * @Date: 2020-10-25 22:17:13
 * @LastEditTime: 2020-11-02 23:25:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/api/article.js
 */
import { request } from '@/http/request';

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  });
};

// 获取公共文章列表
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  });
};

// 添加文章
export const addArticle = params => {
  return request({
    method: 'POST',
    url: "/api/articles",
    data: params
  });
};

// 编辑文章
export const updateArticle = params => {
  return request({
    method: 'PUT',
    url: `/api/articles/${params.slug}`,
    data: params
  });
};


// 删除文章
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  });
};

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  });
};

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  });
};

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  });
};

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  });
};

// 提交文章评论
export const addComments = params => {
  return request({
    method: 'POST',
    url: `/api/articles/${params.slug}/comments`,
    data: {
      comment: params.comment
    }
  });
};

// 删除文章评论
export const deleteComments = params => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${params.slug}/comments/${params.id}`,
  });
};
