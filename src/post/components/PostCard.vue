<template>
  <md-card v-if="post" class="post-card">
    <post-header
      :metadata="post.metadata">
    </post-header>
    <post-catalogue
      :catalogue="post.metadata.catalogue">
    </post-catalogue>
    <post-content
      :content="post.html">
    </post-content>
    <post-footer
      :metadata="post.metadata">
    </post-footer>
  </md-card>
</template>

<script>
  import PostHeader from '@/post/components/PostHeader';
  import PostContent from '@/post/components/PostContent';
  import PostFooter from '@/post/components/PostFooter';
  import PostCatalogue from '@/post/components/PostCatalogue';

  export default {
    components: {
      PostCatalogue,
      PostFooter,
      PostContent,
      PostHeader
    },
    name: 'post-card',
    props: {
      post: Object
    }
  };
</script>

<style scoped>
  .post-card {
    width: 100%;
    max-width: 1084px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>

