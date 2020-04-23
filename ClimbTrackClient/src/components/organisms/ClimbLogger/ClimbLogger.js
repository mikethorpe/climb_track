import React, { useState, useEffect } from 'react';
import Knob from '../../atoms/Knob/Knob';

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

    useEffect(() => {
        console.log(log);
    }, [log]);

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
    const yourClimbsList = log.map((logItem) => <li index={logItem.id}>{logItem.grade + ' ' + logItem.style}<button onClick={() => deleteLogItem(logItem.id)}>Remove</button></li>)

    let displayGradeKnob = currentLogItem.grade == null;
    let displayStyleKnob = currentLogItem.grade !== null && currentLogItem.style == null;
    return (
        <div>
            {displayGradeKnob && <Knob selection={grades} headerText={gradeKnobControlText} buttonText={'Next'} onButtonClick={setCurrentLogItemGrade} />}
            {displayStyleKnob && <Knob selection={style} headerText={styleKnobControlText} buttonText={'Next'} onButtonClick={setCurrentLogItemStyleAndAddToLog} />}
            <div>
                <p>Your climbs</p>
                <ul>
                    {yourClimbsList}
                </ul>
            </div>
        </div>

    );
};

export default ClimbLogger;