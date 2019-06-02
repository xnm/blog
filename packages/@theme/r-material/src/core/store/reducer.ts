import { CoreActionTypes, REGISTER_NAV_MENUS } from './action-types';

export interface NavMenu {
  name: string;
  link: string;
  icon?: string;
  priority?: number;
  description?: string;
  child?: NavMenuItem[];
}

export interface NavMenuItem {
  name: string;
  link: string;
  icon?: string;
}

interface CoreState {
  menus: NavMenu[]
}

const initialState: CoreState = {
  menus: []
};


export default function coreReducer(state = initialState, action: CoreActionTypes): CoreState {
  switch (action.type) {
    case REGISTER_NAV_MENUS: {
      return state;
    }
    default: {
      return state;
    }
  }
}
