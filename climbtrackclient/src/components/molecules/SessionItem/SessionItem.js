import React from 'react';
import { Typography, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import { useDisplaySessionDetailsModal } from '../../../dataLayer/actions/userInterfaceActions';

export const SessionItem = ({ climbingSession }) => {

    // import { useDeleteClimbingSession, useFetchClimbingSessions } from '../../../dataLayer/actions/climbingSessionsActions';
    // const deleteClimbingSession = useDeleteClimbingSession();
    // const fetchClimbingSessions = useFetchClimbingSessions();

    // const onDeleteClicked = async (climbingSession) => {
    //     await deleteClimbingSession(climbingSession);
    //     fetchClimbingSessions();
    // };

    const displaySessionDetailsModal = useDisplaySessionDetailsModal();

    return (
        <StyledListItem button onClick={() => displaySessionDetailsModal(true)}>
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
