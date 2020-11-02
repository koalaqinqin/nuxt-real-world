<!--
 * @Author: your name
 * @Date: 2020-10-21 22:53:51
 * @LastEditTime: 2020-11-03 00:24:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/pages/login/index.vue
-->
<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link
              to="/register"
              v-if="isLogin"
            >Need an account?</nuxt-link>
            <nuxt-link
              to="/login"
              v-else
            >Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(messages, field) in errorMsg" :key="field">{{ field }} {{ messages }}</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset
              class="form-group"
              v-if="!isLogin"
            >
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                minlength="6"
                required
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined; // 浏览器端操作cookie的包

export default {
  name: 'Login',
  middleware: 'notAuthenticated',
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    }
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errorMsg: {}
    };
  },
  methods: {
    async onSubmit() {
      try {
        const api = this.isLogin ? login : register;
        const { data } = await api({ user: this.user });

        this.$store.commit('setUser', data.user);
        Cookie && Cookie.set('user', data.user); // 登录状态存cookie，防止刷新页面cookie丢失

        this.$router.push('/');
      } catch (err) {
        this.errorMsg = err.response.data.errors
      }
    }
  }
}
</script>