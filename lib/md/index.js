import MarkiContext from './context';
import MultiMarkiContext from './multi-context';

function analyseSingle(pattern) {
  return new MarkiContext(pattern);
}

function analyseMulti(pattern) {
  return new MultiMarkiContext(pattern);
}

let marki = {};
marki.analyseSingle = analyseSingle;
marki.analyseMulti = analyseMulti;

export default marki;
