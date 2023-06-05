import React from 'react';
import { History } from '../../components/History';

const columns = [
    {
        headerName: 'Id',
        field: 'id',
        id: 1
    },
    {
        headerName: 'Coin',
        field: 'coin',
        id: 2
    },
    {
        headerName: 'Network',
        field: 'network',
        id: 3
    },
    {
        headerName: 'Amount',
        field: 'amount',
        id: 4
    },
    {
        headerName: 'Date',
        field: 'completeTime',
        id: 5
    },
    {
        headerName: 'Fee',
        field: 'transactionFee',
        id: 6
    },
]

const WithdrawHistory = () => (<History fetchUrl='/binance/withdrawHistory' columns={columns} hideDateFilters={true} />)

export default WithdrawHistory