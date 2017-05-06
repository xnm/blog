<!--suppress ALL -->
<template>
  <section>
    <md-card v-if="post.metadata">
      <md-card-header>
        <div class="md-title">{{post.metadata.title}}</div>
        <div class="md-subhead">{{post.metadata.created}}</div>
      </md-card-header>

      <md-card-content class="markdown-body">
        <post-catalogue :catalogue="post.catalogue">
        </post-catalogue>
      </md-card-content>

      <md-card-content id="post-content" class="markdown-body" v-html="post.html">
      </md-card-content>

      <md-card-actions>
        <post-category :category="post.metadata.category"></post-category>
      </md-card-actions>

      <md-card-actions>
        <post-tags :tags="post.metadata.tags"></post-tags>
      </md-card-actions>

      <md-card-content>
        <post-comment
          v-if="disqus.enable"
          :disqus="disqus">
        </post-comment>
      </md-card-content>
    </md-card>
  </section>
</template>


<script>
  import PostCategory from './PostCategory';
  import PostTags from './PostTagList';
  import PostComment from './PostComment';
  import PostCatalogue from './PostCatalogue';
  export default {
    components: {
      PostComment,
      PostTags,
      PostCategory,
      PostCatalogue
    },
    name: 'PostDetailCard',
    props: [
      'post'
    ],
    computed: {
      disqus: function () {
        return this.$store.getters.disqus;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
