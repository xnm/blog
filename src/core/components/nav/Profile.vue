<template>
  <div>
    <md-card class="md-primary">
      <md-card-header>
        <md-avatar>
          <img :src="avator" alt="avator">
        </md-avatar>
        <div class="md-title">{{author}}</div>
        <div class="md-subhead">{{description}}</div>
      </md-card-header>
    </md-card>
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
