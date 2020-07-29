import * as React from 'react';
import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface EditorWrapperProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '50em',
      margin: '20px auto',
      padding: 20,
      backgroundColor: '#585c63',
    },

    header: {},

    content: {},
  })
);

export const EditorWrapper: React.FC<EditorWrapperProps> = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div>Editor Wrapper</div>
    </Container>
  );
};
