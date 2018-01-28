<template>
  <md-app>
    <md-app-toolbar class="md-primary" md-mode="flexible">
      <div class="md-toolbar-row">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon v-if="!menuVisible">menu</md-icon>
          <md-icon v-else="menuVisible">clear_all</md-icon>
        </md-button>
        <span class="md-title">{{title}}</span>
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <profile
        :author="author"
        :avator="avator"
        :description="description">
      </profile>

      <nav-menu
        v-for="menu in menus"
        :key="menu.name"
        :menu="menu">
      </nav-menu>

      <span></span>
    </md-app-drawer>

    <md-app-content>
      <slot></slot>
    </md-app-content>
  </md-app>
</template>

<script>
  import Profile from '@/core/components/nav/Profile';
  import NavMenu from '@/core/components/nav/NavMenu';

  export default {
    components: {
      Profile,
      NavMenu
    },
    name: 'navigation',
    props: {
      title: String,
      description: String,
      author: String,
      avator: String,
      menus: Array
    },
    data: () => ({
      menuVisible: false
    })
  };
</script>

<style scoped>
  .md-app {
    min-height: 100vh;
  }

  .md-app-content {
    padding: 2px;
  }
</style>
