import * as path from 'path';

function resolve(dir: string): string {
  return path.join(__dirname, '../..', dir);
}

export default {
  resolve
};
