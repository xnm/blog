<!--suppress ALL -->
<template>
  <div>
    <h2>Table of Contents</h2>
    <div>
      <div v-for="item in catalogue" :key="item">
        <span v-for="dep in (item.depth-1)">
          &nbsp;
        </span>
        <span class="catalogue-text"
              @click="scrollToHash(item)">
          {{item.text}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import smoothScroll from 'smooth-scroll';
  export default {
    name: 'PostCatalogue',
    props: [
      'catalogue'
    ],
    computed: {
      currentPath: function () {
        return this.$route.path;
      }
    },
    methods: {
      scrollToHash: function (item) {
        let hash = '#' + item.id;
        let anchor = document.querySelector(hash);
        smoothScroll.animateScroll(anchor);
      }
    }
  }
</script>

<style scoped lang="scss">
  $catalogue-color: black;

  .catalogue-text {
    color: $catalogue-color !important;
  }

  .catalogue-text:hover {
    cursor: pointer;
  }

</style>

