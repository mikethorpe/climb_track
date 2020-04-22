import React, { useState } from 'react';
import { useEffect } from "react";
import Knob from '../../atoms/Knob/Knob';
// Store grades in the db / env variable

const GradeControl = () => {
    const GetGradeText = (wheelPercentage) => {
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
        let gradeIndex = Math.round((wheelPercentage / 100) * (grades.length - 1));
        return grades[gradeIndex > 0 ? gradeIndex : 0];
    }
    return <Knob getValueText={GetGradeText} />
};

export default GradeControl;




