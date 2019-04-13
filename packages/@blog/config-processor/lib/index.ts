import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as Ajv from 'ajv';

import * as schema from '../../../@types/schemas/types/blog/json/blog-config.schema.json';

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true
});
const validate = ajv.compile(schema);


/**
 * @desc read a yml file and parse to valid config object
 * @param filepath: absolute file path
 */
function read(filepath: string): Config.Bundle {
  let config = yaml.load(fs.readFileSync(filepath).toString());
  const valid = validate(config);

  if (!valid) {
    throw Error(ajv.errorsText(validate.errors));
  }

  return config;
}


export default {
  read
};
