import { Button, TextField, Typography } from '@material-ui/core';
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
        <StyledDiv>
            <StyledTypography>Welcome to climb_track</StyledTypography>
            <ErrorModal statePath='authentication' />
            <FieldAndButtonContainer>
                <StyledTextField
                    label="Email address"
                    variant="outlined"
                    value={credentials.emailAddress}
                    onChange={onEmailTextFieldChange}
                    fullWidth />
                <StyledTextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={credentials.password}
                    onChange={onPasswordTextFieldChange}
                    fullWidth />
                <Button variant="outlined" color="primary" onClick={onLogonButtonClick} fullWidth>Log on</Button>
            </FieldAndButtonContainer>
        </StyledDiv>
    );
}

const FieldAndButtonContainer = styled.div`
    width: 80%;
    height: 400px;
    padding: 10px;
    text-align: center;
    display: inline-block;
`;

const StyledTypography = styled(Typography)`
    && {
        margin-top: 20px;
        margin-bottom: 20px;
    }
`;

const StyledTextField = styled(TextField)`
    && div {
        margin-bottom: 20px;
    }
`;

const StyledDiv = styled.div`
    width: 100%;
    text-align: center;
`;