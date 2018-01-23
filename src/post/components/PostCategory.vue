<template>
  <md-card-content>
    <span class="md-subhead">{{$t('post.content.category')}}</span>
    <span>:</span>
    <router-link :to="categoryLink">{{category}}</router-link>
  </md-card-content>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'post-category',
    props: {
      category: String
    },
    computed: {
      categoryLink: function() {
        let $this = this;
        return '/category/' + _.lowerCase($this.category);
      }
    }
  };
</script>
