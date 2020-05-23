import React from 'react';
import { Typography, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import { useDisplaySessionDetailsModal } from '../../../dataLayer/actions/userInterfaceActions';
import { useSetSelectedClimbingSession } from '../../../dataLayer/actions/climbingSessionsActions';

export const SessionItem = ({ climbingSession }) => {

    // import { useDeleteClimbingSession, useFetchClimbingSessions } from '../../../dataLayer/actions/climbingSessionsActions';
    // const deleteClimbingSession = useDeleteClimbingSession();
    // const fetchClimbingSessions = useFetchClimbingSessions();

    // const onDeleteClicked = async (climbingSession) => {
    //     await deleteClimbingSession(climbingSession);
    //     fetchClimbingSessions();
    // };

    const displaySessionDetailsModal = useDisplaySessionDetailsModal();
    const setSelectedClimbingSession = useSetSelectedClimbingSession();

    const handleSessionItemClicked = (id) => {
        console.log(id);
        setSelectedClimbingSession(id);
        displaySessionDetailsModal(true);
    }

    return (
        <StyledListItem button onClick={() => handleSessionItemClicked(climbingSession.id)}>
            <Typography>
                {`Date: ${climbingSession.dateTime}, 
                    Total climbs: ${climbingSession.climbs.length}, 
                    Maximum grade: ${climbingSession.maxGrade}`}
            </Typography>
        </StyledListItem>
    );
};

const StyledListItem = styled(ListItem)`
    padding-bottom: 15px;
    padding-top: 15px;
`;
