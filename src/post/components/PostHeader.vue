<template>
  <section>
    <md-card-header>
      <div class="md-headline">{{metadata.title}}</div>
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
