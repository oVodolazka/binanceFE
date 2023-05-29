import React from "react";
import { History } from "../../components/History";
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
        field: 'insertTime',
        id: 5
    },
]

const DepositHistory = () => (<History fetchUrl='/binance/depositHistory' columns={columns} hideDateFilters={false} />)

export default DepositHistory