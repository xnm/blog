<!--suppress ALL -->
<template>
  <md-layout class="post-tags">
    <md-layout>
      <md-layout md-column md-tag="span" md-align="center">
        Tags:
      </md-layout>
      <md-layout md-flex="80">
        <md-chip v-for="(tag, rowIndex) in tags" :key="rowIndex">
          {{tag}}
        </md-chip>
      </md-layout>
    </md-layout>
  </md-layout>
</template>

<script>
  export default {
    name: 'PostTags',
    props: [
      'tags'
    ]
  };
</script>

<style scoped lang="scss">
  .post-tags {
    padding: 5px;
  }
</style>
