<!--
 * @Author: your name
 * @Date: 2020-10-21 23:18:01
 * @LastEditTime: 2020-11-02 23:23:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-real-world/pages/editor/index.vue
-->
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tag"
                  v-model="editTag"
                  @keydown.13.prevent="inputTag"
                />
                <div class="tag-list">
                  <span v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill">
                    <i class="ion-close-round" @click.stop="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addArticle, updateArticle } from '@/api/article';

export default {
  name: "Editor",
  middleware: 'authenticated',
  computed: {
    slug() {
      return this.$route.params.slug || '';
    }
  },
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      editTag: ''
    };
  },
  methods: {
    inputTag() {
      if (this.editTag && !this.article.tagList.includes(this.editTag)) {
        this.article.tagList.push(this.editTag);
        this.editTag = '';
      }
    },
    removeTag(tagName) {
      const index = this.article.tagList.indexOf(tagName);
      this.article.tagList.splice(index, 1);
    },
    async onSubmit() {
      try {
        const params = {
          article: {
            ...this.article
          },
        };

        let api = addArticle;

        if (this.slug !== '') {
          params.slug = this.slug;
          api = updateArticle;
        }
        const { data } = await api(params);
        this.$router.push(`/article/${data.article.slug}`);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>