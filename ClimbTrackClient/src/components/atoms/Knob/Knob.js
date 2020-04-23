import React, { useState, useEffect } from 'react';
import { Donut } from 'react-dial-knob';

const Knob = ({ selection, headerText, buttonText, onButtonClick }) => {

    const [value, setValue] = useState(50);
    const getValueText = (wheelPercentage) => {
        let selectionIndex = Math.round((wheelPercentage / 100) * (selection.length - 1));
        return selection[selectionIndex > 0 ? selectionIndex : 0];
    }

    return (
        <div>
            <p>{headerText}</p>
            <Donut
                diameter={200}
                min={0}
                max={100}
                step={1}
                theme={{
                    donutColor: 'lightcoral'
                }}
                style={{
                    position: 'relative',
                    margin: '100px auto',
                    width: '200px'
                }}
                value={value}
                onValueChange={setValue}
                ariaLabelledBy={'my-label'}
                spaceMaxFromZero={false}
            >
                <label id={'my-label'} style={{
                    textAlign: 'center',
                    width: '200px',
                    display: 'block',
                    padding: '10px 0'
                }}>{getValueText(value)}</label>
            </Donut>
            <button onClick={() => onButtonClick(getValueText(value))}>{buttonText}</button>
        </div>


    );
};

export default Knob;