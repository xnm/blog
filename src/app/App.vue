<template>
  <section>
    <navbar></navbar>
    <router-view></router-view>
  </section>
</template>


<script>
  import Navbar from './core/components/Navbar';
  export default {
    components: {Navbar},
    name: 'app'
  };
</script>


<style>

</style>
