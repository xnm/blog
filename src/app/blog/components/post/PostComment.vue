<!--suppress ALL -->
<template>
  <div class="comments">
    <vue-disqus
      :shortname="disqus.shortName"
      :identifier="disqusId"
      :url="url">
    </vue-disqus>
  </div>
</template>


<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue';
  export default {
    components: {
      VueDisqus
    },
    props: [
      'disqus'
    ],
    computed: {
      url: function () {
        return location.protocol + '//' + location.hostname + this.$route.path;
      },
      disqusId: function () {
        return this.$route.path.replace(/\//g, '-');
      }
    },
    name: 'PostComment'
  };
</script>

<style scoped lang="scss">

</style>
