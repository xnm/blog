/* Created by Aquariuslt on 4/27/17.*/
import fs from 'fs';
import _ from 'lodash';
import marked from 'marked';
import moment from 'moment';
import highlightjs from 'highlightjs';

import pathUtil from './path-util';
import logger from './logger';

const META_TOKENS = {
  type: 'code',
  lang: 'metadata'
};
const LINK_DATE_FORMAT = 'YYYY/MM/DD';
const POSTS_PREFIX = '/post';

function fileToString(sourcePath) {
  return fs.readFileSync(sourcePath).toString();
}

function generateLink(metadata, fileName) {
  let created = moment(new Date(metadata['created'])).format(LINK_DATE_FORMAT);
  return [POSTS_PREFIX, created, fileName].join('/');
}

function getMetadata(mdString, fileName) {
  let lexer = new marked.Lexer();
  let tokens = lexer.lex(mdString);
  let metadataToken = _.find(tokens, META_TOKENS);

  if (_.isUndefined(metadataToken)) {
    logger.error('Could not found metadata, please check have metadata correct in .md files.');
    return;
  }

  let metadata = JSON.parse(metadataToken.text);
  let link = generateLink(metadata, fileName);

  metadata.filename = fileName;
  metadata.link = link;

  return metadata;
}

function getBodyTokens(mdString) {
  let lexer = new marked.Lexer();
  let tokens = lexer.lex(mdString);
  _.remove(tokens, META_TOKENS);
  return tokens;
}

function getCatalogue(bodyTokens) {
  const TYPE_HEADING = 'heading';

  let catalogueTokens = [];
  _.each(bodyTokens, (token) => {
    if (_.isEqual(token.type, TYPE_HEADING)) {
      let catalogueToken = _.clone(token);
      catalogueToken.id = token.text.toLowerCase().replace(/[^\w]+/g, '-');
      catalogueTokens.push(catalogueToken);
    }
  });
  return catalogueTokens;
}

function getSummary(bodyTokens) {
  const SUMMARY_LIMIT = 120;
  const SUMMARY_TYPE = 'paragraph';

  let summary = '';
  _.each(bodyTokens, (token) => {
    if (_.isEqual(token.type, SUMMARY_TYPE)) {
      if (summary.length <= SUMMARY_LIMIT) {
        summary = summary + token.text;
      }
    }
  });

  return summary;
}


function getHtml(bodyTokens, options) {
  if (options.highlight) {
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
      const validLang = !!(language && highlightjs.getLanguage(language));
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };
    marked.setOptions({renderer});
  }
  return marked.parser(bodyTokens);
}

/* Export functions */
function readMarkdownTokens(sourcePath) {
  let mdString = fileToString(sourcePath);
  let fileName = pathUtil.getFilePrefix(sourcePath);
  let metadata = getMetadata(mdString, fileName);
  let bodyTokens = getBodyTokens(mdString);

  return {
    metadata,
    bodyTokens
  }
}

function readBodyTokens(bodyTokens, options) {
  let catalogue = getCatalogue(bodyTokens);
  let summary = getSummary(bodyTokens);
  let pureHtml = getHtml(bodyTokens, options);

  return {
    catalogue: catalogue,
    summary: summary,
    html: pureHtml
  }
}


export default {
  readMarkdownTokens,
  readBodyTokens
}
