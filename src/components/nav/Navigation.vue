<template>
  <div>
    <md-app>
      <md-app-toolbar class="md-primary" md-mode="flexible">
        <div class="md-toolbar-row">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Aquariuslt Blog</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
      </md-app-drawer>

      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    data: () => ({
      menuVisible: false
    })
  };
</script>

<style scoped>

</style>
