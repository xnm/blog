import * as _ from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

class VueI18nModule extends VueI18n {
  registerModule(moduleLocaleMessage) {
    const $this = this;
    const localeKeys = _.keys(moduleLocaleMessage);

    if (_.isFunction($this.mergeLocaleMessage)) {
      _.each(localeKeys, (localKey) => {
        $this.mergeLocaleMessage(localKey, moduleLocaleMessage[localKey]);
      });
    }
  }
}


Vue.use(VueI18nModule);

const locale = new VueI18nModule({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {}
});

export default locale;
