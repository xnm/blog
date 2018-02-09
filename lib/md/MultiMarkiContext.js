import _ from 'lodash';

import fileUtil from './utils/file-util';
import MarkiContext from './MarkiContext';

class MultiMarkiContext {
  indexes;
  contexts;

  /**
   * @param {String} pattern - unix style glob pattern
   * */
  constructor(pattern) {
    let $this = this;
    let postDataPathList = fileUtil.getFilePathList(pattern);

    $this.indexes = [];
    $this.contexts = [];

    _.each(postDataPathList, function(postDataPath) {
      let context = new MarkiContext(postDataPath);
      $this.contexts.push(context);
      $this.indexes.push(context.metadata);
    });

    $this.indexes = _.reverse(_.sortBy($this.indexes, 'created'));
  }
}

export default MultiMarkiContext;
