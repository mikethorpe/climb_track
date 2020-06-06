import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import styled from "styled-components";
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from "recharts";

import { generateGradeDistribution } from "../../../helpers/gradeHelper";
import { generateStyleDistribution } from "../../../helpers/gradeHelper";

import { useSelector } from "react-redux";
import { useDisplaySessionDetailsModal } from "../../../dataLayer/actions/userInterfaceActions";
import {
  useSetSelectedClimbingSession,
  useDeleteClimbingSession,
  useFetchClimbingSessions,
} from "../../../dataLayer/actions/climbingSessionsActions";

import { ConfirmationModal } from "../../molecules/ConfirmationModal/ConfirmationModal";

export const SessionDetailsModal = () => {
  const selectedClimbingSession = useSelector(
    (state) => state.climbingSessions.selectedSession
  );

  const gradeDistributionData = selectedClimbingSession
    ? generateGradeDistribution(selectedClimbingSession.climbs)
    : null;

  const styles = useSelector((state) => state.styles);
  const styleDistributionData = selectedClimbingSession
    ? generateStyleDistribution(selectedClimbingSession.climbs, styles)
    : null;
  const displaySessionDetailsModal = useDisplaySessionDetailsModal();
  const setSelectedClimbingSession = useSetSelectedClimbingSession();

  const deleteClimbingSession = useDeleteClimbingSession();
  const fetchClimbingSessions = useFetchClimbingSessions();

  const deleteSession = async (climbingSession) => {
    await deleteClimbingSession(climbingSession);
    fetchClimbingSessions();
    closeConfirmationModal();
    closeSessionDetailsModal();
  };

  const closeSessionDetailsModal = () => {
    displaySessionDetailsModal(false);
    setSelectedClimbingSession(null);
  };

  // TODO: Fix bug - sessionDetailsModalDisplayed does not appear in initial store
  const open = useSelector(
    (state) => state.userInterface.sessionDetailsModalDisplayed
  );

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const closeConfirmationModal = () => setConfirmationModalOpen(false);
  const onDeleteClicked = () => {
    setConfirmationModalOpen(true);
  };

  return (
    <Dialog fullScreen open={open} onClose={closeSessionDetailsModal}>
      <ConfirmationModal
        open={confirmationModalOpen}
        message="Are you sure you want to delete this session?"
        onConfirmClick={() => deleteSession(selectedClimbingSession)}
        onCancelClick={closeConfirmationModal}
      />
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeSessionDetailsModal}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {selectedClimbingSession && (
        <DialogContent>
          <DialogTitle>Review your session: </DialogTitle>
          {/* the above gets hidden on the page - fix this!!! */}
          <StyledEditDeleteContainer>
            <IconButton aria-label="delete">
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={onDeleteClicked}>
              <Delete />
            </IconButton>
          </StyledEditDeleteContainer>
          <StyledStatsContainer>
            <StyledDateTime>
              Date: {selectedClimbingSession.dateTime}
            </StyledDateTime>
            <Typography>
              Total climbs: {selectedClimbingSession.climbs.length}
            </Typography>
            <Typography>
              Max grade: {selectedClimbingSession.maxGrade}
            </Typography>
            <Typography>Average grade: 6b+</Typography>
          </StyledStatsContainer>
          <StyledGraphContainer>
            <Typography>Grade distribution:</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={gradeDistributionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <Bar dataKey="total" fill="#ffc658">
                  <LabelList dataKey="total" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </StyledGraphContainer>

          <StyledGraphContainer>
            <Typography>Style distribution:</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={styleDistributionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="styleDescription" />
                <Bar dataKey="total" fill="#ffc658">
                  <LabelList dataKey="total" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </StyledGraphContainer>
          <StyledTableContainer>
            <Typography>Breakdown:</Typography>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Grade</TableCell>
                    <TableCell align="center">Style</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedClimbingSession &&
                    selectedClimbingSession.climbs.map((climb) => (
                      <TableRow key={climb.id}>
                        <TableCell align="center">{climb.grade}</TableCell>
                        <TableCell align="center">
                          {climb.style.description}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledTableContainer>
        </DialogContent>
      )}
    </Dialog>
  );
};

const StyledEditDeleteContainer = styled.div`
  border: solid;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
`;

const StyledDateTime = styled(Typography)`
  && {
    display: block;
    text-align: right;
    margin-bottom: 10px;
  }
`;

const StyledStatsContainer = styled.div`
  border: solid;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
`;

const StyledTableContainer = styled.div`
  border: solid;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
`;

const StyledGraphContainer = styled.div`
  height: 210px;
  border: solid;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
`;
