<!--
 * @Author: your name
 * @Date: 2020-11-02 21:21:56
 * @LastEditTime: 2020-11-02 23:46:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/pages/profile/index.vue
-->
<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button v-if="user.username === profile.username" class="btn btn-sm btn-secondary action-btn">
              <nuxt-link
                class="nav-link"
                to="/settings"
              >
                <i class="ion-gear-a"></i>&nbsp;Edit Profile Settings
              </nuxt-link>
            </button>
            <button
              class="btn btn-sm action-btn"
              :class="{
                'btn-secondary': profile.following,
                'btn-outline-secondary': !profile.following,
              }"
              @click="onFollow"
            >
              <i class="ion-plus-round"></i>&nbsp;{{ profile.following ?  'Unfollow' : 'Follow'}} {{ profile.username }} 
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      username: profile.username,
                    }
                  }"
                  class="nav-link"
                  :class="{
                    active: tab !== 'favorites'
                  }"
                >My Articles</nuxt-link>
              <li class="nav-item">
                <nuxt-link
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      username: profile.username,
                    },
                    query: {
                      tab: 'favorites'
                    }
                  }"
                  class="nav-link"
                  :class="{
                    active: tab === 'favorites'
                  }"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <template v-if="!loading">
            <article-item v-for="article in articles" :article="article" :key="article.slug"></article-item>
            <!-- pagination -->
            <nav>
              <ul class="pagination">
                <li
                  class="page-item"
                  :class="{
                    active: item === page
                  }"
                  v-for="item in totalPage"
                  :key="item"
                >
                  <button @click="handlePage(item)" class="btn btn-sm btn-outline-secondary page-link">{{ item }}</button>
                </li>
              </ul>
            </nav>
          </template>
          <div v-else class="article-preview">
           Loading.............
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleItem from '@/pages/home/components/article-item.vue';

import { getProfile, addFollow, deleteFollow } from "@/api/user";
import { getArticles } from '@/api/article';

export default {
  name: "UserProfile",
  middleware: "authenticated",
  components: {
    ArticleItem,
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.pageSize);
    },
  },
  data() {
    return {
      pageSize: 20,
      page: 1,
      articles: [],
      articlesCount: 0,
      loading: true,
    };
  },
  async asyncData({ params, query }) {
    const username = params.username;
    const { data } = await getProfile(username);
    const tab = query.tab || null;
    return {
      profile: Object.assign(data.profile, {
        followingDisabled: false
      }),
      tab
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.getArticles(to.query.tab);
    next();
  },
  mounted() {
    this.getArticles(this.$route.query.tab);
  },
  methods: {
    async getArticles(articleType) {
      if (articleType !== this.tab) {
        this.tab = articleType;
      }
      this.loading = true;
      const params = {
        pageSize: this.pageSize,
        offset: (this.page - 1) * this.pageSize,
      };
      const username = this.$route.params.username;

      if (articleType && articleType === 'favorites') {
        params.favorited = username;
      } else {
        params.author = username;
      }

      try {
        const { data } = await getArticles(params);
        this.articles = data.articles;
        this.articlesCount = data.articlesCount;
      } catch (error) {
        this.articles = [];
        this.articlesCount = 0;
        console.dir(error);
      }
      this.loading = false;
    },
    handlePage(page) {
      this.page = page;
      this.getArticles(this.tab);
    },
    async onFollow() {
      this.profile.followingDisabled = true;
      try {
        if (this.profile.following) {
          await deleteFollow(this.profile.username);
          this.profile.following = false;
        } else {
          await addFollow(this.profile.username);
          this.profile.following = true;
        }
      } catch (error) {
        console.log(error);
      }
      this.profile.followingDisabled = false;
    }
  }
};
</script>
