import React, { useState } from 'react';
import Knob from '../../atoms/Knob/Knob';
import { useCreateClimbingSession } from '../../../dataLayer/actions/climbingSessionsActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import newId from '../../../helpers/newid';

// todo: move into the store and fetch
const grades = [
    '3',
    '3+',
    '4',
    '4+',
    '5',
    '5+',
    '6a',
    '6a+',
    '6b',
    '6b+',
    '6c',
    '6c+',
    '7a',
    '7a+',
    '7b',
    '7b+',
    '7c',
    '7c+'
];

// todo: move into a separate method
const calculateMaxGrade = (climbs) => {
    let maxGradeIndex = 0;
    climbs.forEach(climb => {
        let gradeIndex = grades.indexOf(climb.grade);
        if (gradeIndex > maxGradeIndex) {
            maxGradeIndex = gradeIndex;
        }
    });
    return grades[maxGradeIndex];
}

// todo: move into store and fetch from api
const style = [
    'Overhanging',
    'Slab',
    'Crimpy face climbing',
];

const ClimbLogger = () => {

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
            maxGrade: calculateMaxGrade(log),
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
            {displayStyleKnob && <Knob selection={style} headerText={styleKnobControlText} buttonText={'Next'} onButtonClick={setCurrentLogItemStyleAndAddToLog} />}
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