<!--suppress ALL -->
<template>
  <md-layout class="post-category">
    <md-layout>
      <span class="category-desc">
        Category:
      </span>
      <md-layout>
        <md-chip>
          <router-link tag="span" :to="'/category/'+category" class="chip-link">
            {{category}}
          </router-link>
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
  .category-desc {
    font-size: 13px;
    line-height: 16px;
    padding: 8px 12px;
    padding-left: 0;
  }

  .post-category {
    padding: 5px;
  }

  .chip-link:hover {
    cursor: pointer;
  }
</style>
