<template>
  <div class="md-alignment-center-center">
    <post-preview-card
      v-for="index in indexes"
      :key="index.filename"
      :index="index">
    </post-preview-card>
  </div>
</template>

<script>
  import PostPreviewCard from '@/post/components/PostPreviewCard';
  import {mapGetters} from 'vuex';

  export default {
    components: {PostPreviewCard},
    name: 'post-list-layout',
    computed: mapGetters([
      'indexes'
    ])
  };
</script>
