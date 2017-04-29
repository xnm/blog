<!--suppress ALL -->
<template>
  <md-layout class="post-category">
    <md-layout>
      <md-layout md-column md-tag="span" md-align="center">
        Category:
      </md-layout>
      <md-layout md-flex="80">
        <md-chip>
          {{category}}
        </md-chip>
      </md-layout>
    </md-layout>
  </md-layout>
</template>

<script>
  export default {
    name: 'PostCategory',
    props: [
      'category'
    ]
  };
</script>

<style scoped lang="scss">
  .post-category {
    padding: 5px;
  }
</style>
