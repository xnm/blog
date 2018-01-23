<template>
  <md-card v-if="post" class="post-card">
    <post-header
      :metadata="post.metadata">
    </post-header>
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

  export default {
    components: {
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
    max-width: 800px;
  }
</style>

