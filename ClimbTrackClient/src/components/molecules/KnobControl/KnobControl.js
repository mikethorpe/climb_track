import React, { useState } from 'react';
import { useEffect } from "react";
import Knob from '../../atoms/Knob/Knob';
// Store grades in the db / env variable

const KnobControl = ({ selection, headerText }) => {
    const getValueText = (wheelPercentage) => {

        let selectionIndex = Math.round((wheelPercentage / 100) * (selection.length - 1));
        return selection[selectionIndex > 0 ? selectionIndex : 0];
    }
    return (
        <div>
            <p>{headerText}</p>
            <Knob getValueText={getValueText} />
        </div>
    );
};

export default KnobControl;




