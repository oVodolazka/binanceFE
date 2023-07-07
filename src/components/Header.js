import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAccessToken } from './User/userSlice';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(setAccessToken(''))
        dispatch(setUser(null));
        window.localStorage.removeItem('access_token');
    }
    const user = useSelector((state) => state.user.data)
    const PositionedMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const firstLetter = user.name.charAt(0)
        return (
            <div>
                <Button onClick={handleClick}>
                    <Stack direction="row" spacing={2}>
                        {!user.avatar && <Avatar sx={{ bgcolor: '#fcc203' }}>{firstLetter}</Avatar>}
                        {user.avatar && <img style={{ maxWidth: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} src={user.avatar}></img>}
                    </Stack>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <MenuItem sx={{ height: '50px', width: '180px' }} onClick={() => navigate('/profile')}>Profile</MenuItem>
                    <MenuItem sx={{ height: '50px', width: '180px' }} onClick={handleClose}>My account</MenuItem>
                    <MenuItem sx={{ height: '50px', width: '180px' }} onClick={logout}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }

    return (
        <AppBar position="absolute" open={open} sx={{
            backgroundColor: '#5CDB95',
            margin: '0',
            width: '100%',
            zIndex: '2',
            positin: ''
        }}>
            <Toolbar
                id='3'
                sx={{
                    pr: '24px',
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{
                        flexGrow: 1,
                    }}
                >
                </Typography>
                <div color="inherit">
                    <PositionedMenu />
                </div>
            </Toolbar>
        </AppBar>
    )
}