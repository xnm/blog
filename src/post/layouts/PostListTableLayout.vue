<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <post-list-table
        :indexes="indexes"
        :meta="meta">
      </post-list-table>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import titleUtil from '@/post/utils/title-util';
  import PostListTable from '@/post/components/PostListTable';

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
        }
        else {
          return _.isEqual(index[filterType], filterValue);
        }
      });
    }
    return indexes;
  }

  function getMetaByRoute(route) {
    let filterKey = _.get(route, 'meta.filter.key');
    let filterType = _.get(route, 'meta.filter.type');
    if (!_.isUndefined(filterKey) && !_.isUndefined(filterType)) {
      let filterValue = route.params[filterKey];
      return {
        type: filterType,
        key: filterKey,
        value: filterValue
      };
    }
    return undefined;
  }

  export default {
    components: {PostListTable},
    name: 'post-list-table-layout',
    computed: {
      indexes: function() {
        let $this = this;
        let originalIndexes = $this.$store.getters.indexes;
        let route = $this.$route;
        return filterIndexes(originalIndexes, route);
      },
      meta: function() {
        let $this = this;
        return getMetaByRoute($this.$route);
      }
    },
    beforeRouteEnter(toRoute, fromRoute, next) {
      next(function(vm) {
        let meta = getMetaByRoute(vm.$route);
        if (!_.isUndefined(meta)) {
          let metaTitle = vm.$t('post.nav.' + meta.key);
          titleUtil.setFilteredTitle(metaTitle, meta.value);
        }
      });
    },
    beforeRouteUpdate(toRoute, fromRoute, next) {
      let vm = this;
      let meta = getMetaByRoute(toRoute);
      if (!_.isUndefined(meta)) {
        let metaTitle = vm.$t('post.nav.' + meta.key);
        titleUtil.setFilteredTitle(metaTitle, meta.value);
      }
      next();
    }
  };
</script>

<style scoped>
  .post-list-table-item:hover {
    cursor: pointer;
  }
</style>
