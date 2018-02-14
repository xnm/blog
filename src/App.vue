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
  .fade-enter-active {
    transition: all .3s ease;
  }

  .fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fade-enter, .fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
