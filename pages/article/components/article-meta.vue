<template>
  <div class="article-meta">
    <template v-if="article && article.author">
      <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: article.author.username
            }
          }"
          class="comment-author"
        >
          <img :src="article.author.image" />
        </nuxt-link>
      <div class="info">
        <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }"
            class="author"
          >{{ article.author.username }}</nuxt-link>
        <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
      
      <template v-if="user && article.author.username == user.username">
        <nuxt-link
          exact
          :to="{ name: 'editor', params: { slug: article.slug } }"
          class="btn btn-outline-secondary btn-sm"
        >
          <i class="ion-edit"></i>
          &nbsp; Edit Article
        </nuxt-link>

        <button
          class="btn btn-sm btn-outline-danger"
          @click="onDelete"
        >
          <i class="ion-trash-a"></i>
          &nbsp; Delete Article
        </button>
      </template>
      <template v-else>
        <button
          class="btn btn-sm btn-outline-secondary"
          :class="{ active: article.author.following }"
          :disabled="article.author.followingDisabled"
          @click="onFollow"
        >
          <i class="ion-plus-round"></i>
          &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }} 
        </button>

        &nbsp;&nbsp;
        <button
          class="btn btn-sm btn-outline-primary"
          :class="{ active: article.favorited }"
          :disabled="article.favoriteDisabled"
          @click="onFavorite"
        >
          <i class="ion-heart"></i>
          &nbsp; Favorite Article <span class="counter">({{ article.favoritesCount }})</span>
        </button>
      </template>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'article-meta',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    onFavorite() {
      this.$emit('handle-favorite');
    },
    onFollow() {
      this.$emit('handle-follow');
    },
    onDelete() {
      this.$emit('handle-delete');
    }
  }
}
</script>