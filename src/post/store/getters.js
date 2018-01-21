import _ from 'lodash';

export default {
  indexes: (state) => {
    let filter = state.filter;
    _.filter(state.indexes, function(index) {
      if (!_.isEmpty(filter)) {
        return _.isEqual(index[filter.type], filter.value);
      }
      return true;
    });
  }
};
