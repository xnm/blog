/* Created by Aquariuslt on 5/13/17.*/
import Vue from 'vue';


Vue.material.registerTheme('about', {
  primary: {
    color: 'indigo',
    hue: 'A200'
  },
  accent: {
    color: 'grey',
    hue: 300
  }
});

Vue.material.setCurrentTheme('about');
