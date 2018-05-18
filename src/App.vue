<template>
  <div>
    <navigation
      :title="title"
      :description="description"
      :author="author"
      :avator="avator"
      :menus="menus">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </navigation>
  </div>
</template>

<script>
  import Navigation from '@/core/components/nav/Navigation';

  import {mapGetters} from 'vuex';

  export default {
    components: {Navigation},
    name: 'app',
    computed: mapGetters([
      'title',
      'description',
      'author',
      'avator',
      'menus'
    ])
  };
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
