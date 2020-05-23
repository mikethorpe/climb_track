import React, { useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, AppBar, Toolbar, IconButton, TableContainer,
    Table, Paper, TableHead, TableRow, TableCell, TableBody, Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import styled from 'styled-components';
import {
    BarChart, Bar, XAxis, LabelList
} from 'recharts';

import { generateGradeDistribution } from '../../../helpers/gradeHelper';

export const SessionDetailsModal = () => {

    const closeModal = () => {
        // hit the store to close the modal
        console.log('closing');
    };

    const climbingSession = {
        id: 1,
        dateTime: '22th April 2019',
        maxGrade: '7b',
        climbs: [
            { id: 2, grade: '5', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6a', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6b', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '5', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6b+', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '5+', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6c', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6a', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6a+', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6a+', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '7a', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6a+', style: { id: 3, description: 'Arete' } },
            { id: 2, grade: '6b', style: { id: 3, description: 'Arete' } },
        ]
    };

    const data = generateGradeDistribution(climbingSession.climbs);

    // add selector to check if the modal is open

    return (
        <Dialog fullScreen open={true} onClose={closeModal}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={closeModal} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <DialogTitle>Review your session: </DialogTitle>
                {/* the above gets hidden on the page - fix this!!! */}
                <StyledEditDeleteContainer>
                    <IconButton aria-label="delete">
                        <Edit />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <Delete />
                    </IconButton>
                </StyledEditDeleteContainer>
                <StyledStatsContainer>
                    <Typography>
                        Date: {climbingSession.dateTime}
                    </Typography>
                    <Typography>
                        Total climbs: {climbingSession.climbs.length}
                    </Typography>
                    <Typography>
                        Max grade: {climbingSession.maxGrade}
                    </Typography>
                    <Typography>
                        Average grade: 6b+
                    </Typography>
                </StyledStatsContainer>
                <StyledGraphContainer>
                    {
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <XAxis dataKey="name" />
                            <Bar dataKey="total" fill="#ffc658">
                                <LabelList dataKey="total" position="top" />
                            </Bar>
                        </BarChart>
                    }
                </StyledGraphContainer>
                <StyledTableContainer>
                    <Typography>
                        Breakdown:
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Grade</TableCell>
                                    <TableCell align="center">Style</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {climbingSession.climbs.map((climb) => (
                                    <TableRow key={climb.id}>
                                        <TableCell align="center">{climb.grade}</TableCell>
                                        <TableCell align="center">{climb.style.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledTableContainer>

            </DialogContent>
        </Dialog>
    )
};



const StyledEditDeleteContainer = styled.div`
    border: solid;
    margin-bottom: 10px;
    padding: 10px 10px 10px 10px;
`;

const StyledStatsContainer = styled.div`
    border: solid;
    margin-bottom: 10px;
    padding: 10px 10px 10px 10px;
`;

const StyledTableContainer = styled.div`
    border: solid;
    margin-bottom: 10px;
    padding: 10px 10px 10px 10px;
`;

const StyledGraphContainer = styled.div`
    border: solid;
    margin-bottom: 10px;
    padding: 10px 10px 10px 10px;
`;