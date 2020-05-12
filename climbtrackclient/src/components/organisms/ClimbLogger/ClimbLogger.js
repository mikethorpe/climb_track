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
import CloseIcon from '@material-ui/icons/Close';
import { DialogContent, Dialog, DialogTitle, Typography, Button, IconButton } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, AppBar, Toolbar } from '@material-ui/core'
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
    const setClimbStyle = (knobStyleDescription) => {
        let style = styles.filter(s => s.description === knobStyleDescription)[0];
        setClimb({ ...climb, style: style });
    }
    const setClimbGrade = (knobGrade) => setClimb({
        ...climb,
        grade: knobGrade
    });
    const addClimbToSession = () => {
        setClimbs([...climbs, { ...climb, id: newId() }]);
        setClimb({ grade: null, style: null, id: null });
    }

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

    const saveClimbingSession = async () => {
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

    const [displayGradeKnob, setDisplayGradeKnob] = useState(true);
    const [displayStyleKnob, setDisplayStyleKnob] = useState(false);
    const setKnobsToStyleDisplay = () => {
        setDisplayGradeKnob(false);
        setDisplayStyleKnob(true);
    };
    const setKnobsToGradeDisplay = () => {
        setDisplayGradeKnob(true);
        setDisplayStyleKnob(false);
    };

    const onSettingStyle = () => {
        addClimbToSession();
        setKnobsToGradeDisplay();
    }

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
        <Dialog fullScreen open={showModal} onClose={closeModal}>
            <AppBar>
                <Toolbar>
                    {!showReviewPage &&
                        <>
                            <IconButton edge="start" color="inherit" onClick={closeModal} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Button autoFocus color="inherit" disabled={addReviewButtonDisabled} onClick={() => setShowReviewPage(true)}>
                                Review and save
                            </Button>
                        </>}
                    {showReviewPage &&
                        <>
                            <IconButton edge="start" color="inherit" onClick={() => setShowReviewPage(false)} aria-label="close">
                                <ArrowBackIcon />
                            </IconButton>
                            <Button autoFocus color="inherit" disabled={addReviewButtonDisabled} onClick={saveClimbingSession}>
                                Save to logbook
                            </Button>
                        </>
                    }

                </Toolbar>
            </AppBar>
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
                        </StyledDiv>
                    </>
                }
                {!showReviewPage &&
                    <>
                        <DialogTitle>Add climbs</DialogTitle>
                        <StyledLoggerContainer>
                            <CurrentGradeStyleTypography variant="h5">
                                Grade: {climb.grade ?? ''}    Style: {climb.style?.description ?? 'None'}
                            </CurrentGradeStyleTypography>
                            <TotalClimbsText>Total climbs: {climbs.length}</TotalClimbsText>
                            {displayGradeKnob && <Knob selection={grades.frenchSport} buttonText={'Set grade'} onButtonClick={setKnobsToStyleDisplay} onWheelTurn={setClimbGrade} />}
                            {displayStyleKnob && <Knob selection={styles.map(s => s.description)} buttonText={'Set style and add'} onButtonClick={onSettingStyle} onWheelTurn={setClimbStyle} />}
                        </StyledLoggerContainer>
                    </>
                }
            </StyledDialogContent>
        </Dialog>
    );
};


const StyledCloseButton = styled(IconButton)`
    && {
        position: relative;
        top: 20px;
        right: 30px;
    }
`;

const StyledLoggerContainer = styled.div`
    display: block;
    height: 80%;
`;

const CurrentGradeStyleTypography = styled(Typography)`
   && {
    
    display: block;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
   }
`;

const TotalClimbsText = styled(Typography)`
    && { 
        display: block;
        text-align: center;
        margin-right: 30px;
        margin-top: 30px;
    }
`;

const StyledTableContainer = styled(TableContainer)`
    height: 100%;
`;

const FooterButton = styled(Button)`
   && {
       margin-left: 10px;
   }
`;

const StyledDiv = styled.div`
    height: 80%;
`;

const ListOfClimbsDiv = styled.div`
    height: 80%;
    margin: 10px;
`;

const StyledDialogContent = styled(DialogContent)`
    height: 100%;
`;

const StyledDatePickerDiv = styled.div`
    text-align: right;
`;

const StyledFooterDiv = styled.div`
    position: relative;
    text-align: center;
`;

export default ClimbLogger;