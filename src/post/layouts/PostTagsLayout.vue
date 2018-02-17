<template>
  <div class="tags-rounded">
    <post-tags-state :tags="tags"></post-tags-state>
  </div>

</template>

<script>
  import PostTagList from '@/post/components/PostTagList';
  import titleUtil from '@/post/utils/title-util';
  import _ from 'lodash';
  import PostTagsState from '@/post/components/PostTagsState';

  export default {
    components: {
      PostTagsState,
      PostTagList
    },
    name: 'post-tags-layout',
    computed: {
      tags: function() {
        let $this = this;
        let indexes = $this.$store.getters.indexes;
        let tags = [];
        _.each(indexes, function(index) {
          tags = tags.concat(index.tags);
        });
        return _.union(tags);
      }
    },
    beforeRouteEnter: function(toRoute, fromRoute, next) {
      next(vm => {
        titleUtil.setTitle(vm.$t('post.nav.tags'));
      });
    }
  };
</script>

<style scoped>
  .tags-rounded {
    padding-top: 20px;
  }
</style>
