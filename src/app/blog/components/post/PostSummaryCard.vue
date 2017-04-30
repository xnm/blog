<template>
  <section>
    <md-card md-with-hover class="post-summary-card">
      <md-card-header>
        <router-link :to="data.link" tag="div" class="md-title">
          {{data.title}}
        </router-link>
        <div class="md-subhead">{{data.created}}</div>
      </md-card-header>

      <md-card-content>
        {{data.summary}}
      </md-card-content>

      <md-layout md-flex>

      </md-layout>

      <md-card-actions>
        <post-tags :tags="data.tags"></post-tags>
        <md-button>
          <router-link :to="data.link" tag="span">More</router-link>
        </md-button>
      </md-card-actions>
    </md-card>
  </section>
</template>

<script>
  import PostTags from './PostTagList';
  export default {

    components: {PostTags},
    name: 'PostSummaryCard',
    props: [
      'data'
    ]
  };
</script>

<style lang="scss" scoped>
  .post-summary-card {
    width: 100%;
    height: 100%;
  }

  $tag-chip-padding: 5px;
  .post-tags {
    padding: $tag-chip-padding;
  }
</style>
