const DEFAULT_SUMMARY_LENGTH = 100;

function detectSummary(md, options?) {
  md.core.ruler.push('detect_summary', function (state) {
    let summary = '';
    let summaryLength = DEFAULT_SUMMARY_LENGTH;

    if (options && options.len) {
      summaryLength = options.len;
    }

    let tokens = state.tokens;


    tokens.forEach((token, index) => {
      if (index > 0 && token.type === 'inline'
        && tokens[index - 1].type === 'paragraph_open') {
        if (summary.length < summaryLength) {
          summary += token.content.substr(0, summaryLength - summary.length);
        }
      }
    });

    if (state.env) {
      state.env.summary = summary;
    }
  });
}

export default detectSummary;
