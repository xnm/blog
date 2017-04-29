<template>
  <section>
    <md-layout>
      <md-layout
        class="post-summary-card"
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
  import * as types from '../stores/mutation-types';
  import PostSummaryCard from '../components/post/PostSummaryCard';

  export default {
    components: {PostSummaryCard},
    name: 'Posts',
    computed: {
      indexes: function () {
        return this.$store.getters.indexes;
      }
    },
    mounted: function () {
      loadIndexes(this.$store);
    }
  };


  function loadIndexes(store) {
    store.dispatch(types.LOAD_INDEXES);
  }
</script>

<style scoped>
  .post-summary-card {
    padding: 5px;
  }
</style>
