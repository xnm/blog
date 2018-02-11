import marked from 'marked';
import _ from 'lodash';

/**
 * Update body tokens to customize id generator
 * */
function updateHeadingTokens(tokens) {
  const TYPE_HEADING = 'heading';

  let existingIds = [];
  _.each(tokens, function(token) {
    if (_.isEqual(token.type, TYPE_HEADING)) {
      let preGenerateId = token.text.toLowerCase().replace(/[^\w]+/g, '-');
      let resultId = '';
      if (_.includes(existingIds, preGenerateId)) {
        resultId = preGenerateId + existingIds.length;
      }
      else {
        resultId = preGenerateId;
      }
      token.id = resultId;
      existingIds.push(resultId);
    }
  });
  return tokens;
}


// override Parser.parse
marked.Parser.prototype.parse = function(src) {
  this.inline = new marked.InlineLexer(src.links, this.options, this.renderer);
  src = updateHeadingTokens(src);
  this.tokens = src.reverse();

  let out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};


// override Parser.tok for heading handling
marked.Parser.prototype.tok = function() {
  let body;
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text,
        this.token.id
      );
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      let header = ''
      ;body = '';
      let i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = {header: true, align: this.token.align[i]};
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          {header: true, align: this.token.align[i]}
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            {header: false, align: this.token.align[j]}
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      let ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      const html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};


// Update default heading
marked.Renderer.prototype.heading = function(text, level, raw, id) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + id
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

export default marked;
