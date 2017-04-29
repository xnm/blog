<!--suppress ALL -->
<template>
  <section>
    <md-card v-if="post.metadata">
      <md-card-header>
        <div class="md-title">{{post.metadata.title}}</div>
        <div class="md-subhead">{{post.metadata.created}}</div>
      </md-card-header>

      <md-card-content class="markdown-body" v-html="post.html">
      </md-card-content>

      <md-card-actions>
        <post-category :category="post.metadata.category"></post-category>
      </md-card-actions>

      <md-card-actions>
        <post-tags :tags="post.metadata.tags"></post-tags>
      </md-card-actions>
    </md-card>
    <md-progress v-else md-indeterminate></md-progress>
  </section>
</template>


<script>
  import PostCategory from './PostCategory';
  import PostTags from './PostTagList';
  export default {
    components: {
      PostTags,
      PostCategory
    },
    name: 'PostDetailCard',
    props: [
      'post'
    ]
  }
</script>

<style lang="scss" scoped>
  $tag-chip-padding: 5px;

  .post-tags {
    padding: $tag-chip-padding;
  }
</style>
