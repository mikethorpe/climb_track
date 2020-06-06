import React from "react";
import { Dialog, DialogContent, Button, Typography } from "@material-ui/core";
import styled from "styled-components";

export const ConfirmationModal = ({
  open,
  message,
  onConfirmClick,
  onCancelClick,
}) => {
  return (
    <Dialog open={open} maxWidth="sm">
      <StyledDialogContent>
        <StyledMessage>{message}</StyledMessage>
        <StyledButtonContainer>
          <StyledButton onClick={onCancelClick}>Cancel</StyledButton>
          <StyledButton onClick={onConfirmClick}>Ok</StyledButton>
        </StyledButtonContainer>
      </StyledDialogContent>
    </Dialog>
  );
};

const StyledMessage = styled(Typography)`
  && {
    margin-bottom: 20px;
  }
`;

const StyledButtonContainer = styled.div`
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
  float: right;
`;
const StyledDialogContent = styled(DialogContent)`
  margin: 20px;
`;
