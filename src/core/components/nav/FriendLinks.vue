<template>
  <div>
    <md-list class="md-dense md-list-compact">
      <md-list-item md-expand>
        <md-icon>link</md-icon>
        <span class="md-list-item-text">{{$t('core.nav.links')}}</span>
        <md-list slot="md-expand">
          <md-list-item
            class="md-inset"
            v-for="link in links" :key="link.name">
            {{link.name}}
          </md-list-item>
        </md-list>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {
    name: 'friend-links',
    props: {
      links: Object
    }
  };
</script>

<style scoped>
  .md-list-compact {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
