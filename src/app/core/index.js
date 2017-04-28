/* Created by Aquariuslt on 4/28/17.*/
import coreStore from './stores/core.store';
import store from '../../store';

import coreRoutes from './routes/core.routes';
import router from '../../router';
import * as types from './stores/mutation-types';

store.registerModule('core', coreStore);
router.addRoutes(coreRoutes);


store.dispatch(types.LOAD_APPLICATION_PROPERTIES);
