import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import api from "../../api";
import { UserContext, useUser } from "../../components/AuthProvider";
import { IntegrationSuccess } from "./IntegrationSuccess";

const Integration = () => {
    const user = useUser();
    let [binanceKeysExist, setBinanceKeys] = useState(false);

    const userContext = React.useContext(UserContext)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            apiKey: '',
            secretKey: '',
        }
    });
    const onSubmit = async (data) => {
        try {
            await api.post('/binance/integration', { apiKey: data.apiKey, secretKey: data.secretKey })
            userContext.getMe()
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        setBinanceKeys(user.binanceKeysExist)
    }, [user.binanceKeysExist])

    const onEditKeys = () => {
        setBinanceKeys(false);
    }
    const onRemoveKeys = async () => {
        try {
            await api.post('binance/integration')
            userContext.getMe()
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
        <Box sx={{ paddingTop: '130px', paddingLeft: '350px', paddingRight: '350px', backgroundColor: '#F8F8FF', height: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="apiKey"
                    control={control}
                    render={({ field }) => {
                        return <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="APIKey"
                            label="API Key"
                            type="password"
                            id="APIKey"
                            autoComplete="API Key"
                        />
                    }}
                />
                <Controller
                    name="secretKey"
                    control={control}
                    render={({ field, fieldState }) => {
                        const errorMessage = fieldState.error && fieldState.error.message
                        return <TextField
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
                        />
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
    )
}

export default Integration