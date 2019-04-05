import * as _ from 'lodash';

function detectImages(md) {


  md.core.ruler.push('detect_images', (state) => {
    const tokens = state.tokens;
    const images: string[] = [];


    tokens.map((token) => {
      if (token.type === 'inline') {
        if (token.children && _.isArray(token.children)) {
          token.children.map((childToken) => {
            if (childToken.type === 'image') {
              childToken.attrs.map((imageAttr) => {
                if (_.isArray(imageAttr) && imageAttr.length > 1 && imageAttr[0] === 'src') {
                  const imageUrl = imageAttr[1];
                  images.push(imageUrl);
                }
              });
            }
          });
        }
      }
    });

    if (state.env) {
      state.env.images = images;
    }
  });

}


export default detectImages;
