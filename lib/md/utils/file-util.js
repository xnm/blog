import _ from 'lodash';
import glob from 'glob';

const GLOB_OPTIONS = {
  nodir: true,
  nonull: true
};

function getFilePathList(pattern) {
  return glob.sync(pattern, GLOB_OPTIONS);
}

export default {
  getFilePathList
};
