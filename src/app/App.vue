<template>
  <section>
    <navigation></navigation>
    <transition name="fade">
      <router-view></router-view>
    </transition>
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

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
