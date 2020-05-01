import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const SessionItem = ({ climbingSession }) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>
                    {`Date: ${climbingSession.dateTime}, 
                    Total climbs: ${climbingSession.climbs.length}, 
                    Maximum grade: ${climbingSession.maxGrade}`}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
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
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default SessionItem;