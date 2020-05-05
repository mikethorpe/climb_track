import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_AUTHENTICATED } from '../../../dataLayer/actions/types';
import { useHistory, useLocation } from 'react-router-dom';

const LogonForm = () => {

    const [credentials, setCredentials] = useState({
        emailAddress: '',
        password: ''
    });
    const onEmailTextFieldChange = (event) => setCredentials({ ...credentials, emailAddress: event.target.value });
    const onPasswordTextFieldChange = (event) => setCredentials({ ...credentials, password: event.target.value });

    const dispatch = useDispatch();

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const onLogonButtonClick = async () => {
        const response = await axios.post('/api/login', credentials);
        debugger;
        if (response.status == 200) {
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken.token);
            localStorage.setItem('refreshTokenExpiration', response.data.refreshToken.expiration);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
            dispatch({ type: SET_AUTHENTICATED, payload: true });
            history.replace(from);
            return;
        }
    };

    return (
        <Paper>
            <Typography>Enter your credentials to log on:</Typography>
            <TextField
                label="Email address"
                variant="outlined"
                value={credentials.emailAddress}
                onChange={onEmailTextFieldChange} />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={credentials.password}
                onChange={onPasswordTextFieldChange} />
            <Button variant="outlined" onClick={onLogonButtonClick}>Log on</Button>
        </Paper>
    );
};

export default LogonForm;