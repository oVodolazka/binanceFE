import { Box } from '@mui/material';
import React, { useState } from 'react';
import api from '../../api';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../components/User/userSlice';

const Profile = () => {
    const user = useSelector((state) => state.user.data)
    const firstLetter = user.name.charAt(0).toUpperCase();
    const [uploadProgress, setUploadProgress] = useState('');
    const [processing, setProcessing] = useState(false)
    const dispatch = useDispatch()
    const setAvatar = (avatar) => {
        dispatch(setUser({ ...user, avatar }))
    }
    const remove = async () => {
        await api.delete(`/user-avatar?email=${user.email}&id=${user._id}`);
        setAvatar('')
    };

    const loadFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const data = new FormData();
            data.append('file', file);
            data.append('email', user.email);
            data.append('id', user._id);

            const config = {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(progress);
                    if (progress == 100) {
                        setProcessing(true)
                    }
                },
            };

            try {
                const response = await api.put('/user-avatar', data, config);
                setAvatar(response.data.url);
                setProcessing(false)
                setUploadProgress(false)
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <Box sx={{ paddingTop: '94px', paddingLeft: '30px', paddingRight: '30px', backgroundColor: '#9c9e9d47', height: '100%' }}>
            <Box sx={{ backgroundColor: '#ffffff', borderRadius: '10px', height: '600px', padding: '50px', display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '30%', padding: '30px', borderRadius: '10px' }}>
                    <Box sx={{ fontSize: '20px', lineHeight: '60px' }}>Welcome {user.name}!</Box>
                    <Box sx={{ lineHeight: '60px' }}> Email: {user.email} </Box>
                </Box>
                <Box>
                    <Box>
                        <div className="profile-pic">
                            <label className="-label" htmlFor="file" style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                                <span> Edit </span>
                                <span><button onClick={remove}>&#10005;</button></span>
                            </label>
                            <input id="file" type="file" onChange={loadFile} />
                            {!user.avatar &&
                                <Box style={{ width: '165px', height: '165px', borderRadius: '50%', backgroundColor: '#fcc203', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '45px', position: 'absolute' }}>
                                    {firstLetter}
                                </Box>
                            }
                            {user.avatar &&
                                <img style={{ maxWidth: '165px', width: '165px', borderRadius: '50%', objectFit: 'cover', position: 'absolute' }} src={user.avatar} alt="User Avatar" />
                            }
                        </div>
                        {uploadProgress > 0 && <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ marginTop: '25px' }} variant="determinate" value={uploadProgress} />
                            <Box sx={{ fontSize: '13px' }}> Upload </Box>
                        </Box>}
                        {processing && <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ marginTop: '25px' }} />
                            <Box sx={{ fontSize: '13px' }}> Proccessing Photo... </Box>
                        </Box>}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;