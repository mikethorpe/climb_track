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
                                <FooterButton variant="outlined" onClick={() => setShowReviewPage(false)}>Back</FooterButton>
                                <FooterButton variant="contained" color="primary" disabled={addReviewButtonDisabled} onClick={storeClimbingSession}>Add climbs to logbook</FooterButton>
                            </StyledFooterDiv>
                            <NoClimbsTextContainer>
                                <Typography variant="subtitle1" color="red" hidden={!addReviewButtonDisabled}>Go back to create some climbs to add them to your logbook</Typography>
                            </NoClimbsTextContainer>
                        </StyledDiv>
                    </>
                }
                {!showReviewPage &&
                    <>
                        <DialogTitle>Create some climbs to add to your logbook</DialogTitle>
                        <StyledDiv>
                            <CurrentClimbStatsContainer>
                                <CurrentGradeStyleTypography variant="h5">
                                    Grade:
                                </CurrentGradeStyleTypography>
                                <CurrentGradeStyleTypography variant="h6">
                                    {climb.grade ?? ''}
                                </CurrentGradeStyleTypography>
                                <CurrentGradeStyleTypography variant="h5">
                                    Style:
                                </CurrentGradeStyleTypography>
                                <CurrentGradeStyleTypography variant="h6">
                                    {climb.style?.description ?? 'None'}
                                </CurrentGradeStyleTypography>
                            </CurrentClimbStatsContainer>
                            <KnobContainer>
                                {displayGradeKnob && <Knob selection={grades.frenchSport} buttonText={'Set grade'} onButtonClick={setKnobsToStyleDisplay} onWheelTurn={setClimbGrade} />}
                                {displayStyleKnob && <Knob selection={styles.map(s => s.description)} buttonText={'Set style and add'} onButtonClick={onSettingStyle} onWheelTurn={setClimbStyle} />}
                            </KnobContainer>
                            <StyledFooterDiv>
                                <TotalClimbsText>Total number of climbs in your session: {climbs.length}</TotalClimbsText>
                                <Button
                                    variant="outlined"
                                    color="primary"
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

const NoClimbsTextContainer = styled.div`
    height: 10px;
    text-align: right;
`;

const CurrentClimbStatsContainer = styled.div`
    display: inline-block;
    width: 40%;
`;

const KnobContainer = styled.div`
    display: inline-block;
    height: 80%;
    padding-top: 33px;
    padding-left: 30px;
`;

const CurrentGradeStyleTypography = styled(Typography)`
    text-align: center;
    margin-top: 15px;
    vertical-align: middle;
`;

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
    /* position: absolute; */
    text-align: right;
    bottom: 30px;
    right: 20px;
`;

export default ClimbLogger;