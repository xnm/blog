import coreReducer from './store/reducer';
import { registerReducer } from '../reducers';



registerReducer('core', coreReducer);
