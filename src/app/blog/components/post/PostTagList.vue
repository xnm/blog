<!--suppress ALL -->
<template>
  <md-layout class="post-tags" md-align="start">
    <span class="tag-desc">Tags:</span>
    <md-layout>
      <md-chip v-for="(tag, rowIndex) in tags" :key="rowIndex">
        <router-link :to="'/tag/'+tag" tag="span">
          {{tag}}
        </router-link>
      </md-chip>
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
  .tag-desc {
    font-size: 13px;
    line-height: 16px;
    padding: 8px 12px;
    padding-left: 0;
  }

  ,
  .post-tags {
    padding: 5px;
  }

  .chip-link:hover {
    cursor: pointer;
  }
</style>
