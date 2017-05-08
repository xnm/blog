<template>
  <section>
    <md-progress
      v-if="indexes.length == 0 "
      md-indeterminate>
    </md-progress>
    <md-layout>
      <md-layout
        class="card-element"
        md-flex-xsmall="100"
        md-flex-small="50"
        md-flex-medium="33"
        md-flex-large="25"
        md-flex="20"
        v-for="summary in indexes"
        v-bind:key="summary">
        <md-layout md-gutter>
          <post-summary-card :data="summary">
          </post-summary-card>
        </md-layout>
      </md-layout>
    </md-layout>
  </section>
</template>


<script>
  import _ from 'lodash';
  import * as types from '../stores/mutation-types';
  import PostSummaryCard from '../components/post/PostSummaryCard';

  const CATEGORY = 'category';
  const TAG = 'tag';

  export default {
    components: {PostSummaryCard},
    name: 'Posts',
    computed: {
      indexes: function () {
        return filterByRouteParam(this.$store.getters.indexes, this.$route);
      }
    },
    mounted: function () {
      loadIndexes(this.$store);
    }
  };


  function loadIndexes(store) {
    store.dispatch(types.LOAD_INDEXES);
  }

  function filterByRouteParam(indexes, route) {
    let filterType = _.includes(route.path, CATEGORY) ? CATEGORY : TAG;
    let filterValue = route.params['filterValue'];
    if (_.isEqual(CATEGORY, filterType)) {
      return _.filter(indexes, {
        [CATEGORY]: filterValue
      });
    }
    else {
      return _.filter(indexes, function (index) {
        return _.includes(index.tags, filterValue);
      });
    }
  }
</script>

<style scoped>
  .card-element {
    padding: 5px;
  }
</style>
