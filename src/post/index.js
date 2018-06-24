import store from '@/store';
import postStore from './store';
import * as types from './store/mutation-types';

import router from '@/router';
import postRoutes from './routes';

store.registerModule('post', postStore);
router.addRoutes(postRoutes);

store.dispatch(types.LOAD_POSTS_INDEXES).then();

