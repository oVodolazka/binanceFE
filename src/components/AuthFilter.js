import { Box } from '@mui/material';
import { useEffect, useState, createContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, removeUser, updateUser } from './User/userSlice';

export const UserContext = createContext();

export const CircularIndeterminate = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('access_token')
    const [accessToken, setAccesToken] = useState(token)
    const user = useSelector((state) => state.user.data);
    const loading = useSelector((state) => state.user.loading);
    const dispatch = useDispatch()

    const setAvatar = (avatar) => {
        console.log(avatar, 'auth')
        dispatch(updateUser({ ...user, avatar }))
    }

    const logout = () => {
        setAccesToken('')
        dispatch(removeUser(null));
        window.localStorage.removeItem('access_token');
    }

    useEffect(() => {
        if (accessToken && !user) {
            dispatch(getUser());
        } 
    }, [accessToken])

    useEffect(() => {
        dispatch(getUser());
    }, []);

    if (loading) {
        return (
            <Box sx={{ fontSize: '35px', display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
                <CircularIndeterminate />
            </Box>
        )
    }
    return (
        <UserContext.Provider value={{ setAccesToken, logout, setAvatar }}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider