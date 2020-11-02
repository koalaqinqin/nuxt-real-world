<!--
 * @Author: your name
 * @Date: 2020-10-25 22:17:13
 * @LastEditTime: 2020-11-03 00:17:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/pages/settings/index.vue
-->
<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="userInfo.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="userInfo.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userInfo.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userInfo.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="userInfo.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProfile, updateUser } from "@/api/user";
import { mapState } from 'vuex';

export default {
  middleware: "authenticated",
  async asyncData({ store }) {
    const username = store.state.user.username;
    const { data } = await getProfile(username);
    return {
      profile: data.profile
    };
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.userInfo = {
      username: this.profile.username,
      bio: this.profile.bio,
      image: this.profile.image,
      email: this.user.email,
      password: '',
    };
  },
  methods: {
    async onSubmit() {
      try {
        await updateUser({ user: this.userInfo });
        this.$router.push(`/profile/${this.userInfo.username}`);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
