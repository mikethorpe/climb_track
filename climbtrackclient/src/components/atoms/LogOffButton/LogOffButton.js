import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const LogOffButton = () => {

    const onLogOffClicked = async () => {
        let token = localStorage.getItem('refreshToken');
        await axios.post('/api/login/revoke', { token: token });
        // dispatch({ type: SET_AUTHENTICATED, payload: false });
    };

    return (
        <Button variant="outlined" onClick={onLogOffClicked}>Log off</Button>
    );
};

export default LogOffButton;