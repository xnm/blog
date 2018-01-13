<template>
  <div>
    <navigation
      :title="title"
      :description="description"
      :author="author"
      :avator="avator"
      :menus="menus">
      <router-view></router-view>
    </navigation>
  </div>
</template>

<script>
  import Navigation from '@/core/components/nav/Navigation';

  import {mapGetters} from 'vuex';

  export default {
    components: {Navigation},
    name: 'app',
    computed: mapGetters([
      'title',
      'description',
      'author',
      'avator',
      'menus'
    ])
  };
</script>
