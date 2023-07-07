import { Box } from '@mui/material';
import { useEffect, createContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setAccessToken, setLoading } from './User/userSlice';

export const UserContext = createContext();

export const CircularIndeterminate = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

const AuthFilter = ({ children }) => {
    const token = localStorage.getItem('access_token')
    const user = useSelector((state) => state.user.data);
    const loading = useSelector((state) => state.user.loading);
    const accessToken = useSelector((state) => state.user.accessToken) || token;
    const dispatch = useDispatch()

    useEffect(() => {
        if (accessToken && !user) {
            dispatch(getUser());
        } else {
            dispatch(setLoading(false))
        }
    }, [accessToken])

    useEffect(() => {
        dispatch(setAccessToken(token))
    }, [token]);

    if (loading) {
        return (
            <Box sx={{ fontSize: '35px', display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
                <CircularIndeterminate />
            </Box>
        )
    }
    return children
}

export default AuthFilter