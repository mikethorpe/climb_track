import { Card, Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { accessTokensExist } from '../../../dataLayer/accessToken/accessTokenHelper';
import { login, useSetAuthenticated } from '../../../dataLayer/actions/authenticationActions';
import { ErrorModal } from '../../atoms/ErrorModal/ErrorModal';
import styled from 'styled-components';

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
        <StyledCard>
            <StyledTypography>Enter your credentials to log on:</StyledTypography>
            <ErrorModal statePath='authentication' />
            <StyledTextField
                label="Email address"
                variant="outlined"
                value={credentials.emailAddress}
                onChange={onEmailTextFieldChange} />
            <StyledTextField
                label="Password"
                type="password"
                variant="outlined"
                value={credentials.password}
                onChange={onPasswordTextFieldChange} />
            <StyledButton variant="outlined" color="primary" onClick={onLogonButtonClick}>Log on</StyledButton>
        </StyledCard>
    );
}

const StyledTypography = styled(Typography)`
    && {
        margin-bottom: 20px;
    }
`;

const StyledTextField = styled(TextField)`
    && {
        display: block;
        margin-bottom: 20px;
        width: 300px;
    }
`;

const StyledButton = styled(Button)`
    margin: 10px;
    width: 300px;
    display: block;
`;

const StyledCard = styled(Card)`
    width: 400px;
    text-align: center;
    padding: 20px;
`;