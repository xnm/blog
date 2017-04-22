<!--suppress ALL -->
<template>
  <section>
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSideNav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">
        <router-link class="title" to="/home">{{title}}</router-link>
      </h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">{{title}}</h3>
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item v-for="navMenu in navMenus" v-bind:key="navMenu">
          <router-link :to="navMenu.path">
            <md-icon>{{navMenu.meta.icon}}</md-icon>
            <span>{{navMenu.name}}</span>
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </section>
</template>

<script>
  export default {
    name: 'Navigation',
    methods: {
      toggleLeftSideNav(){
        this.$refs.leftSidenav.toggle();
      }
    },
    computed: {
      title: function () {
        return this.$store.state.core.appName;
      },
      navMenus: function () {
        return this.$store.state.core.navMenus;
      }
    }
  }
</script>

<style lang="scss">
  .title {
    text-decoration: none !important;
    color: #FFFFFF !important;
  }
</style>
