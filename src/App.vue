<template>
  <div>
    <navigation>
      <router-view></router-view>
    </navigation>
  </div>
</template>

<script>
  import Navigation from '@/core/components/nav/Navigation';

  export default {
    components: {Navigation},
    name: 'app'
  };
</script>
