<template>
  <section>
    <md-layout md-align="center">
      <post-detail-card
        class="post-detail-card"
        :post="post">
      </post-detail-card>
    </md-layout>
  </section>
</template>

<script>
  import _ from 'lodash';
  import * as types from '../stores/mutation-types';
  import PostDetailCard from '../components/post/PostDetailCard';
  export default {
    components: {PostDetailCard},
    name: 'PostDetail',
    mounted: function () {
      loadPostDetail(this.$store, this.$route)
    },
    computed: {
      post: function () {
        return this.$store.getters.currentPost;
      }
    }
  };

  function loadPostDetail(store, route) {
    let routeParams = route.params;
    let filename = routeParams.filename;
    store.dispatch(types.LOAD_POST, filename);
  }

</script>


<style lang="scss" scoped>
  $post-detail-card-max-width: 800px;

  .post-detail-card {
    width: 100%;
    max-width: $post-detail-card-max-width;
  }
</style>

