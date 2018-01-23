<template>
  <md-card-content
    id="post-content"
    class="markdown-body"
    v-html="content">
  </md-card-content>
</template>

<script>
  export default {
    name: 'post-content',
    props: {
      content: String
    }
  };
</script>

