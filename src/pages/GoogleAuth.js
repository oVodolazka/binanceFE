import React, { useEffect } from 'react'
import  { UserContext } from '../components/AuthProvider';

const Test = () => {
    const userContext = React.useContext(UserContext)
    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:3001/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) return response.json();
                    throw new Error("authentication has been failed!");
                })
                .then((resObject) => {
                    window.localStorage.setItem('access_token', resObject.token)
                    userContext.setAccesToken(resObject.token)
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, []);
}

export default Test;