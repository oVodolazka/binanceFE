import { Box } from '@mui/material';
import { useEffect, useState, createContext, useContext } from 'react';
import api from '../api';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [load, setLoad] = useState(false)

    const getMe = async () => {
        try {
            setLoad(true);
            const data = await api.get('/users/me');
            setUser(data.data.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false);
        }
    }

    const logout = () => {
        setAccesToken('')
        setUser(null)
        window.localStorage.removeItem('access_token');
    }

    useEffect(() => {
        if (accessToken) {
            getMe()
        }
    }, [accessToken])

    return (
        <>
            {load ? (
                <Box sx={{ fontSize: '35px', display: 'flex', alignItems: 'center', height: '100vh' , justifyContent: 'center'}}>
                   <CircularIndeterminate/>
                </Box>
            ) : (
                <UserContext.Provider value={{ user, setAccesToken, setUser, logout }}>
                    {children}
                </UserContext.Provider>
            )}
        </>
    )
}

export const useUser = () => {
    const { user } = useContext(UserContext);
    return user
}

export default AuthProvider