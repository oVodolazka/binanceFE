import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import api from "../api";
import { NoIntegration } from "./NoIntegration";
import { useUser } from "./AuthProvider";

const StartDate = ({ ...props }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker {...props} />
        </LocalizationProvider>
    );
}
const EndDate = ({ ...props }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker {...props} />
        </LocalizationProvider>
    );
}

export const History = ({ fetchUrl, hideDateFilters , columns }) => {
    const today = new Date();
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(today.getDate() - 60);
    const [rows, setRows] = useState([])
    const [startValue, setStartValue] = useState(dayjs(sixtyDaysAgo));
    const [endValue, setEndValue] = useState(dayjs(today));
    const [errorMessage, setErrorMessage] = useState('')
    const user = useUser()
    const getHistory = async (link) => {
        try {
            const { data } = await api.get(`${link}?start=${startTimestamp}&end=${endTimestamp}`);     
            setRows(data)
        }
        catch (error) {
            setErrorMessage(error.response.data)
        }
    }
    const startTimestamp = startValue.toDate().getTime();
    const endTimestamp = endValue.toDate().getTime();

    useEffect(() => {
        getHistory(fetchUrl);
    }, [startValue, endValue])

    if (user.binanceKeysExist) {
        return (
            <Box sx={{ padding: '94px 30px 30px 30px', backgroundColor: '#9c9e9d47', height: '100%' }}>
                <Box sx={{ backgroundColor: '#ffffff', borderRadius: '10px', height: '100%', padding: '50px' }}>
                    {!hideDateFilters && (
                        <div>
                            <StartDate
                                sx={{ paddingRight: '65px' }}
                                value={startValue}
                                onChange={(newValue) => {
                                    setStartValue(newValue);
                                    setErrorMessage('');
                                }}
                            />
                            <EndDate
                                value={endValue}
                                onChange={(newValue) => {
                                    setEndValue(newValue);
                                    setErrorMessage('');
                                }}
                            />
                        </div>
                    )}
                    <Box sx={{ color: '#ff0000' }}>{errorMessage}</Box>
                    <TableContainer component={Paper} sx={{ margin: '60px 0', height: '80%', border: '1px solid #9c9e9d47', boxShadow: 'none', borderRadius: '10px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((item) => (
                                        <TableCell sx={{ width: '200px' }} align="left" key={item.headerName}>
                                            {item.headerName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ height: '100%' }}>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ width: '100px' }}
                                    >
                                        {columns.map((item) => (
                                            <TableCell align="left" key={item.headerName}>{row[item.field]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        )
    }
    return <NoIntegration />
}