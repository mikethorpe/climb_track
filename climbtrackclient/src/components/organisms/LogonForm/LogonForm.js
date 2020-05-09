import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { accessTokensExist } from '../../../dataLayer/accessToken/accessTokenHelper';
import { login, useSetAuthenticated } from '../../../dataLayer/actions/authenticationActions';
import { ErrorModal } from '../../atoms/ErrorModal/ErrorModal';

export function LogonForm() {

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
        emailAddress: 'climber@climber.com',
        password: 'climbing'
    });
    const onEmailTextFieldChange = (event) => null  // setCredentials({ ...credentials, emailAddress: event.target.value });
    const onPasswordTextFieldChange = (event) => null // setCredentials({ ...credentials, password: event.target.value });

    const onLogonButtonClick = useCallback(() => dispatch(login(credentials)), [dispatch, credentials]);

    return (
        <Paper>
            <Typography>Enter your credentials to log on:</Typography>
            <ErrorModal statePath='authentication' />
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
}