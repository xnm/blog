<template>
  <div>
    <navigation
      :title="title"
      :description="description"
      :author="author"
      :avator="avator"
      :menus="menus">
      <transition name="slide">
        <router-view></router-view>
      </transition>
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
