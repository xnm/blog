<template>
  <div class="md-alignment-center-center">
    <post-preview-card
      v-for="index in indexes"
      :key="index.filename"
      :index="index">
    </post-preview-card>
  </div>
</template>

<script>
  import PostPreviewCard from '@/post/components/PostPreviewCard';
  import * as types from '@/post/store/mutation-types';
  import {mapGetters} from 'vuex';
  import _ from 'lodash';

  export default {
    components: {PostPreviewCard},
    name: 'post-list-layout',
    computed: mapGetters([
      'indexes'
    ]),
    beforeRouteEnter: function(toRoute, fromRoute, next) {
      this.updateIndexes(toRoute);
      next();
    },
    beforeRouteUpdate: function(toRoute, fromRoute, next) {
      this.updateIndexes(toRoute);
      next();
    },
    methods: {
      updateIndexes(toRoute) {
        let $this = this;
        let filterType = _.get(toRoute, 'meta.filter.type');
        if (!_.isEmpty(filterType)) {
          let filterValue = toRoute.params[filterType];
          let filter = {
            type: filterType,
            value: filterValue
          };
          $this.$store.commit(types.UPDATE_POSTS_FILTER, filter);
        }
        else {
          $this.$store.commit(types.UPDATE_POSTS_FILTER, {});
        }
      }
    }
  };
</script>
