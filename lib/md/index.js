import MarkiContext from './MarkiContext';
import MultiMarkiContext from './MultiMarkiContext';

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
