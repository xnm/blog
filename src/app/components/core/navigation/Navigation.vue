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
      <md-toolbar class="md-large">
        <md-layout md-column md-flex="30">
          <md-avatar class="md-avatar-icon md-large">
            <img :src="avator" alt="Avatar">
          </md-avatar>
        </md-layout>
      </md-toolbar>
      <md-list>
        <md-list-item v-for="navMenu in navMenus" v-bind:key="navMenu">
          <router-link :to="navMenu.path">
            <md-icon>{{navMenu.meta.icon}}</md-icon>
            <span>{{navMenu.name}}</span>
          </router-link>
        </md-list-item>

        <md-list-item v-for="externalLinkCategory in externalLinks" v-bind:key="externalLinkCategory">
          <md-icon>links</md-icon>
          <span>{{externalLinkCategory.label}}</span>
          <md-list-expand>
            <md-list>
              <md-list-item v-for="externalLink in externalLinkCategory.links"
                            v-bind:key="externalLink"
                            class="md-inset">
                <a :href="externalLink.url" class="external-link" target="_blank">
                  {{externalLink.displayName}}
                </a>
                <md-tooltip md-direction="bottom">{{externalLink.description}}</md-tooltip>
              </md-list-item>
            </md-list>
          </md-list-expand>
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
        return this.$store.getters.title;
      },
      avator: function (){
        return this.$store.getters.avator;
      },
      navMenus: function () {
        return this.$store.state.core.navMenus;
      },
      externalLinks: function () {
        return this.$store.getters.externalLinks;
      }
    }
  }
</script>

<style lang="scss">
  .title {
    text-decoration: none !important;
    color: #FFFFFF !important;
  }

  .external-link {
    text-decoration: none !important;
    color: #000000 !important;
  }
</style>
