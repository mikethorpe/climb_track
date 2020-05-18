import React from 'react';
import ClimbLog from '../ClimbLog/ClimbLog';
import LogOffButton from '../../atoms/LogOffButton/LogOffButton';
import styled from 'styled-components';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export const Main = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        climb_track - sessions
                    </Typography>
                    <LogOffButton />
                </Toolbar>
            </AppBar>
            <ClimbLog />
        </>
    );
};