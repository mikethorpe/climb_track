import React from 'react';
import { Typography, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import { useDisplaySessionDetailsModal } from '../../../dataLayer/actions/userInterfaceActions';
import { useSetSelectedClimbingSession } from '../../../dataLayer/actions/climbingSessionsActions';

export const SessionItem = ({ climbingSession }) => {

    const displaySessionDetailsModal = useDisplaySessionDetailsModal();
    const setSelectedClimbingSession = useSetSelectedClimbingSession();

    const handleSessionItemClicked = (id) => {
        setSelectedClimbingSession(id);
        displaySessionDetailsModal(true);
    }

    return (
        <StyledListItem button onClick={() => handleSessionItemClicked(climbingSession.id)}>
            <StyledDateTime variant="h6">
                {climbingSession.dateTime}
            </StyledDateTime>
            <StatsDiv>
                <Typography>
                    {`Climbs: ${climbingSession.climbs.length}`}
                </Typography>
                <Typography>
                    {`Avg: ${climbingSession.maxGrade}`}
                </Typography>
                <Typography>
                    {`Max: ${climbingSession.maxGrade}`}
                </Typography>
            </StatsDiv >
            <StyledSessionNotes variant="subtitle2">
                Notes: Crusty butthole. Give me attention or face the wrath of my claws need to chase tail, and human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken!. Hit you unexpectedly attack feet. Meow all night having their mate disturbing sleeping humans disappear for four days and return home with an expensive injury; bite the vet eat too much then proceed to regurgitate all over living room carpet while humans eat dinner rub whiskers on bare skin act innocent poop on floor and watch human clean up. Lick sellotape i cry and cry and cry unless you pet me, and then maybe i cry just for fun or licks your face. Spend all night ensuring people don't sleep sleep all day suddenly go on wild-eyed crazy rampage sit on human they not getting up ever.
            </StyledSessionNotes>
        </StyledListItem >
    );
};

const StyledDateTime = styled(Typography)`
    && {
        display: block;
        text-align: right;
        margin-bottom: 10px;
    }
`;

const StatsDiv = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
`;

const StyledListItem = styled(ListItem)`
    && {
        padding-bottom: 15px;
        padding-top: 15px;
        display: block;
    }
`;

const StyledSessionNotes = styled(Typography)`
    && {
        display: block;
        width: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 10px;
    }
`;
