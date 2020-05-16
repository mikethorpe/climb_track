import React, { useState } from 'react';
import { Donut } from 'react-dial-knob';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const Knob = ({ selection, onInteractionEnd }) => {

    const [interacting, setInteracting] = useState(false);

    const updateInteracting = () => {
        if (interacting) {
            onInteractionEnd(getValueText(value));
        }
        setInteracting(!interacting);
    };

    const [value, setValue] = useState(50);
    const getValueText = (wheelPercentage) => {
        let selectionIndex = Math.round((wheelPercentage / 100) * (selection.length - 1));
        return selection[selectionIndex > 0 ? selectionIndex : 0];
    }

    return (
        <StyledDiv>
            <Typography>{getValueText(value)}</Typography>
            <StyledDonut
                diameter={180}
                min={0}
                max={100}
                step={1}
                theme={{
                    donutColor: 'lightcoral',
                }}
                value={value}
                onValueChange={setValue}
                onInteractionChange={() => updateInteracting()}
                ariaLabelledBy={'my-label'}
                spaceMaxFromZero={false}
                style={{
                    display: 'inline-block'
                }}>
            </StyledDonut>
        </StyledDiv >
    );
};

const StyledDonut = styled(Donut)`
    &&& {
        div[class$="text"] {
            display: none !important;
        }
    }
`;

const StyledDiv = styled.div`
    text-align: center;
    margin-top: 43px;
`;