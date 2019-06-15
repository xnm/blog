import * as React from 'react';
import {PostStore} from '../../stores/post.store';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {inject, observer} from 'mobx-react';
import {useEffect} from 'react';
import {StyleRules} from '@material-ui/core/styles';


import PostCard from '../../components/PostCard';
import Grid from '@material-ui/core/Grid';

type PostsProps = {} & {
  postStore: PostStore;
}

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
      }
    })
);

const Posts: React.ComponentType<PostsProps> = inject('postStore')(
  observer(
    (props: PostsProps): JSX.Element => {
      const classes = useStyles();

      useEffect((): void => {
        props.postStore.loadPosts();
      }, []);

      return (
        <div className={classes.root}>
          <Grid
            container
            spacing={1}
            className={classes.gridList}
          >
            {props.postStore.posts.map(
              (post: BlogModel.Post): JSX.Element => (
                <PostCard key={post.filename} {...post} />
              )
            )}
          </Grid>
        </div>
      );
    }
  )
);

export default Posts;
