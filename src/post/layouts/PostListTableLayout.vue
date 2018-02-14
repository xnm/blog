<template>
  <div>
    <md-table v-model="indexes" md-sort="created" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{$t('post.nav.'+ meta.key)}} : {{ meta.value}}</h1>
      </md-table-toolbar>

      <md-table-row
        slot="md-table-row"
        slot-scope="{item}"
        class="post-list-table-item"
        @click.native="toPostDetail(item)"
      >
        <md-table-cell :md-label="$t('post.nav.date')">{{ item.created }}</md-table-cell>
        <md-table-cell :md-label="$t('post.nav.title')">{{ item.title }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import _ from 'lodash';
  import titleUtil from '@/post/utils/title-util';

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
    methods: {
      toPostDetail: function(index) {
        let $this = this;
        let link = index.link;
        $this.$router.push({
          path: link
        });
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
