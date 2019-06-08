import { registerRoutes } from '../router';
import { registerReducer } from '../reducers';
import store from '../store';
import routes from './routes';
import postReducer from '../post/store/reducer';
import { loadTags } from './store/actions';

registerRoutes(routes);
registerReducer('post', postReducer);

// perform a action to register categories menus and tag menus

// store.dispatch(loadTags());

// store.dispatch();
