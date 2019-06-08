import store from '../store';
import routes from './routes';

import categoryStore from './stores/category.store';
import tagStore from './stores/tag.store';
import { registerRoutes } from '../router';

registerRoutes(routes);

store.registerStore('categoryStore', categoryStore);
store.registerStore('tagStore', tagStore);

categoryStore.loadCategories();
tagStore.loadTags();
