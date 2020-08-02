import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor, Node } from 'slate';
import Typography from '@material-ui/core/Typography';

export interface EditorWrapperProps {}

const INIT_EDITOR_VALUE: Node[] = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'The editor gives you full control over the logic you can add. For example, it\'s fairly common to want to add markdown-like shortcuts to editors. So that, when you start a line with "> " you get a blockquote that looks like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Order when you start a line with "## " you get a level-two heading, like this:',
      },
    ],
  },
  {
    type: 'heading-two',
    children: [{ text: 'Try it out!' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Try it out for yourself! Try starting a new line with ">", "-", or "#"s.',
      },
    ],
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '50em',
      marginTop: `64px`,
      minHeight: `calc(100vh - 64px)`,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 20,
    },
    header: {},
    content: {},
  })
);

export const EditorWrapper: React.FC<EditorWrapperProps> = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Title of Article
      </Typography>
      <div className={classes.content}>
        <EditorContent />
      </div>
    </Container>
  );
};

export const EditorContent: React.FC = (props) => {
  const [value, setValue] = useState(INIT_EDITOR_VALUE);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable renderElement={renderElement} placeholder="Write some markdown..." autoFocus />
    </Slate>
  );
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>;
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>;
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
