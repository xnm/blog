import * as React from 'react';
import { Theme, useTheme, StyleRules, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { NavMenu } from '../../stores/navigation.store';

type RoutingItemListProps = NavMenu;

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const RoutingItemList: React.ComponentType<RoutingItemListProps> = (props: RoutingItemListProps): JSX.Element => {
  const theme: Theme = useTheme();
  const classes = useStyles(theme);

  const [open, setOpen] = React.useState(false);

  function toggleOpen(): void {
    setOpen(!open);
  }

  return (
    <List component="nav" className={classes.root}>
      <ListItem component="div" button onClick={toggleOpen}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding />
        </Collapse>
      </ListItem>
    </List>
  );
};

export default RoutingItemList;
