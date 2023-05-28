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
        field: 'completeTime'
    },
    {
        headerName: 'Fee',
        field: 'transactionFee'
    },
]

const WithdrawHistory = () => {
    return (
        <History fetchUrl='/binance/withdrawHistory' columns={columns}  hideDateFilters={true}  />
    )
}

export default WithdrawHistory