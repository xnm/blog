import * as yaml from 'js-yaml';


const METADATA_RE = new RegExp('```metadata([\\s\\S]*)```');

function parse(meta: string): string {
  return yaml.load(meta);
}


function detectMetadata(md) {
  md.block.ruler.before(
    'fence',
    'metadata',
    (state, startLine, endLine) => {
      const startPos = state.bMarks[startLine] + state.tShift[startLine];
      const maxPos = state.eMarks[endLine];
      const measureBlock = state.src.slice(startPos, maxPos);

      const matches = METADATA_RE.exec(measureBlock);

      if (!matches) {
        return false;
      }

      state.src = state.src.replace(METADATA_RE, '');

      if (state.env) {
        const matchContent = matches[1];
        state.env.metadata = parse(matchContent);
      }

      return true;
    }
  );
}


export default detectMetadata;
