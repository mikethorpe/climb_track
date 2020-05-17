import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import styled from 'styled-components';

export const DatePicker = ({ label, selectedDate, handleDateChange }) => {
    return (
        <StyledDatePickerDiv>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Select session date"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    maxDate={new Date()}
                />
            </MuiPickersUtilsProvider>
        </StyledDatePickerDiv>
    );
}

const StyledDatePickerDiv = styled.div`
    text-align: right;
`;