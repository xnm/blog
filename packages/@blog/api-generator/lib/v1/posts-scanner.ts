import * as glob from 'glob';

/**
 * @desc scan folder and get all md files as string
 * @param folder: posts folder prefix
 * @return posts markdown file absolute path list
 */
function scan(folder: string): string[] {
  const MD_RULES = "/**/*.md";
  return glob.sync(folder + MD_RULES);
}


export default {
  scan
};
