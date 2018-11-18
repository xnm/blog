const pkg = require('./package.json');

module.exports = {
  babelrcRoots: 'packages/@blog/*',
  ...pkg.babel
};
