<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <post-card :post="post">

    </post-card>
  </div>
</template>

<script>
  import postApi from '@/post/api/post.api';
  import PostCard from '@/post/components/PostCard';

  export default {
    components: {
      PostCard
    },
    name: 'post-layout',
    data() {
      return {
        post: null
      };
    },
    created: function() {
      let $this = this;
      $this.loadPost();
    },
    watch: {
      '$route': 'loadPost'
    },
    methods: {
      loadPost: function() {
        let $this = this;
        let filename = $this.$route.params['filename'];
        postApi.getPost(filename).then((res) => {
          $this.post = res.data;
        });
      }
    }
  };
</script>

<style scoped>

</style>
