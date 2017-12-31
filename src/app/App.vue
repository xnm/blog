<template>
  <section>
    <navigation></navigation>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import Navigation from '@/app/blog/components/nav/Navigation';

  export default {
    components: {Navigation},
    name: 'app'
  };
</script>

<style>

</style>
