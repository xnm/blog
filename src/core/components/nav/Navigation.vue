<template>
  <md-app>
    <md-app-toolbar class="md-primary" md-mode="flexible">
      <div class="md-toolbar-row">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
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
      <nav-menu>

      </nav-menu>
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
      NavMenu,
      Profile},
    name: 'navigation',
    props: {
      title: String,
      description: String,
      author: String,
      avator: String
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
</style>
