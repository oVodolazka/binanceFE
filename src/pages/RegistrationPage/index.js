import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from "react-hook-form";
import api from '../../api';
import { UserContext } from '../../components/AuthProvider';

const LoginPage = () => {
    const userContext = React.useContext(UserContext)
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {
        try {
            const user = await api.post('/users/register', { name: data.name, email: data.email, password: data.password, confirmPassword: data.confirmPassword })
            window.localStorage.setItem('access_token', user.data.token)
            userContext.setAccesToken(user.data.token)
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={6} component={Paper} elevation={6} square sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: '40px',
                        justifyContent: 'flex-end',
                        alignItems: 'end',
                    }}
                >
                    <Box width="50%">
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                            Sign up
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => {
                                    return (<TextField
                                        {...field}
                                        autoFocus
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                    />)
                                }}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => {
                                    return (<TextField
                                        {...field}
                                        autoFocus
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />)
                                }}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => {
                                    return (<TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="password"
                                    />)
                                }}
                            />
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field, fieldState }) => {
                                    const errorMessage = fieldState.error && fieldState.error.message
                                    return (<TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirm-password"
                                        label="Confirm password"
                                        type="password"
                                        id="confirm-password"
                                        autoComplete="password"
                                        error={!!errorMessage}
                                        helperText={errorMessage}
                                    />)
                                }}
                                rules={{
                                    validate: (value) => {
                                        const isValid = value === watch(password).password;
                                        return isValid || 'Passwords not match'
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3, mb: 2, backgroundColor: '#fcc203',
                                    fontSize: '15px',
                                    '&:hover': {
                                        backgroundColor: '#d69605'
                                    }
                                }}
                            >
                                Register
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={6}
                sx={{
                    background: '#5CDB95',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    paddingLeft: '80px'
                }}
            >
                <Grid sx={{ fontSize: '45px', fontWeight: 'bold', color: '#FFFFFF' }}>
                    <p>Welcome to <br /> our community!</p>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LoginPage