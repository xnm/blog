<template>
  <div>
    <md-list class="md-dense">
      <md-list-item md-expand>
        <md-icon>whatshot</md-icon>
        <span class="md-list-item-text">News</span>

        <md-list slot="md-expand">
          <md-list-item class="md-inset">World</md-list-item>
          <md-list-item class="md-inset">Europe</md-list-item>
          <md-list-item class="md-inset">South America</md-list-item>
        </md-list>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {
    name: 'nav-menu',
    data() {

    }
  };
</script>

<style scoped>

</style>
