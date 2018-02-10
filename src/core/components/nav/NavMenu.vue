<template>
  <div>
    <md-list class="md-dense md-list-compact" v-if="menu && menu.expandable">
      <md-list-item md-expand>
        <md-icon>{{menu.icon}}</md-icon>
        <span class="md-list-item-text">{{menu.name}}</span>
        <md-list
          slot="md-expand">
          <md-list-item
            class="md-inset md-list-item-compact"
            v-for="link in menu.links"
            :key="link.name" v-if="isInternalLink(link.url)" :to="link.url">
            <span>{{link.name}}</span>
          </md-list-item>
          <md-list-item
            class="md-inset md-list-item-compact"
            v-for="link in menu.links"
            :key="link.name" v-if="!isInternalLink(link.url)" :href="link.url" target="_blank" rel="noopener">
          <span>
            <md-tooltip>{{link.desc}}</md-tooltip>
            {{link.name}}
          </span>
          </md-list-item>
        </md-list>
      </md-list-item>
    </md-list>
    <md-list class="md-dense md-list-compact" v-if="menu && !menu.expandable">
      <md-list-item
        class="md-list-item-compact"
        v-if="isInternalLink(menu.link)" :to="menu.link">
        <md-icon>{{menu.icon}}</md-icon>
        <span class="md-list-item-text">{{menu.name}}</span>
      </md-list-item>
      <md-list-item
        class="md-list-item-compact"
        v-if="!isInternalLink(menu.link)" :href="menu.link" target="_blank">
        <md-icon>{{menu.icon}}</md-icon>
        <span class="md-list-item-text">{{menu.name}}</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {
    name: 'nav-menu',
    props: {
      menu: Object
    },
    methods: {
      isInternalLink: function(link) {
        return -1 === link.indexOf('http');
      }
    }
  };
</script>


<style scoped>
  .md-list-compact,
  .md-list-expand > ul {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
