<!--
 * @Author: your name
 * @Date: 2020-10-21 22:48:48
 * @LastEditTime: 2020-10-26 00:17:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/pages/home/index.vue
-->
<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                >Global Feed</nuxt-link>
              </li>

              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    }
                  }"
                ># {{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <article-item v-for="article in articles" :key="article.slug" :article="article"></article-item>

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
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item
                  }
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >{{ item }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getArticles, getYourFeedArticles } from '@/api/article';
import { getTags } from '@/api/tag';
import ArticleItem from './components/article-item.vue';

export default {
  components: {
    ArticleItem
  },
  async asyncData ({ query }) {
    const page = Number.parseInt(query.page || 1);
    const pageSize = 20;
    const tab = query.tab || 'global_feed';
    const tag = query.tag;

    const loadArticles = tab === 'your_feed' ? getYourFeedArticles : getArticles;

    const [ articleRes, tagRes ] = await Promise.all([
      loadArticles({
        pageSize,
        offset: (page - 1) * pageSize,
        tag,
      }),
      getTags(),
    ]);

    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;

    articles.forEach(article => article.favoriteDisabled = false);

    return {
      articles, // 文章列表
      articlesCount, // 文章总数
      tags, // 标签列表
      pageSize, // 每页大小
      page, // 页码
      tab, // 选项卡
      tag, // 数据标签
    };
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.pageSize);
    },
  },
};
</script>
