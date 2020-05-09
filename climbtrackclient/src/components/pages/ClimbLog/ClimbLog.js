import React, { useEffect } from 'react';
import SessionItems from '../../organisms/SessionItems/SessionItems';
import { useFetchClimbingSessions } from '../../../dataLayer/actions/climbingSessionsActions';
import { useDisplayClimbLoggerModal } from '../../../dataLayer/actions/userInterfaceActions';
import { useFetchStyles } from '../../../dataLayer/actions/stylesActions';
import { setAuthHeader } from '../../../dataLayer/accessToken/accessTokenHelper';
import ClimbLogger from '../../organisms/ClimbLogger/ClimbLogger';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

const ClimbLog = () => {

    const fetchClimbingSessions = useFetchClimbingSessions();
    const fetchStyles = useFetchStyles();

    useEffect(() => {
        setAuthHeader();
        fetchClimbingSessions();
        fetchStyles();
    }, []);

    const displayClimbLoggerModal = useDisplayClimbLoggerModal();

    return (
        <div>
            <ClimbLogger />
            <StyledFab color="primary" aria-label="add" onClick={() => displayClimbLoggerModal(true)}>
                <AddIcon />
            </StyledFab>
            <Typography>Climbing sessions</Typography>
            <SessionItems />
        </div>
    );
};

const StyledFab = styled(Fab)`
    && { 
        position: 'absolute';
        bottom: theme.spacing(2);
        right: theme.spacing(2);
    }
`;


export default ClimbLog;