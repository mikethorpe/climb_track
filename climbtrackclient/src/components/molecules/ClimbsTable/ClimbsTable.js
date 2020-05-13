import React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell, Paper, TableContainer, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import styled from 'styled-components';

export const ClimbsTable = ({ climbs, handleDeleteClimb }) => {
    return (
        <StyledTableContainer component={Paper}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Grade</TableCell>
                        <TableCell align="center">Style</TableCell>
                        <TableCell align="center">Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {climbs.map((climb) => (
                        <TableRow key={climb.id}>
                            <TableCell align="center">{climb.grade}</TableCell>
                            <TableCell align="center">{climb.style.description}</TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="delete" onClick={() => handleDeleteClimb(climb.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}

const StyledTableContainer = styled(TableContainer)`
    height: 100%;
`;