import React, { useState, useEffect } from 'react';
import Knob from '../../atoms/Knob/Knob';
import DateFnsUtils from '@date-io/date-fns';
import newId from '../../../helpers/newid';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import calculateMaxGradeFromClimbs from '../../../helpers/calculateMaxGradeFromClimbs';
import grades from '../../../dataLayer/constants/grades';
import { useCreateClimbingSession, useFetchClimbingSessions } from '../../../dataLayer/actions/climbingSessionsActions';
import { useDisplayClimbLoggerModal } from '../../../dataLayer/actions/userInterfaceActions';
import { DialogContent, Dialog, DialogTitle, Paper, Typography, Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import styled from 'styled-components';

const ClimbLogger = () => {

    const stylesSelector = createSelector(
        state => state.styles,
        styles => styles
    );
    const styles = useSelector(stylesSelector);

    const [climb, setClimb] = useState({
        grade: null,
        style: null,
        id: null
    });
    const setClimbStyleAndAddToClimbs = (selectedStyleDescription) => {
        let style = styles.filter(s => s.description === selectedStyleDescription)[0];
        setClimbs([...climbs, { ...climb, style: style }]);
        setClimb({ grade: null, style: null, id: null });
    }
    const setClimbGrade = (grade) => setClimb({
        ...climb,
        grade: grade,
        id: newId()
    });
    const removeClimbFromClimbs = (id) => {
        let updatedClimbs = climbs.filter((climb) => climb.id != id);
        setClimbs(updatedClimbs);
    };

    const [climbs, setClimbs] = useState([]);
    const clearClimbs = () => {
        setClimbs([]);
    };

    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const createClimbingSession = useCreateClimbingSession();
    const fetchClimbingSessions = useFetchClimbingSessions();

    const storeClimbingSession = async () => {
        const sessionCreated = await createClimbingSession({
            id: newId(),
            dateTime: selectedDate,
            maxGrade: calculateMaxGradeFromClimbs(climbs, grades.frenchSport),
            climbs: climbs
        });
        if (sessionCreated) {
            fetchClimbingSessions();
        }
        closeModal();
    };

    let displayGradeKnob = climb.grade == null;
    let displayStyleKnob = climb.grade !== null && climb.style == null;

    const yourClimbsList = climbs.map((climb) => <Paper key={climb.id}>
        {climb.grade + ' ' + climb.style.description}
        <Button variant="outlined" onClick={() => removeClimbFromClimbs(climb.id)}>Remove</Button>
    </Paper>);

    const gradeKnobControlText = 'Select grade';
    const styleKnobControlText = 'Select style';

    const displayClimbLoggerModal = useDisplayClimbLoggerModal();
    const showModal = useSelector(state => state.userInterface.climbLoggerModalDisplayed);
    const closeModal = () => {
        displayClimbLoggerModal(false);
        clearClimbs();
        setShowReviewPage(false);
    };

    const [showReviewPage, setShowReviewPage] = useState(false);


    const [addReviewButtonDisabled, setAddReviewButtonDisabled] = useState(true);
    useEffect(() => {
        if (!climbs.length) {
            setAddReviewButtonDisabled(true);
            return;
        }
        if (addReviewButtonDisabled) {
            setAddReviewButtonDisabled(false);
        }
    }, [climbs]);

    return (
        <Dialog onClose={closeModal} aria-labelledby="simple-dialog-title" open={showModal} fullWidth={true}>
            <StyledDialogContent>
                {showReviewPage &&
                    <>
                        <DialogTitle>Review your session: </DialogTitle>
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Select session date"
                                    format="dd/MM/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    maxDate={new Date()}
                                />
                            </MuiPickersUtilsProvider>
                            {yourClimbsList}
                            <div>
                                <Typography hidden={!addReviewButtonDisabled}>Go back to create some climbs to add them to your logbook</Typography>
                            </div>
                            <div>
                                <Button variant="contained" color="secondary" onClick={() => setShowReviewPage(false)}>Back</Button>
                                <Button variant="contained" color="secondary" disabled={addReviewButtonDisabled} onClick={storeClimbingSession}>Add climbs to logbook</Button>
                            </div>
                        </div>
                    </>
                }
                {!showReviewPage &&
                    <>
                        <DialogTitle>Add a climb:</DialogTitle>
                        <StyledDiv>
                            {displayGradeKnob && <Knob selection={grades.frenchSport} headerText={gradeKnobControlText} buttonText={'Next'} onButtonClick={setClimbGrade} />}
                            {displayStyleKnob && <Knob selection={styles.map(s => s.description)} headerText={styleKnobControlText} buttonText={'Next'} onButtonClick={setClimbStyleAndAddToClimbs} />}
                            <StyledFooterDiv>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={addReviewButtonDisabled}
                                    onClick={() => setShowReviewPage(true)}>
                                    Review and add to logbook
                                        </Button>
                            </StyledFooterDiv>
                        </StyledDiv>
                    </>
                }
            </StyledDialogContent>
        </Dialog>
    );
};

const StyledDiv = styled.div`
    height: 80%;
`;

const StyledDialogContent = styled(DialogContent)`
    height: 450px;
`;

const StyledFooterDiv = styled.div`
        position: absolute;
        bottom: 30px;
        right: 20px;
`;

export default ClimbLogger;