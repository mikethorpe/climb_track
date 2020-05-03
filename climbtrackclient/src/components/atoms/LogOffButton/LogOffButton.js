import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_AUTHENTICATED } from '../../../dataLayer/actions/types';

const LogOffButton = () => {

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
    };

    return (
        <Button variant="outlined" onClick={onLogOffClicked}>Log off</Button>
    );
};

export default LogOffButton;