import fs from 'fs';
import path from 'path';
import log from 'fancy-log';
import marked from './wrapper/marked';
import _ from 'lodash';
import highlightjs from 'highlightjs';

const MARKDOWN_EXTENSION = '.md';
const META_TOKENS = {
  type: 'code',
  lang: 'metadata'
};

// Default constants
const DEFAULT_LINK_PREFIX = '/post';
const DEFAULT_TOKENIZE_OPTIONS = {
  ignore: [META_TOKENS]
};

const DEFAULT_SUMMARY_LIMIT = 160;

const DEFAULT_RENDERER_OPTIONS = {
  highlight: true
};

class MarkiContext {
  source;
  html;

  metadata;
  tokens;

  /**
   * @param {String} sourcePath - the md file pattern
   * */
  constructor(sourcePath) {
    let $this = this;
    log.info('Reading file', sourcePath);

    $this.metadata = getMetadata(sourcePath);
    $this.source = fileToString(sourcePath);
    $this.tokens = tokenize($this.source);
    $this.html = getHtml($this.tokens);
  }
}

function fileToString(sourcePath) {
  return fs.readFileSync(sourcePath).toString();
}

/**
 * @param {String} mdString - markdown string
 * @param {Object} [options] - additional option inject
 * @return {Array} tokens
 * */
function tokenize(mdString, options) {
  let lexer = new marked.Lexer();
  let tokens = lexer.lex(mdString);

  if (!options) {
    options = DEFAULT_TOKENIZE_OPTIONS;
  }

  _.each(options.ignore, function(needIgnoreToken) {
    _.remove(tokens, needIgnoreToken);
  });
  return tokens;
}

/**
 * @param {Array} tokens - marked.Tokens
 * @return {Object} metadata token
 * */
function getMetadataToken(tokens) {
  let metadataToken = _.find(tokens, META_TOKENS);

  if (_.isUndefined(metadataToken)) {
    log.error('Cloud not found metadata tokens');
  }
  return metadataToken;
}

/**
 * @param {String} sourcePath - markdown source path
 * @return {Object} metadata - post metadata including url, tag, created, updated
 * */
function getMetadata(sourcePath) {
  let filename = path.basename(sourcePath, MARKDOWN_EXTENSION);
  let mdString = fileToString(sourcePath);
  let lexer = new marked.Lexer();
  let tokens = lexer.lex(mdString);
  let metadataToken = getMetadataToken(tokens);

  let metadata = JSON.parse(metadataToken.text);
  let link = generateLinkSuffix(metadata, filename);
  let summary = getSummary(tokens);
  let catalogue = getCatalogue(tokens);

  metadata.filename = filename;
  metadata.link = link;
  metadata.summary = summary;
  metadata.catalogue = catalogue;

  return metadata;
}

/**
 * link prefix suppose to be like /:api/:api-version/:posts-prefix
 * link suffix suppose to be /:year/:month/:date/:filename
 *
 * @param {Object} metadata
 * @param {String} filename
 * @param {Object} [option]
 * @return {String} generated-link
 * */
function generateLinkSuffix(metadata, filename, option) {
  let linkPrefix = DEFAULT_LINK_PREFIX;
  if (option) {
    if (!_.isUndefined(option['linkPrefix'])) {
      linkPrefix = option['linkPrefix'];
    }
  }
  let created = new Date(metadata['created']);

  let year = created.getFullYear();
  let month = ('0' + (created.getMonth() + 1)).slice(-2);
  let date = ('0' + created.getDate()).slice(-2);

  return [linkPrefix, year, month, date, filename].join('/');
}

/**
 * @param {Array} tokens - body tokens
 * @return {String} summary of tokens
 * */
function getSummary(tokens) {
  const SUMMARY_TYPE = 'paragraph';
  let summary = '';
  _.each(tokens, (token) => {
    if (_.isEqual(token.type, SUMMARY_TYPE)) {
      if (summary.length <= DEFAULT_SUMMARY_LIMIT) {
        summary = summary + token.text;
      }
    }
  });
  return summary;
}

/**
 * Get table of content by tokens
 * @param {Array} tokens
 * @return {Object} cate
 * */
function getCatalogue(tokens) {
  const TYPE_HEADING = 'heading';

  let existingIds = [];
  let catalogues = [];
  _.each(tokens, function(token) {
    if (_.isEqual(token.type, TYPE_HEADING)) {
      let catalogueToken = _.clone(token);
      // id suppose to support chinese using generator
      let preGenerateId = token.text.toLowerCase().replace(/[^\w]+/g, '_');
      let resultId = '';
      if (_.includes(existingIds, preGenerateId)) {
        resultId = preGenerateId + existingIds.length;
      }
      else {
        resultId = preGenerateId;
      }

      catalogueToken.id = resultId;
      existingIds.push(resultId);
      catalogues.push(catalogueToken);
    }
  });
  return catalogues;
}



function getHtml(tokens, options) {
  let rendererOptions = DEFAULT_RENDERER_OPTIONS;
  if (!_.isUndefined(options)) {
    rendererOptions = options;
  }

  if (rendererOptions.highlight) {
    let renderer = new marked.Renderer();
    renderer.code = function(code, language) {
      const validLang = !!(language && highlightjs.getLanguage(language));
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };
    marked.setOptions({renderer});
  }
  return marked.parser(tokens);
}

export default MarkiContext;
