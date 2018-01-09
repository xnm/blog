<template>
  <div>
    <span>{{author}}</span>
    <span>{{avator}}</span>
    <span>{{description}}</span>
  </div>
</template>

<script>
  export default {
    name: 'profile',
    props: {
      author: String,
      avator: String,
      description: String
    }
  };
</script>

<style scoped>

</style>
