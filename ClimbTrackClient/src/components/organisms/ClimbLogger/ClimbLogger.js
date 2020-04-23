import React, { useState, useEffect } from 'react';
import KnobControl from '../../molecules/KnobControl/KnobControl';

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
        grade: '6a',
        style: 'Slab'
    });
    const [log, setLog] = useState([]);

    useEffect(() => {
        console.log(log);
    }, [log]);

    const addLogItemToLog = (logItem) => {
        setLog([...log, currentLogItem]);
        setCurrentLogItem({ grade: null, style: null })
    }

    const gradeKnobControlText = 'What was the grade of your climb?';
    const styleKnobControlText = 'What was the style of the climb';
    const yourClimbsList = log.map((logItem) => <li>{logItem.grade + logItem.style}</li>)
    return (
        <div>
            <KnobControl selection={grades} headerText={gradeKnobControlText} />
            <button onClick={() => addLogItemToLog(currentLogItem)}>Add</button>
            <KnobControl selection={style} headerText={styleKnobControlText} />
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