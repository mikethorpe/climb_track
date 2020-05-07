import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRevokeRefreshToken } from '../../../dataLayer/actions/authenticationActions';
import { useSetAuthenticated } from '../../../dataLayer/actions/authenticationActions';
import { clearAccessTokens } from '../../../dataLayer/accessToken/accessTokenHelper';

//TODO: Create a story for this component...maybe it could be more than 'just a button'!
const LogOffButton = () => {

    let history = useHistory();
    const setAuthenticated = useSetAuthenticated();
    const revokeRefreshToken = useRevokeRefreshToken();

    const onLogOffClicked = async () => {
        revokeRefreshToken();
        clearAccessTokens();
        setAuthenticated(false);
        history.push("/");
    };

    const authentication = useSelector(state => state.authentication);

    return (
        authentication.authenticated && <Button variant="outlined" onClick={onLogOffClicked} > Log off</Button>
    );
};

export default LogOffButton;