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
import mockApi from '../../../dataLayer/mockApi/mockApi';

const ClimbLogger = () => {

    //ToDo: fetch this from the back-end
    const grades = mockApi.grades.frenchSport;

    const stylesSelector = createSelector(
        state => state.styles,
        styles => styles
    );
    const styles = useSelector(stylesSelector);

    const [currentLogItem, setCurrentLogItem] = useState({
        grade: null,
        style: null,
        id: null
    });
    const setCurrentLogItemStyleAndAddToLog = (style) => {
        setLog([...log, { ...currentLogItem, style: style }]);
        setCurrentLogItem({ grade: null, style: null, id: null });
    }
    const setCurrentLogItemGrade = (grade) => setCurrentLogItem({
        ...currentLogItem,
        grade: grade,
        id: newId()
    });
    const deleteLogItem = (id) => {
        let updatedLogItems = log.filter((logItem) => logItem.id != id);
        setLog(updatedLogItems);
    };

    const [log, setLog] = useState([]);
    const clearLog = () => {
        setLog([]);
    };

    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const createClimbingSession = useCreateClimbingSession();
    const storeClimbingSession = () => {
        createClimbingSession({
            id: newId(),
            dateTime: selectedDate.toDateString(),
            maxGrade: calculateMaxGradeFromClimbs(log, grades),
            log: log
        });
        clearLog();
    };

    let displayGradeKnob = currentLogItem.grade == null;
    let displayStyleKnob = currentLogItem.grade !== null && currentLogItem.style == null;

    const yourClimbsList = log.map((logItem) => <li index={logItem.id}>{logItem.grade + ' ' + logItem.style} <button onClick={() => deleteLogItem(logItem.id)}>Remove</button></li>)
    const gradeKnobControlText = 'What was the grade of your climb?';
    const styleKnobControlText = 'What was the style of your climb?';

    return (
        <div>
            {displayGradeKnob && <Knob selection={grades} headerText={gradeKnobControlText} buttonText={'Next'} onButtonClick={setCurrentLogItemGrade} />}
            {displayStyleKnob && <Knob selection={styles} headerText={styleKnobControlText} buttonText={'Next'} onButtonClick={setCurrentLogItemStyleAndAddToLog} />}
            {log.length > 0 &&
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
                    <ul>
                        {yourClimbsList}
                    </ul>
                </div>}
        </div>
    );
};

export default ClimbLogger;