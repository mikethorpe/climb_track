import React, { useState } from 'react';
import Knob from '../../atoms/Knob/Knob';
import { useCreateClimbingSession } from '../../../dataLayer/actions/climbingSessionsActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import newId from '../../../helpers/newid';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import calculateMaxGradeFromClimbs from '../../../helpers/calculateMaxGradeFromClimbs';
import Paper from '@material-ui/core/Paper';
import grades from '../../../dataLayer/constants/grades';

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
    const storeClimbingSession = () => {
        createClimbingSession({
            id: newId(),
            dateTime: selectedDate,
            maxGrade: calculateMaxGradeFromClimbs(climbs, grades.frenchSport),
            climbs: climbs
        });
        clearClimbs();
    };

    let displayGradeKnob = climb.grade == null;
    let displayStyleKnob = climb.grade !== null && climb.style == null;

    const yourClimbsList = climbs.map((climb) => <Paper key={climb.id}>
        {climb.grade + ' ' + climb.style.description}
        <Button variant="outlined" onClick={() => removeClimbFromClimbs(climb.id)}>Remove</Button>
    </Paper>);
    const gradeKnobControlText = 'What was the grade of your climb?';
    const styleKnobControlText = 'What was the style of your climb?';

    return (
        <div>
            {displayGradeKnob && <Knob selection={grades.frenchSport} headerText={gradeKnobControlText} buttonText={'Next'} onButtonClick={setClimbGrade} />}
            {displayStyleKnob && <Knob selection={styles.map(s => s.description)} headerText={styleKnobControlText} buttonText={'Next'} onButtonClick={setClimbStyleAndAddToClimbs} />}
            {climbs.length > 0 &&
                <div>
                    <Typography>Your climbs:</Typography>
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
                    <Button variant="contained" color="secondary" onClick={storeClimbingSession}>Add climbs to logbook</Button>
                    {yourClimbsList}
                </div>}
        </div>
    );
};

export default ClimbLogger;