import React, { useEffect, useState, createContext, useContext } from 'react';
import api from '../api';
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccesToken] = useState('')
    const getMe = async () => {
        const data = await api.get('/users/me')
        setUser(data.data.user)
    }
    useEffect(() => {
        if (accessToken) {
            getMe()
        }
    }, [accessToken])
    return (
        <UserContext.Provider value={{ user, setAccesToken }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const { user } = useContext(UserContext);
    return user
}

export default AuthProvider