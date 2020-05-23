import React from 'react';
import ClimbLog from '../ClimbLog/ClimbLog';
import LogOffButton from '../../atoms/LogOffButton/LogOffButton';
import { AppBar, Toolbar, IconButton, Typography, Divider, List, SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';

export const Main = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        climb_track: sessions
                    </Typography>

                </Toolbar>
            </AppBar>
            <ClimbLog />
            <SwipeableDrawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
                <StyledDiv role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List>
                        <LogOffButton />
                    </List>
                    <Divider />
                </StyledDiv>
            </SwipeableDrawer>
        </>
    );
};


const StyledDiv = styled.div`
    width: 250px;
`;