import React from 'react';
import ClimbLog from '../ClimbLog/ClimbLog';
import LogOffButton from '../../atoms/LogOffButton/LogOffButton';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

export const Main = () => {

    const useStyles = makeStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
    });

    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        climb_track - sessions
                    </Typography>

                </Toolbar>
            </AppBar>
            <ClimbLog />
            <div>
                {
                    <React.Fragment key={'left'}>
                        <SwipeableDrawer
                            anchor={'left'}
                            open={state['left']}
                            onClose={toggleDrawer('left', false)}
                            onOpen={toggleDrawer('left', true)}
                        >
                            <div
                                className={clsx(classes.list, {
                                    [classes.fullList]: false
                                })}
                                role="presentation"
                                onClick={toggleDrawer('left', false)}
                                onKeyDown={toggleDrawer('left', false)}
                            >
                                <List>
                                    <LogOffButton />
                                </List>
                                <Divider />
                            </div>
                        </SwipeableDrawer>
                    </React.Fragment>
                }
            </div>
        </>
    );
};