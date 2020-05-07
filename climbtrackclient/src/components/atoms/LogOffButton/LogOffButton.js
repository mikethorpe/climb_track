import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRefreshToken } from '../../../dataLayer/accessToken/accessTokenHelper';
import { useSetAuthenticated } from '../../../dataLayer/actions/authenticationActions';

const LogOffButton = () => {

    let history = useHistory();

    const setAuthenticated = useSetAuthenticated();

    const onLogOffClicked = async () => {
        //TODO: move this out into a custom hook action
        let token = getRefreshToken();
        await axios.post('/api/login/revoke', { token: token });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExpiration');
        delete axios.defaults.headers.common['Authorization'];
        setAuthenticated(false);
        history.push("/");
    };

    const authentication = useSelector(state => state.authentication);

    return (
        authentication.authenticated && <Button variant="outlined" onClick={onLogOffClicked} > Log off</Button>
    );
};

export default LogOffButton;