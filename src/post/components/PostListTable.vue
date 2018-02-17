<template>
  <md-table v-model="indexes"
            md-sort="created"
            md-sort-order="asc"
            md-card
            class="md-layout-item md-large-size-66 md-small-size-100 post-list-table">
    <md-table-toolbar>
      <h1 class="md-title">{{$t('post.nav.'+ meta.key)}} : {{ meta.value}}</h1>
    </md-table-toolbar>

    <md-table-row
      slot="md-table-row"
      slot-scope="{item}"
      class="post-list-table-item"
      @click.native="toPostDetail(item)">
      <md-table-cell :md-label="$t('post.nav.date')">{{ item.created }}</md-table-cell>
      <md-table-cell :md-label="$t('post.nav.title')">{{ item.title }}</md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
  export default {
    name: 'post-list-table',
    props: {
      indexes: Array,
      meta: Object
    },
    methods: {
      toPostDetail: function(index) {
        let $this = this;
        let link = index.link;
        $this.$router.push({
          path: link
        });
      }
    }
  };
</script>

<style scoped>
  .post-list-table {
    max-width: 1084px;
  }
</style>
