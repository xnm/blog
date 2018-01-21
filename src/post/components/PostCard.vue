<template>
  <div>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {
    name: 'post-card',
    props: {
      post: Object
    }
  };
</script>

<style scoped>

</style>
