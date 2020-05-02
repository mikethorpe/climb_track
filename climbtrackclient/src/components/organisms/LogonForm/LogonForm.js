import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_AUTHENTICATED } from '../../../dataLayer/actions/types';

const LogonForm = () => {

    const [credentials, setCredentials] = useState({
        emailAddress: 'climber@climber.com',
        password: 'climbing'
    });
    // const onEmailTextFieldChange = (event) => setCredentials({ ...credentials, emailAddress: event.target.value });
    // const onPasswordTextFieldChange = (event) => setCredentials({ ...credentials, password: event.target.value });

    const dispatch = useDispatch();

    const onLogonButtonClick = async () => {
        const response = await axios.post('/api/login', credentials);
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken.token);
        localStorage.setItem('refreshTokenExpiration', response.data.refreshToken.expiration);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        dispatch({ type: SET_AUTHENTICATED, payload: true });
    }

    return (
        <Paper>
            <Typography>Enter your credentials to log on:</Typography>
            <TextField id="outlined-basic" label="Email address" variant="outlined" value={credentials.emailAddress} />
            <TextField id="outlined-basic" label="Password" variant="outlined" value={credentials.password} />
            <Button variant="outlined" onClick={onLogonButtonClick}>Log on</Button>
        </Paper>
    );
};

export default LogonForm;