<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta
          :article="article"
          @handle-favorite="onFavorite"
          @handle-follow="onFollow"
        ></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />
      <div class="article-actions">
        <article-meta
          :article="article"
          @handle-favorite="onFavorite"
          @handle-follow="onFollow"
        ></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment></article-comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MarkdownIt from 'markdown-it';
import ArticleMeta from './components/article-meta.vue';
import ArticleComment from './components/article-comment.vue';
import { getArticle, getComments, deleteFavorite, addFavorite } from '@/api/article';
import { addFollow, deleteFollow } from '@/api/user';

export default {
  name: 'Article',
  components: {
    ArticleMeta,
    ArticleComment,
  },
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);

    return {
      article
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async onFavorite() {
      let article = this.article;
      article.favoriteDisabled = true;
      try {
        if (article.favorited) {
          // 取消点赞
          await deleteFavorite(article.slug);
          article.favorited = false;
          article.favoritesCount -= 1;
        } else {
          // 添加点赞
          await addFavorite(article.slug);
          article.favorited = true;
          article.favoritesCount += 1;
        }
      } catch (error) {
        console.log(error);
      }
      article.favoriteDisabled = false;
    },
    async onFollow() {
      let author = this.article.author;
      author.followingDisabled = true;
      try {
        if (author.following) {
          await deleteFollow(author.username);
          author.following = false;
        } else {
          await addFollow(author.username);
          author.following = true;
        }
      } catch (error) {
        console.log(error);
      }
      author.followingDisabled = false;
    }
  }
};
</script>
