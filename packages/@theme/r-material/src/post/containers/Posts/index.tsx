import * as React from 'react';
import {PostStore} from 'packages/@theme/r-material/src/post/stores/post.store';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {inject, observer} from 'mobx-react';
import {useEffect} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {StyleRules} from '@material-ui/core/styles';
import BundledIcon from '../../../core/components/BundledIcon';


import PostCard from '../../components/PostCard';

type PostsProps = BlogApiModel.PostsOverview & {
  postStore: PostStore;
};

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
      },
      gridList: {
        width: 500,
        height: 450
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
      });

      return (
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            {props.postStore.posts.map(
              (post: BlogModel.Post): JSX.Element => (
                <PostCard key={post.filename} {...post} />
              )
            )}
          </GridList>
        </div>
      );
    }
  )
);

export default Posts;
