<template>
  <section>
    <navigation></navigation>
    <router-view></router-view>
  </section>
</template>


<script>
  import _ from 'lodash';

  import {Navigation} from './components/core';
  import {routes} from './routes';
  import * as types from './stores/core/mutation-types';

  export default {
    components: {
      Navigation
    },
    mounted: function () {
      initNavMenus(this.$store, routes);
    }
  };


  function initNavMenus(store, routes) {
    _.each(routes, function (route) {
      if (!_.isUndefined(route.meta) && _.isEqual(route.meta.showInNavMenu, true)) {
        store.commit(types.REGISTER_NAV_MENUS, route);
      }
    });
  }
</script>


<style>

</style>
