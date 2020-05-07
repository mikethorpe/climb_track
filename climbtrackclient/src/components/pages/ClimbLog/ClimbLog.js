import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SessionItems from '../../organisms/SessionItems/SessionItems';
import ClimbLogger from '../../organisms/ClimbLogger/ClimbLogger';
import { useFetchClimbingSessions } from '../../../dataLayer/actions/climbingSessionsActions';
import { useFetchStyles } from '../../../dataLayer/actions/stylesActions';
import axios from 'axios';
import { setAuthHeader } from '../../../dataLayer/accessToken/accessTokenHelper';

const TabPanel = (props) => {
    const { children, value, index } = props;
    return (<div hidden={value !== index}>{children}</div>);
};

const ClimbLog = () => {

    const fetchClimbingSessions = useFetchClimbingSessions();
    const fetchStyles = useFetchStyles();

    useEffect(() => {
        setAuthHeader();
        fetchClimbingSessions();
        fetchStyles();
    }, []);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example">
                    <Tab label="Log book" />
                    <Tab label="Add session" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <SessionItems />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ClimbLogger />
            </TabPanel>
        </div>
    );
};

export default ClimbLog;