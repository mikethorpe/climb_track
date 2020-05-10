import React, { useState, useEffect } from 'react';
import { Donut } from 'react-dial-knob';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Knob = ({ selection, buttonText, onButtonClick, onWheelTurn }) => {

    const [value, setValue] = useState(50);
    const getValueText = (wheelPercentage) => {
        let selectionIndex = Math.round((wheelPercentage / 100) * (selection.length - 1));
        return selection[selectionIndex > 0 ? selectionIndex : 0];
    }

    useEffect(() => {
        onWheelTurn(getValueText(value));
    }, [value])

    return (
        <StyledDiv>
            <Donut
                diameter={180}
                min={0}
                max={100}
                step={1}
                theme={{
                    donutColor: 'lightcoral',
                }}
                value={value}
                onValueChange={setValue}
                ariaLabelledBy={'my-label'}
                spaceMaxFromZero={false}
                style={{
                    display: 'inline-block'
                }}>
            </Donut>
            <StyledDiv>
                <StyledButton variant="outlined" onClick={() => onButtonClick(getValueText(value))}>{buttonText}</StyledButton>
            </StyledDiv>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    text-align: center;
`;

const StyledButton = styled(Button)`
   && {
    display: inline-block;
    margin-top: 20px;
   }    
`;

export default Knob;