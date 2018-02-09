<template>
  <md-card-content>
    <md-menu md-direction="bottom-start" md-size="medium">
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>format_list_numbered</md-icon>
      </md-button>

      <md-menu-content>
        <md-list class="md-dense">
          <md-list-item
            v-for="item in catalogue"
            :key="item.id"
            @click="scrollToHash(item)"
            class="catalogue-text">
            <span v-for="dep in (item.depth-1)" v-html="space"></span>
            <span class="md-list-item-text">{{item.text}}</span>
          </md-list-item>
        </md-list>
      </md-menu-content>
    </md-menu>
  </md-card-content>
</template>

<script>
  import SmoothScroll from 'smooth-scroll';

  export default {
    name: 'post-catalogue',
    data() {
      return {
        space: '&nbsp;&nbsp;'
      };
    },
    props: {
      catalogue: Array
    },
    methods: {
      scrollToHash: function(item) {
        let hash = '#' + item.id;
        let scroll = new SmoothScroll();
        let anchor = document.querySelector(hash);
        scroll.animateScroll(anchor);
      }
    }
  };
</script>

<style scoped>
  .catalogue-text {
    line-height: 2px;
    text-underline: black;
  }

  .catalogue-text:hover {
    cursor: pointer;
  }
</style>
