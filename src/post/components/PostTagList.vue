<template>
  <md-card-content>
    <span class="md-subhead">{{$t('post.content.tags')}}</span>
    <span>:</span>
    <md-chip v-for="(tag, rowIndex) in tags" :key="rowIndex">
      <router-link :to="tagLink(tag)" tag="span">
        {{tag}}
      </router-link>
    </md-chip>
  </md-card-content>
</template>

<script>
  import _ from 'lodash';
  export default {
    name: 'post-tag-list',
    props: {
      tags: Array
    },
    methods:{
      tagLink:function(tag){
        return '/tag/'+_.lowerCase(tag);
      }
    }
  };
</script>

