import * as uslug from 'uslug';

/**
 * @desc get level info from html tag <h1><h2><h3>
 * @return {Number} level of toc
 * */
function measureLevel(tag: String) {
  return parseInt(tag.slice(1));
}


/**
 * @desc set pid for headingItems
 * @param headingItems: origin heading data
 * */
function collapseHeading(headingItems: Array<any>): Array<any> {
  const ROOT_PID = -1;

  // 1. fill pid
  headingItems.map((headingItem, index) => {
    if (headingItem.level == 1) {
      headingItem.pid = ROOT_PID;
    } else if (index != 0 && headingItem.level < headingItems[index - 1].level) {
      for (let i = index - 1; i > 0; i--) {
        if (headingItem.level === headingItems[i].level) {
          headingItem.pid = headingItems[i].pid;
          break;
        }
      }
    } else if (index != 0 && headingItem.level > headingItems[index - 1].level) {
      headingItem.pid = headingItems[index - 1].position;
    } else if (index != 0 && headingItem.level === headingItem[index - 1].level) {
      headingItem.pid = headingItems[index - 1].pid;
    }
  });

  // 2. fill children
  let newHeadingItems: Array<any> = [];
  headingItems.map((headingItem) => {
    if (headingItem.pid === ROOT_PID) {
      newHeadingItems.push(headingItem);
    } else {
      if (!headingItems[headingItem.pid].children) {
        headingItems[headingItem.pid].children = [];
      }
      headingItems[headingItem.pid].children.push(headingItem);
    }
  });

  return newHeadingItems;
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

    headingItems = collapseHeading(headingItems);


    if (state.env) {
      state.env.toc = headingItems;
    }

  });
}

export default generateTOC;
