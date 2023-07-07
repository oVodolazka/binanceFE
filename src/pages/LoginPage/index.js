import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import api from '../../api';
import { UserContext } from '../../components/AuthFilter';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../components/User/userSlice';

const LoginPage = () => {
    const google = () => window.open('http://localhost:3001/auth/google', '_self');
    const dispatch = useDispatch()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = async (data) => {
        try {
            const user = await api.post('/users/login', { email: data.email, password: data.password })
            window.localStorage.setItem('access_token', user.data.token)
            dispatch(setAccessToken(user.data.token))
        } catch (e) {
            console.log(e)
        }
    }
    const navigate = useNavigate();

    const handleClickIntegration = () => {
        navigate('/registration');
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <UserContext.Provider value={1} />
            <Grid item xs={6} component={Paper} elevation={6} square sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: '25px',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Box width="90%">
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                            Sign in
                        </Typography>
                        <Grid >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <p>Don&apos;t have an account?&nbsp;&nbsp;</p>
                                <Link href="#" variant="body2" onClick={handleClickIntegration} >
                                    Sign Up
                                </Link>
                            </Box>
                        </Grid>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => {
                                    return (<TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
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
                                        autoComplete="current-password"
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
                                Sign In
                            </Button>
                        </form>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Button onClick={google}>Sign in with Google</Button>
                        </Grid>
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