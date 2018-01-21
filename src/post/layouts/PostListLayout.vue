<template>
  <div class="md-layout md-alignment-center-center">
    <post-preview-card
      v-for="index in indexes"
      :key="index.filename"
      :index="index">
    </post-preview-card>
  </div>
</template>

<script>
  import PostPreviewCard from '@/post/components/PostPreviewCard';
  import _ from 'lodash';

  function filterIndexes(indexes, route) {
    let filterType = _.get(route, 'meta.filter.type');
    if (!_.isEmpty(filterType)) {
      let filterValue = route.params[filterType];
      return _.filter(indexes, function(index) {
        return _.isEqual(_.lowerCase(index[filterType]), _.lowerCase(filterValue));
      });
    }
    return indexes;
  }

  export default {
    components: {PostPreviewCard},
    name: 'post-list-layout',
    computed: {
      indexes: function() {
        let $this = this;
        let originalIndexes = $this.$store.getters.indexes;
        let route = $this.$route;
        return filterIndexes(originalIndexes, route);
      }
    }
  };
</script>
