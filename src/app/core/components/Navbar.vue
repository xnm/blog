<!--suppress ALL -->
<template>
  <section>
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSideNav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">Aquariuslt Blog</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Aquariuslt Blog</h3>
        </div>
      </md-toolbar>

    </md-sidenav>
  </section>
</template>

<script>
  export default {
    name: 'navbar',
    methods: {
      toggleLeftSideNav(){
        this.$refs.leftSidenav.toggle();
      }
    }
  }
</script>
