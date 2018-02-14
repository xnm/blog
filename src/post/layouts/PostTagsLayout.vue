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
        document.title = vm.$t('post.nav.tags') + ' | ' + document.title;
      });
    }
  };
</script>

<style scoped>
  .tags-rounded {
    padding-top: 20px;
  }
</style>
