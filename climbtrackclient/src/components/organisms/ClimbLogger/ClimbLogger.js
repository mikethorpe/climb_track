import React, { useState } from 'react';
import Knob from '../../atoms/Knob/Knob';
import { createClimbingSession } from '../../../dataLayer/actions/climbingSessionsActions';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


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

const calculateMaxGrade = (climbs) => {
    let maxGradeIndex = 0;
    climbs.forEach(climb => {
        debugger;
        let gradeIndex = grades.indexOf(climb.grade);
        if (gradeIndex > maxGradeIndex) {
            maxGradeIndex = gradeIndex;
        }
    });

    return grades[maxGradeIndex];
}

const style = [
    'Overhanging',
    'Slab',
    'Crimpy face climbing',
];
const ClimbLogger = () => {

    const [currentLogItem, setCurrentLogItem] = useState({
        grade: null,
        style: null,
        id: -1
    });
    const [log, setLog] = useState([]);
    const clearLog = () => {
        setLog([]);
    };

    const dispatch = useDispatch();

    const setCurrentLogItemGrade = (grade) => setCurrentLogItem({ ...currentLogItem, grade: grade });

    const setCurrentLogItemStyleAndAddToLog = (style) => {
        setLog([...log, { ...currentLogItem, style: style }]);
        setCurrentLogItem({ grade: null, style: null, id: currentLogItem.id - 1 });
    }
    const deleteLogItem = (id) => {
        let updatedLogItems = log.filter((logItem) => logItem.id != id);
        setLog(updatedLogItems);
    };

    const gradeKnobControlText = 'What was the grade of your climb?';
    const styleKnobControlText = 'What was the style of your climb?';
    const yourClimbsList = log.map((logItem) => <li index={logItem.id}>{logItem.grade + ' ' + logItem.style} <button onClick={() => deleteLogItem(logItem.id)}>Remove</button></li>)

    let displayGradeKnob = currentLogItem.grade == null;
    let displayStyleKnob = currentLogItem.grade !== null && currentLogItem.style == null;

    const storeClimbingSession = () => {
        let session = createClimbingSession({
            id: 1,
            dateTime: selectedDate,
            maxGrade: calculateMaxGrade(log),
            log: log
        });
        dispatch(session);
        clearLog();
    };

    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            {displayGradeKnob && <Knob selection={grades} headerText={gradeKnobControlText} buttonText={'Next'} onButtonClick={setCurrentLogItemGrade} />}
            {displayStyleKnob && <Knob selection={style} headerText={styleKnobControlText} buttonText={'Next'} onButtonClick={setCurrentLogItemStyleAndAddToLog} />}
            {log.length > 0 &&
                <div>
                    <Typography>Your climbs</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Select session date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
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