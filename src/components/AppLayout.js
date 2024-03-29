import { Header } from './Header'
import Navigation from './Navigation'
import React from 'react'
import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';

export const AppLayout = ({ children }) => {
    const user = useSelector((state) => state.user.data)
    const authenticated = !!user;
    return (
        <Box>
            {authenticated && <Header />}
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {authenticated && <Navigation />}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
