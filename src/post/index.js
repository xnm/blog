import store from '@/store';
import postStore from './store';
import * as types from './store/mutation-types';

store.registerModule('post', postStore);

store.dispatch(types.LOAD_POSTS_INDEXES);
