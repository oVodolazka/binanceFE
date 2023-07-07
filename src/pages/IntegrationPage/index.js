import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import api from '../../api';
import { IntegrationSuccess } from './IntegrationSuccess';
import { useDispatch , useSelector} from 'react-redux';
import { getUser } from '../../components/User/userSlice';

const Integration = () => {
    const user = useSelector((state) => state.user.data)
    let [binanceKeysExist, setBinanceKeysExist] = useState(user.binanceKeysExist);
    const dispatch = useDispatch()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            apiKey: '',
            secretKey: '',
        }
    });
    const onSubmit = async (data) => {
        try {
            await api.post('/binance/integration', { apiKey: data.apiKey, secretKey: data.secretKey })
            dispatch(getUser());
        } catch (e) {
            console.log(e)
        }
    };

    const onEditKeys = () => {
        setBinanceKeysExist(false);
    }

    const onRemoveKeys = async () => {
        try {
            await api.post('binance/integration')
            dispatch(getUser());
        } catch (e) {
            console.log(e)
        }
    }

    if (binanceKeysExist) {
        return (
            <IntegrationSuccess onEditKeys={onEditKeys} onRemoveKeys={onRemoveKeys} />
        )
    }

    return (
        <Box sx={{ paddingTop: '130px', paddingLeft: '350px', paddingRight: '350px', backgroundColor: '#9c9e9d47', height: '100%' }}>
            <Box sx={{ backgroundColor: '#ffffff', borderRadius: '10px', height: '600px', padding: '50px' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="apiKey"
                        control={control}
                        render={({ field }) => {
                            return (<TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                name="APIKey"
                                label="API Key"
                                type="password"
                                id="APIKey"
                                autoComplete="API Key"
                            />)
                        }}
                    />
                    <Controller
                        name="secretKey"
                        control={control}
                        render={({ field, fieldState }) => {
                            const errorMessage = fieldState.error && fieldState.error.message
                            return (<TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                name="Secret Key"
                                label="Secret Key"
                                type="password"
                                id="Secret Key"
                                autoComplete="Secret Key"
                                error={!!errorMessage}
                                helperText={errorMessage}
                            />)
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2, backgroundColor: '#fcc203',
                            '&:hover': {
                                backgroundColor: '#d69605'
                            },
                            fontSize: '15px',
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default Integration