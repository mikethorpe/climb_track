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
    console.log(typeof sessionItems);
    console.log(sessionItems);
    const displayItems = sessionItems.map((item) => {
        return <li><SessionItem climbingSession={item} /></li>
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