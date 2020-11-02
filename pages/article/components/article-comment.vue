<template>
  <div>
    <form @submit.prevent="onComment" class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment"
        ></textarea>
      </div>
      <div class="card-footer">
        <img
          :src="user ? user.image : ''"
          class="comment-author-img"
        />
        <button class="btn btn-sm btn-primary" :class="{disabled: comment === ''}">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="msg in commentsList" :key="msg.id">
      <div class="card-block">
        <p class="card-text" v-html="msg.body"></p>
      </div>
      <div class="card-footer" v-if="msg.author">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: msg.author.username
            }
          }"
          class="comment-author"
        >
          <img
            :src="msg.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: msg.author.username
            }
          }"
          class="comment-author"
        >{{ msg.author.username }}</nuxt-link>
        <span class="date-posted">{{ msg.author.createdAt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addComments, getComments } from '@/api/article';

export default {
  name: 'article-comment',
  data() {
    return {
      comment: '',
      commentsList: []
    };
  },
  computed: {
    ...mapState(['user']),
    slug() {
      return this.$route.params.slug;
    }
  },
  mounted() {
    this.getCommentsList();
  },
  methods: {
    async getCommentsList() {
      try {
        const { data } = await getComments(this.slug);
        this.commentsList = data.comments;
      } catch ({ response = {} }) {
        console.dir(response.data.errors.message);
      }
    },
    async onComment() {
      const params = {
        slug: this.slug,
        comment: {
          body: this.comment
        }
      };
      try {
        await addComments(params);
        this.getCommentsList();
      } catch ({ response = {} }) {
        console.dir(response.data.errors.message);
      }
    }
  }
}
</script>