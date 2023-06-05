import { Box } from '@mui/material';
import { useEffect, useState, createContext, useContext } from 'react';
import api from '../api';
import CircularProgress from '@mui/material/CircularProgress';
export const useUser = () => {
    const { user } = useContext(UserContext);
    return user
}
export const UserContext = createContext();

const CircularIndeterminate = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('access_token')
    const [user, setUser] = useState(null)
    const [accessToken, setAccesToken] = useState(token)
    const [loading, setLoading] = useState(true)

    const getMe = async () => {
        try {
            setLoading(true);
            const data = await api.get('/users/me');
            setUser(data.data.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setAccesToken('')
        setUser(null)
        window.open('http://localhost:3001/logout', '_self');
        window.localStorage.removeItem('access_token');
    }

    useEffect(() => {
        if (accessToken && !user) {
            getMe()
        } else {
            setLoading(false)
        }
    }, [accessToken])

    if (loading) {
        return (
            <Box sx={{ fontSize: '35px', display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
                <CircularIndeterminate />
            </Box>
        )
    }
    return (
        <UserContext.Provider value={{ user, setAccesToken, setUser, logout, getMe }}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider