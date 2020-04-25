import React from 'react';
import { useSelector } from 'react-redux';
import SessionItem from '../../molecules/SessionItem/SessionItem';
import { createSelector } from 'reselect';

const SessionItems = () => {
    const climbingSessionsSelector = createSelector(
        state => state.climbingSessions,
        sessions => sessions
    );
    const sessionItems = useSelector(climbingSessionsSelector);
    const displayItems = sessionItems.slice(0).reverse().map((item) => {
        return <li key={item.id}><SessionItem climbingSession={item} /></li>
    });
    return (
        <div>
            <ul>
                {displayItems}
            </ul>
        </div >
    );
};

export default SessionItems;