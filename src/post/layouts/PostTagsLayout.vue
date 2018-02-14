<template>
  <div class="tags-rounded">
    <div class="md-layout md-alignment-center-center">
      <md-empty-state

        md-rounded
        md-icon="style"
        :md-label="$t('post.nav.tags')"
        md-description="">
      </md-empty-state>
    </div>
    <div class="md-layout mg-alignment-center-center">
      <post-tag-list :tags="tags"></post-tag-list>
    </div>
  </div>

</template>

<script>
  import PostTagList from '@/post/components/PostTagList';
  import titleUtil from '@/post/utils/title-util';
  import _ from 'lodash';

  export default {
    components: {PostTagList},
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
