import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import BundledIcon from '@theme/r-material/src/core/components/BundledIcon';
import GridListTile from '@material-ui/core/GridListTile';
import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

type PostCardProps = BlogModel.Post;

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

const PostCard = (props: PostCardProps): JSX.Element => {
  const classes = useStyles();

  return (
    <GridListTile key={props.permalink}>
      <img src={props.metadata.cover} alt={props.metadata.title} />
      <GridListTileBar
        title={props.metadata.title}
        subtitle={<span>created: {props.metadata.created}</span>}
        actionIcon={
          <IconButton href="" aria-label={`info about ${props.metadata.title}`} className={classes.icon}>
            <BundledIcon type="info" />
          </IconButton>
        }
      />
    </GridListTile>
  );
};

export default PostCard;
