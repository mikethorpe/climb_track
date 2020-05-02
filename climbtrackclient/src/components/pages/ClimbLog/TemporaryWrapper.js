import React, { useEffect } from 'react';
import LogonForm from '../../organisms/LogonForm/LogonForm';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import ClimbLog from '../../pages/ClimbLog/ClimbLog';
import LogOffButton from '../../atoms/LogOffButton/LogOffButton';

const TemporaryWrapper = () => {

    const authenticationSelector = createSelector(
        state => state.authentication,
        authentication => authentication
    );
    const authenticationObject = useSelector(authenticationSelector);

    useEffect(() => {
        console.log(authenticationObject);
    }, [authenticationObject])
    console.log(authenticationObject);

    return (
        <>
            {authenticationObject?.authenticated && <ClimbLog />}
            {!authenticationObject?.authenticated && <LogonForm />}
            <LogOffButton />
        </>
    );
};

export default TemporaryWrapper;