import _ from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

VueI18n.prototype.registerModule = function (moduleLocaleMessage) {
  const $this = this;
  const localeKeys = _.keys(moduleLocaleMessage);

  if (_.isFunction($this.mergeLocaleMessage)) {
    _.each(localeKeys, (localKey) => {
      $this.mergeLocaleMessage(localKey, moduleLocaleMessage[localKey]);
    });
  }
};

Vue.use(VueI18n);

const locale = new VueI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {}
});

export default locale;
