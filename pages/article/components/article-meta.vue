<template>
  <div class="article-meta">
    <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
    <div class="info">
      <a
        href=""
        class="author"
      >{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{ active: article.author.following }">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ article.author.username }} 
      <!-- <span class="counter">({{  }})</span> -->
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{ active: article.favorited }">
      <i class="ion-heart"></i>
      &nbsp; Favorite Article <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
export default {
  props: 'article'
}
</script>