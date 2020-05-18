import React, { useEffect } from 'react';
import SessionItems from '../../organisms/SessionItems/SessionItems';
import { useFetchClimbingSessions } from '../../../dataLayer/actions/climbingSessionsActions';
import { useDisplayClimbLoggerModal } from '../../../dataLayer/actions/userInterfaceActions';
import { useFetchStyles } from '../../../dataLayer/actions/stylesActions';
import { setAuthHeader } from '../../../dataLayer/accessToken/accessTokenHelper';
import { ClimbLogger } from '../../organisms/ClimbLogger/ClimbLogger';
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
        <>
            <div>
                <ClimbLogger />
                <SessionItems />
            </div>
            <StyledFab color="primary" onClick={() => displayClimbLoggerModal(true)}>
                <AddIcon />
            </StyledFab>
        </>
    );
};

const StyledFab = styled(Fab)`
    && { 
        position: fixed;
        bottom: 20px;
        left: 10px;
    }
`;

export default ClimbLog;