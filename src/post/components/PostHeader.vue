<template>
  <section>
    <md-card-header>
      <div class="md-display-1">{{metadata.title}}</div>
      <div class="md-subhead">{{metadata.created}}</div>
    </md-card-header>
  </section>
</template>

<script>
  export default {
    name: 'post-header',
    props: {
      metadata: Object
    }
  };
</script>
