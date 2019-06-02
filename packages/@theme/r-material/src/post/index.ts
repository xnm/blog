import { registerRoutes } from '../router';
import { registerReducer } from '../reducers';
import { store } from '../App';
import routes from './routes';
import postReducer from '@theme/r-material/src/post/store/reducer';


registerRoutes(routes);
registerReducer('post', postReducer);

// perform a action to register categories menus and tag menus
// store.dispatch();
// store.dispatch();
