import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_AUTHENTICATED } from '../../../dataLayer/actions/types';
import { useHistory } from 'react-router-dom';

const LogOffButton = () => {

    let history = useHistory();

    const dispatch = useDispatch();

    const onLogOffClicked = async () => {
        //TODO: move this out into a custom hook action
        let token = localStorage.getItem('refreshToken');
        await axios.post('/api/login/revoke', { token: token });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExpiration');
        delete axios.defaults.headers.common['Authorization'];
        dispatch({ type: SET_AUTHENTICATED, payload: false });
        history.push("/");
    };

    const authentication = useSelector(state => state.authentication);

    return (
        authentication.authenticated && <Button variant="outlined" onClick={onLogOffClicked} > Log off</Button>
    );
};

export default LogOffButton;