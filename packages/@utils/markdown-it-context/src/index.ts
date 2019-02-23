import * as _ from 'lodash';


function createContextRule(md) {
  md.core.ruler.push(
    'create-context',
    (state) => {
      let createContext = md.options.createContext || _.noop;
      state.tokens.context = createContext() || {};
      return false;
    }
  )
}

export default createContextRule;


