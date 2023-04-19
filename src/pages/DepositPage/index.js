import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useUser } from "../../components/AuthProvider";
import MuiSelect from "../../components/MuiSelect";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QRCode from 'qrcode'
import { NoIntegration } from "../../components/noIntegration";

const DepositPage = () => {
    const [coins, setCoins] = useState([]);
    const [network, setNetwork] = useState('');
    const [coin, setCoin] = useState('');
    const [networkData, setNetworkData] = useState([]);
    const [address, setaddress] = useState('');
    const user = useUser()

    const handleNetworkChange = (event) => {
        setNetwork(event.target.value);
    };
    const handleChange = (event) => {
        setCoin(event.target.value);
    };

    const coinsData = coins.map(item => {
        const { label, ticker } = item
        return { value: item.ticker, data: { label, ticker } }
    })

    const generateQR = async text => {
        try {
            return await QRCode.toDataURL(text)
        } catch (err) {
            console.error(err)
        }
    }

    const getaddress = async (coin, network) => {
        const response = await api.get('/binance/address', { params: { coin, network } });
        const qr = await generateQR(JSON.parse(response.data).address)
        setaddress(<> <p>{JSON.parse(response.data).address}</p> <Button sx={{height:'50px'}} onClick={() => { navigator.clipboard.writeText(JSON.parse(response.data).address) }}><ContentCopyIcon /></Button>
            <img src={qr}></img>
        </>)
    }

    const getDepositHistory = async (coin, network) => {
        const { data } = await api.get('/binance/depositHistory', { params: { coin, network } });
        console.log(data)
    }

    const getDepositCoins = async () => {
        try {
            const { data } = await api.get('/binance/getcoins');
            setCoins(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        coins.find((item) => {
            if (item.ticker == coin) {
                const result = [];
                let index = 0;
                const networkList = item.networkList;
                networkList.forEach(() => {
                    const elem = networkList[index];
                    result.push({ value: elem.network, data: { elem } });
                    index++;
                });
                setNetworkData(result);
            }
        });
    }, [coin])

    useEffect(() => {
        getDepositCoins();
    }, [])

    useEffect(() => {
        setNetwork('')
        setaddress('')
    }, [coin])


    useEffect(() => {
        if (coin && network) {
            getaddress(coin, network)
        }
    }, [network])

    if (user.binanceKeysExist) {
        return (
            <Box sx={{ paddingTop: '130px', paddingLeft: '150px', paddingRight: '150px', backgroundColor: '#F8F8FF', height: '100%' }}>
                <Box sx={{ backgroundColor: '#ffffff', borderRadius: '10px', height: '600px', padding: '50px' }}>
                    <Box sx={{ display: 'flex', flexFlow: 'row', width: '700px', justifyContent: 'space-between', paddingBottom: '60px', height: '110px' }}>
                        <Box>Choose currency</Box>
                        <MuiSelect
                            defaultValue=""
                            value={coin}
                            options={coinsData}
                            label={{ title: 'Coin', id: 'coin-select' }}
                            RenderComponent={CurrencyOptionItem}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'row', width: '700px', justifyContent: 'space-between', marginTop: '10px', height: '110px' }}>
                        <Box>Network</Box>
                        <MuiSelect
                            defaultValue=""
                            value={network}
                            options={networkData}
                            onChange={handleNetworkChange}
                            label={{ title: 'Network', id: 'network-select' }}
                            RenderComponent={NetworkOptionItem}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', paddingBottom: '60px', marginTop: '10px', height: '300px' }}>
                        <Box>Address</Box>
                        {address}
                    </Box>
                    <Button onClick={() => getDepositHistory(coin, network)}>Get history</Button>
                </Box>
            </Box>
        )
    }
    return (
       <NoIntegration/>
    )
}

const CurrencyOptionItem = ({ data }) => (
    <Box sx={{ height: '36px', fontSize: '14px' }}>
        {data.ticker} <br />
        {data.label}
    </Box>
)

const NetworkOptionItem = ({ data }) => {
    return (
        <Box sx={{ height: '36px', fontSize: '14px' }}>
            {data.elem.label} <br />
            ({data.elem.network})
        </Box>
    )
}

export default DepositPage