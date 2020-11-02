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
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        :disabled="article.author.followingDisabled"
        @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{ article.author.username }} 
      </button>
    </template>
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
  </div>
</template>

<script>
export default {
  name: 'article-meta',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onFavorite() {
      this.$emit('handle-favorite');
    },
    onFollow() {
      this.$emit('handle-follow');
    }
  }
}
</script>