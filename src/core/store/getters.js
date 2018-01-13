export default {
  title: (state) => {
    return state.config.title;
  },
  description: (state) => {
    return state.config.description;
  },
  author: (state) => {
    return state.config.author;
  },
  avator: (state) => {
    return state.config.avator;
  },
  menus: (state) => {
    return state.menus;
  }
};
