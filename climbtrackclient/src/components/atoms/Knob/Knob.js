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
            <StyledTypography variant="h4" align="center">{getValueText(value)}</StyledTypography>
            <AnotherDiv>
                <CoverDiv></CoverDiv>
                <StyledDonut
                    diameter={180}
                    min={0}
                    max={100}
                    step={1}
                    value={value}
                    onValueChange={setValue}
                    onInteractionChange={() => updateInteracting()}
                    ariaLabelledBy={'my-label'}
                    spaceMaxFromZero={false}
                    style={{
                        display: 'inline-block'
                    }}
                    theme={{
                        donutColor: '#3F51B5',
                        centerFocusedColor: 'white'
                    }}
                >
                </StyledDonut>
            </AnotherDiv>
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

const AnotherDiv = styled.div`
    height: 180px;
    width: 180px;
    display: inline-block;
`;

const StyledDiv = styled.div`
    text-align: center;
`;

const CoverDiv = styled.div`
    position: relative;
    top: 108px;
    left: 35px;
    z-index: 4;
    width: 111px;
    height: 37px;
    background: white;
`;

const StyledTypography = styled(Typography)`
    top: 146px;
    position: relative;
    z-index: 5;
`;