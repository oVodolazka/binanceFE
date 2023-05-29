import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useUser } from "../../components/AuthProvider";
import MuiSelect from "../../components/MuiSelect";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QRCode from 'qrcode'
import { NoIntegration } from "../../components/NoIntegration";

const Deposit = () => {
    const [coins, setCoins] = useState([]);
    const [network, setNetwork] = useState('');
    const [coin, setCoin] = useState('');
    const [networkData, setNetworkData] = useState([]);
    const [address, setAddress] = useState('');
    const [qrImage, setQrImage] = useState('');
    const user = useUser()

    const handleNetworkChange = event => {
        setNetwork(event.target.value);
    };
    const handleChangeCoin = (event) => {
        setCoin(event.target.value);
    };

    const coinsData = coins.map((item, index) => {
        const { label, ticker } = item
        return { value: ticker, id: index, data: { label, ticker } }
    })

    const generateQR = async text => {
        return await QRCode.toDataURL(text)
    }

    const getAddress = async (coin, network) => {
        try {
            const response = await api.get(`/binance/address?coin=${coin}&network=${network}`)
            const qr = await generateQR(response.data.address)
            setQrImage(qr);
            setAddress(response.data.address);
        } catch (e) {
            console.error(e)
        }
    }

    const [errorMessage, setErrorMessage] = useState('')
    const getDepositCoins = async () => {
        try {
            if (user.binanceKeysExist) {
                const { data } = await api.get('/binance/getcoins');
                setCoins(data)
            }
        } catch (error) {
            setErrorMessage(error.response.data)
        }
    }

    useEffect(() => {
        if (coin) {
            const selectedCoinData = coins.find(item => item.ticker == coin)
            const networksList = selectedCoinData.networkList.map((item, index) =>
                ({ value: item.network, id: index, data: { item } }))
            setNetworkData(networksList);
        }
    }, [coin])

    useEffect(() => {
        setNetwork('')
        setAddress('')
        setQrImage('')
    }, [coin])

    useEffect(() => {
        if (coin && network) {
            getAddress(coin, network)
        }
    }, [network])

    useEffect(() => {
        getDepositCoins();
    }, [])

    if (user.binanceKeysExist) {
        return (
            <Box sx={{ paddingTop: '94px', paddingLeft: '30px', paddingRight: '30px', backgroundColor: '#9c9e9d47', height: '100%' }}>
                <Box sx={{ backgroundColor: '#ffffff', borderRadius: '10px', height: '600px', padding: '50px' }}>
                    <Box sx={{ color: '#ff0000' ,height:'10px'}}>{errorMessage}</Box>
                    <Box sx={{ display: 'flex', flexFlow: 'row', width: '700px', justifyContent: 'space-between', paddingBottom: '60px', height: '150px' }}>
                        <p>Choose currency</p>
                        <MuiSelect
                            defaultValue=""
                            value={coin}
                            options={coinsData}
                            label={{ title: 'Coin', id: 'coin-select' }}
                            RenderComponent={CurrencyOptionItem}
                            onChange={handleChangeCoin}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'row', width: '700px', justifyContent: 'space-between', paddingBottom: '60px', height: '150px' }}>
                        <p>Network</p>
                        <MuiSelect
                            defaultValue=""
                            value={network}
                            options={networkData}
                            onChange={handleNetworkChange}
                            label={{ title: 'Network', id: 'network-select' }}
                            RenderComponent={NetworkOptionItem}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'row', paddingBottom: '60px', marginTop: '10px', height: '300px', width: '700px', justifyContent: 'space-between' }}>
                        {address && (
                            <>
                                <p>Address</p>
                                <Box sx={{ display: 'flex', flexFlow: 'column', width: '400px' }}>
                                    <Box sx={{ display: 'flex', flexFlow: 'row' }}>
                                        <p>{address}</p>
                                        <Button sx={{ height: '50px' }} onClick={() => { navigator.clipboard.writeText({ address }) }}><ContentCopyIcon /></Button>
                                    </Box>
                                    <Box>
                                        {qrImage && (
                                            <img src={qrImage} />
                                        )}
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        )
    }
    return <NoIntegration />
}

const CurrencyOptionItem = ({ data }) => (
    <Box sx={{ height: '36px', fontSize: '14px' }}>
        {data.ticker} <br />
        {data.label}
    </Box>
)

const NetworkOptionItem = ({ data }) => (
    <Box sx={{ height: '36px', fontSize: '14px' }}>
        {data.item.label} <br />
        {data.item.network}
    </Box>
)

export default Deposit