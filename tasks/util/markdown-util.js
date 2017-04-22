/* Created by Aquariuslt on 2017-03-04.*/
import * as fs from 'fs';
import marked from 'marked';
import _ from 'lodash';
import moment from 'moment';
import logger from './logger';
import * as pathUtil from './path-util';

const PARSE_DATE_FORMAT = 'YYYY-MM-DD';
const PATH_DATE_FORMAT = 'YYYY/MM/DD';
const SUMMARY_LENGTH = 80;

function readMarkdownSource(sourceUrl) {
  return fs.readFileSync(sourceUrl).toString();
}

function parseMarkdown(sourceUrl) {
  let mdString = readMarkdownSource(sourceUrl);
  let fileNamePrefix = parseFileNamePrefix(sourceUrl);
  let metadata = parseMarkdownMetaData(mdString, fileNamePrefix);
  let mdTokens = parseMarkdownTokens(mdString);
  return constructMarkdown(metadata, mdTokens);
}

function parseMarkdownMetaData(markdownString, fileNamePrefix) {
  let mdString = _.clone(markdownString);
  let lexer = new marked.Lexer();
  let tokens = lexer.lex(mdString);
  let metadataToken = _.find(tokens, {
    type: 'code',
    lang: 'metadata'
  });
  if (_.isUndefined(metadataToken)) {
    logger.error('Could not found metadata, please check have metadata correct in .md files.');
    return;
  }

  let metadata = JSON.parse(metadataToken.text);

  let parsedMetadata = _.clone(metadata);


  let baseDate = null;
  if (!_.isUndefined(metadata.created)) {
    baseDate = moment(new Date(metadata.created));

    parsedMetadata.created = baseDate.format(PARSE_DATE_FORMAT);
    if (metadata.updated) {
      let updated = moment(new Date(metadata.updated));
      parsedMetadata.updated = updated.format(PARSE_DATE_FORMAT);
    } else {
      parsedMetadata.updated = baseDate.format(PARSE_DATE_FORMAT);
    }
  } else {
    baseDate = moment(new Date(metadata.date));
    parsedMetadata.created = baseDate.format(PARSE_DATE_FORMAT);
    parsedMetadata.updated = baseDate.format(PARSE_DATE_FORMAT);
  }

  let linkPrefix = baseDate.format(PATH_DATE_FORMAT);
  parsedMetadata.link = linkPrefix + '/' + fileNamePrefix;
  if (!_.isUndefined(metadata.category)) {
    parsedMetadata.category = metadata.category;
  }

  return parsedMetadata;
}

function parseFileNamePrefix(sourceUrl) {
  return pathUtil.getFilePrefix(sourceUrl);
}

function parseMarkdownTokens(markdownString) {
  let mdString = _.clone(markdownString);
  const ignoreLanguageList = [
    {
      type: 'code',
      lang: 'metadata'
    }
  ];

  let lexer = new marked.Lexer();
  let tokens = lexer.lex(mdString);

  let filteredTokens = [];
  _.each(tokens, function (token) {
    let filterFlag = false;
    _.each(ignoreLanguageList, function (ignoreLanguage) {
      if (_.isEqual(ignoreLanguage.type, token.type)) {
        if (!_.isUndefined(token.lang) && _.isEqual(token.lang, ignoreLanguage.lang)) {
          filterFlag = true;
        }
      }
    });
    if (!filterFlag) {
      filteredTokens.push(token);
    }
  });


  return filteredTokens;
}

function getSummary(markdownTokens) {
  let tokens = markdownTokens;

  let firstSummaryToken = undefined;

  for (let token of tokens) {
    if (_.isEqual('paragraph', token.type)) {
      firstSummaryToken = token;
      break;
    }
  }

  if (!_.isUndefined(firstSummaryToken)) {
    firstSummaryToken = firstSummaryToken.text.substring(0, 80);
  }

  return firstSummaryToken;
}


function constructMarkdown(metadata, mdTokens) {
  return {
    title: metadata.title,
    link: metadata.link,
    created: metadata.created,
    updated: metadata.updated,
    tags: metadata.tags,
    category: metadata.category,
    summary: getSummary(mdTokens),
    metadata: metadata,
    tokens: mdTokens
  };
}


export {
  parseMarkdown
};
