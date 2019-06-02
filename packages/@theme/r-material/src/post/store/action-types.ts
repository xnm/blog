export const LOAD_CATEGORIES_LIST = 'LOAD_CATEGORIES_LIST';
export const LOAD_TAGS_LIST = 'LOAD_TAGS_LIST';


interface LoadCategoriesListAction {
  type: typeof LOAD_CATEGORIES_LIST,
  payload?: []
}


interface LoadTagsListAction {
  type: typeof LOAD_TAGS_LIST,
  payload?: []
}


export type PostActionTypes = LoadCategoriesListAction | LoadTagsListAction;
