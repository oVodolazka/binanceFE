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
import api from "../../api";
import dayjs from 'dayjs';

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

const DepositHistory = () => {
    const today = new Date();
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(today.getDate() - 60);
    const [rows, setRows] = useState([])
    const [startValue, setStartValue] = useState(dayjs(sixtyDaysAgo));
    const [endValue, setEndValue] = useState(dayjs(today));
    const createData = (id, coin, network, amount, date) => {
        return { id, coin, network, amount, date };
    }

    const getDepositHistory = async (start, end) => {
        const { data } = await api.get(`/binance/depositHistory?start=${start}&end=${end}`);
        const result = []
        data.forEach(item => {
            const date = new Date(item.insertTime);
            result.push(createData(item.id, item.coin, item.network, item.amount, date.toLocaleString('en-US')))
        });
        setRows(result)
    }
    const startTimestamp = startValue.toDate().getTime();
    const endTimestamp = endValue.toDate().getTime();

    useEffect(() => {
        getDepositHistory(startTimestamp, endTimestamp);
    }, [startValue, endValue])


    return (
        <Box sx={{ padding: '94px 30px 30px 30px', backgroundColor: '#9c9e9d47', height: '100%' }}>
            <Box sx={{ backgroundColor: '#ffffff', borderRadius: '10px', height: '100%', padding: '50px' }}>
                <StartDate
                    sx={{paddingRight:'65px'}}
                    value={startValue}
                    onChange={(newValue) => setStartValue(newValue)}
                />
                <EndDate
                    value={endValue}
                    onChange={(newValue) => setEndValue(newValue)}
                />
                <TableContainer component={Paper} sx={{ margin: '60px 0', height:'80%',border:'2px solid #9c9e9d47',boxShadow:'none', borderRadius:'10px'}}>
                    <Table sx={{ minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '200px' }} align="left">Id</TableCell>
                                <TableCell sx={{ width: '180px' }} align="left">Coin</TableCell>
                                <TableCell sx={{ width: '180px' }} align="left">Network</TableCell>
                                <TableCell sx={{ width: '180px' }} align="left">Amount</TableCell>
                                <TableCell sx={{ width: '180px' }} align="left">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody  sx={{height:'100%'}}>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ width: '100px'}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="left">{row.coin}</TableCell>
                                    <TableCell align="left">{row.network}</TableCell>
                                    <TableCell align="left">{row.amount}</TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default DepositHistory