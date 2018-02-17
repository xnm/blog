<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <md-empty-state
        md-rounded
        md-icon="style"
        :md-label="$t('post.nav.tags')"
        md-description="">
      </md-empty-state>
    </div>
    <div class="md-layout md-alignment-center">
      <div class="md-layout-item post-tags-state">
        <post-tag-list :tags="tags"></post-tag-list>
      </div>
    </div>
  </div>
</template>

<script>
  import PostTagList from '@/post/components/PostTagList';

  export default {
    components: {
      PostTagList
    },
    name: 'post-tags-state',
    props: {
      tags: Array
    }
  };
</script>

<style scoped>
  .post-tags-state {
    max-width: 1084px;
  }
</style>
