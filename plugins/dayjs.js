/*
 * @Author: your name
 * @Date: 2020-10-25 22:45:54
 * @LastEditTime: 2020-10-25 22:56:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/plugins/dayjs.js
 */
import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(value).format(format));
