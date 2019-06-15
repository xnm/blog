import * as React from 'react';
import {createStyles, makeStyles} from '@material-ui/core';
import {inject, observer} from 'mobx-react';
import {useEffect} from 'react';
import {StyleRules} from '@material-ui/core/styles';


import {PostStore} from '../../stores/post.store';
import PostCard from '../../components/PostCard';
import Grid from '@material-ui/core/Grid';

interface PostsProps {
  postStore: PostStore;
}

const useStyles = makeStyles(
  (): StyleRules =>
    createStyles({
      root: {},
      gridList: {
        width: '100%',
        height: '100%',
        flexGrow: 1
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)'
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
