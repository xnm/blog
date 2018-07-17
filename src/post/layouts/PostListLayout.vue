<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <post-preview-card
        v-for="index in indexes"
        :key="index.filename"
        :index="index">
      </post-preview-card>
    </div>
  </div>
</template>

<script>
  import PostPreviewCard from '@/post/components/PostPreviewCard';
  import _ from 'lodash';

  function filterIndexes(indexes, route) {
    let filterKey = _.get(route, 'meta.filter.key');
    let filterType = _.get(route, 'meta.filter.type');
    if (!_.isUndefined(filterKey) && !_.isUndefined(filterType)) {
      let filterValue = route.params[filterKey];
      return _.filter(indexes, function(index) {
        if (_.isArray(index[filterType])) {
          return _.some(index[filterType], function(value) {
            return _.isEqual(value, filterValue);
          });
        } else {
          return _.isEqual(index[filterType], filterValue);
        }
      });
    }
    return indexes;
  }

  export default {
    components: {
      PostPreviewCard
    },
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
