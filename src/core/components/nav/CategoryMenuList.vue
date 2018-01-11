<template>
  <div>
    <md-list class="md-dense md-list-compact">
      <md-list-item md-expand>
        <md-icon>equalizer</md-icon>
        <span class="md-list-item-text">{{$t('core.nav.categories')}}</span>
        <md-list slot="md-expand">
          <md-list-item
            class="md-inset"
            v-for="category in categories" :key="category.name">
            {{category.name}}
          </md-list-item>
        </md-list>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {
    name: 'category-menu-list',
    props: {
      categories: Array
    }
  };
</script>

<style scoped>

</style>
