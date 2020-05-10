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
import { Delete } from '@material-ui/icons';
import { DialogContent, Dialog, DialogTitle, Typography, Button, IconButton } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core'


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

    // const listOfClimbs = climbs.map((climb) => <div key={climb.id}>
    //     {climb.grade + ' ' + climb.style.description}
    //     <IconButton aria-label="delete" onClick={() => removeClimbFromClimbs(climb.id)}>
    //         <Delete />
    //     </IconButton>
    // </div>);

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
                        <StyledDiv>
                            <StyledDatePickerDiv>
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
                            </StyledDatePickerDiv>
                            <ListOfClimbsDiv>
                                <StyledTableContainer component={Paper}>
                                    <Table stickyHeader size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Grade</TableCell>
                                                <TableCell align="center">Style</TableCell>
                                                <TableCell align="center">Remove</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {climbs.map((climb) => (
                                                <TableRow key={climb.id}>
                                                    <TableCell align="center">{climb.grade}</TableCell>
                                                    <TableCell align="center">{climb.style.description}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton aria-label="delete" onClick={() => removeClimbFromClimbs(climb.id)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </StyledTableContainer>
                            </ListOfClimbsDiv>
                            <StyledFooterDiv>
                                <div>
                                    <Typography hidden={!addReviewButtonDisabled}>Go back to create some climbs to add them to your logbook</Typography>
                                </div>
                                <FooterButton variant="outlined" onClick={() => setShowReviewPage(false)}>Back</FooterButton>
                                <FooterButton variant="contained" color="primary" disabled={addReviewButtonDisabled} onClick={storeClimbingSession}>Add climbs to logbook</FooterButton>
                            </StyledFooterDiv>
                        </StyledDiv>
                    </>
                }
                {!showReviewPage &&
                    <>
                        <DialogTitle>Create some climbs to add to your logbook</DialogTitle>
                        <StyledDiv>
                            {displayGradeKnob && <Knob selection={grades.frenchSport} headerText={gradeKnobControlText} buttonText={'Next'} onButtonClick={setClimbGrade} />}
                            {displayStyleKnob && <Knob selection={styles.map(s => s.description)} headerText={styleKnobControlText} buttonText={'Next'} onButtonClick={setClimbStyleAndAddToClimbs} />}
                            <StyledFooterDiv>
                                <TotalClimbsText>Total number of climbs in your session: {climbs.length}</TotalClimbsText>
                                <Button
                                    variant="outlined"
                                    disabled={addReviewButtonDisabled}
                                    onClick={() => setShowReviewPage(true)}>
                                    Review climbs to add
                                        </Button>
                            </StyledFooterDiv>
                        </StyledDiv>
                    </>
                }
            </StyledDialogContent>
        </Dialog>
    );
};

const TotalClimbsText = styled(Typography)`
    display: inline;
    margin-right: 30px;
`;

const StyledTableContainer = styled(TableContainer)`
    height: 100%;
`;

const FooterButton = styled(Button)`
   margin-left: 10px;
`;

const StyledDiv = styled.div`
    height: 80%;
`;

const ListOfClimbsDiv = styled.div`
    height: 230px;
    margin: 10px;
`;

const StyledDialogContent = styled(DialogContent)`
    height: 450px;
`;

const StyledDatePickerDiv = styled.div`
    text-align: right;
`;

const StyledFooterDiv = styled.div`
    position: absolute;
    bottom: 30px;
    right: 20px;
`;

export default ClimbLogger;