import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSetAuthenticated } from '../../../dataLayer/actions/authenticationActions';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { accessTokensExist, setAccessTokens } from '../../../dataLayer/localStore/localStoreHelper';

const LogonForm = () => {

    const dispatch = useDispatch();

    const authentication = useSelector(state => state.authentication);
    const setAuthenticated = useSetAuthenticated();
    useEffect(() => {
        if (accessTokensExist()) {
            setAuthenticated(true);
        }
    }, []);

    let history = useHistory();

    useEffect(() => {
        if (authentication?.authenticated) {
            history.push("/");
        }
    }, [authentication]);

    const [credentials, setCredentials] = useState({
        emailAddress: '',
        password: ''
    });
    const onEmailTextFieldChange = (event) => setCredentials({ ...credentials, emailAddress: event.target.value });
    const onPasswordTextFieldChange = (event) => setCredentials({ ...credentials, password: event.target.value });

    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const onLogonButtonClick = async () => {
        const response = await axios.post('/api/login', credentials);
        if (response.status == 200) {
            setAccessTokens(response.data.token, response.data.refreshToken.token);
            setAuthenticated(true);
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