import store from '@/store';
import coreStore from './store';
import * as types from '@/core/store/mutation-types';

store.registerModule('core', coreStore);

store.dispatch(types.LOAD_APP_CONFIG);
