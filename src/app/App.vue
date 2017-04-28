<template>
  <section>
    <navigation></navigation>
    <router-view></router-view>
  </section>
</template>


<script>
  import _ from 'lodash';

  import Navigation from './core/components/navigation/Navigation.vue';
  import * as types from './core/stores/mutation-types';

  export default {
    components: {
      Navigation
    }
  };


</script>


<style>

</style>
