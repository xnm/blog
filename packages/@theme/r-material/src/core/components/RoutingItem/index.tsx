import * as React from 'react';
import { Theme, useTheme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { NavMenuItem } from '../../store/reducer';

type RoutingItemProps = NavMenuItem;

const useStyles = makeStyles((theme: Theme): StyleRules => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360
  },
  lists: {
    backgroundColor: theme.palette.background.paper
  }
}));


const RoutingItem: React.ComponentType<RoutingItemProps> = (props: RoutingItemProps): JSX.Element => {
  // const theme: Theme = useTheme();
  // const classes = useStyles(theme);


  return (
    <div>Hello</div>
  );
};

export default RoutingItem;
