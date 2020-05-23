import React from 'react';
import { useSelector } from 'react-redux';
import { SessionItem } from '../../molecules/SessionItem/SessionItem';
import { List, Divider } from '@material-ui/core';
import { createSelector } from 'reselect';
import styled from 'styled-components';

export const SessionItems = () => {

    const climbingSessionsSelector = createSelector(
        state => state.climbingSessions.sessions,
        sessions => sessions
    );
    const sessionItems = useSelector(climbingSessionsSelector);

    const displayItems = sessionItems.slice(0).reverse().map((item) => {
        console.log(item);
        return <div key={item.id}>
            <SessionItem climbingSession={item} />
            <Divider />
        </div>
    });

    return (
        <List>
            {displayItems}
        </List>
    );
};
