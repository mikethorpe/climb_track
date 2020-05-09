import React, { useState } from 'react';
import { Donut } from 'react-dial-knob';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Knob = ({ selection, headerText, buttonText, onButtonClick }) => {

    const [value, setValue] = useState(50);
    const getValueText = (wheelPercentage) => {
        let selectionIndex = Math.round((wheelPercentage / 100) * (selection.length - 1));
        return selection[selectionIndex > 0 ? selectionIndex : 0];
    }

    return (
        <StyledDiv>
            <Typography>{headerText}</Typography>
            <Donut
                diameter={200}
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
                <label id={'my-label'} style={{
                    textAlign: 'center',
                    width: '200px',
                    display: 'block',
                    padding: '10px 0'
                }}><Typography>{getValueText(value)}</Typography></label>
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
   }    
`;

export default Knob;