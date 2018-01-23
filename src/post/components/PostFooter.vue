<template>
  <div>
    <post-category :category="metadata.category"></post-category>
    <post-tag-list :tags="metadata.tags"></post-tag-list>
    <post-comment
      v-if="config.features.disqus.enable"
      :shortname="config.features.disqus.short_name">

    </post-comment>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import PostCategory from '@/post/components/PostCategory';
  import PostTagList from '@/post/components/PostTagList';
  import PostComment from '@/post/components/PostComment';

  export default {
    components: {
      PostComment,
      PostTagList,
      PostCategory
    },
    name: 'post-footer',
    props: {
      metadata: Object
    },
    computed: mapGetters([
      'config'
    ])
  };
</script>

<style scoped>

</style>
