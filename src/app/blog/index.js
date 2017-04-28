/* Created by Aquariuslt on 4/28/17.*/

import router from '../../router';
import blogRoutes from './routes/blog.routes';

import store from '../../store';
import blogStore from './stores/blog.store';

import * as types from '../core/stores/mutation-types';

store.registerModule('blog', blogStore);
router.addRoutes(blogRoutes);


store.dispatch(types.REGISTER_NAV_MENUS, blogRoutes);
