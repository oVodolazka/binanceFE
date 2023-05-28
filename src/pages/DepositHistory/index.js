import React from "react";
import { History } from "../../components/History";
const columns = [
    {
        headerName: 'Id',
        field: 'id'
    },
    {
        headerName: 'Coin',
        field: 'coin'
    },
    {
        headerName: 'Network',
        field: 'network'
    },
    {
        headerName: 'Amount',
        field: 'amount'
    },
    {
        headerName: 'Date',
        field: 'insertTime'
    },
]

const DepositHistory = () => {
    return (
        <History fetchUrl='/binance/depositHistory' columns={columns} hideDateFilters={false} />
    )
}

export default DepositHistory