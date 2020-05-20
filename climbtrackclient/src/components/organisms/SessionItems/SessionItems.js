import React from 'react';
import { useSelector } from 'react-redux';
import SessionItem from '../../molecules/SessionItem/SessionItem';
import { createSelector } from 'reselect';
import styled from 'styled-components';

export const SessionItems = () => {

    const climbingSessionsSelector = createSelector(
        state => state.climbingSessions,
        sessions => sessions
    );
    const sessionItems = useSelector(climbingSessionsSelector);

    const displayItems = sessionItems.slice(0).reverse().map((item) => {
        return <SessionItem key={item.id} climbingSession={item} />
    });

    return (
        <StyledDiv>
            {displayItems}
        </StyledDiv >
    );
};

const StyledDiv = styled.div`
    margin-top: 78px;
    margin-bottom: 86px;
`;
