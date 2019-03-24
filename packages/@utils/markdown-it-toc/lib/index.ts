import * as uslug from 'uslug';


/**
 * @desc get level info from html tag <h1><h2><h3>
 * @return {Number} level of toc
 * */
function measureLevel(tag: String) {
  return parseInt(tag.slice(1));
}


function generateTOC(md) {

  let shadowState;


  md.core.ruler.push('shadow_state', function (state) {
    shadowState = state;
  });

  md.core.ruler.after('shadow_state', 'generate_toc', function (state) {
    let shadowTokens = shadowState.tokens;

    let headingItems: Array<any> = [];
    let headingPosition = 0;
    shadowTokens.map((token, index) => {
      if (token.type === 'heading_close') {
        let headingContent = shadowTokens[index - 1].content;
        let headingLevel = measureLevel(token.tag);
        let headingId = uslug(headingContent);

        headingItems.push({
          level: headingLevel,
          id: headingId,
          position: headingPosition++
        });
      }
    });

    if (state.env) {
      state.env.toc = headingItems;
    }

  });
}

export default generateTOC;
