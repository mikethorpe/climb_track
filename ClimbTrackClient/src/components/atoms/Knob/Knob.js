import React, { useState } from 'react';
import { Donut } from 'react-dial-knob';
import { useEffect } from "react";

const Knob = ({ getValueText }) => {
    const [value, setValue] = useState(50);

    return <Donut
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
};

export default Knob;