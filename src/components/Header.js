import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { UserContext } from './AuthProvider';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
    const { logout, user } = useContext(UserContext)
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
                        <Avatar sx={{ bgcolor: '#fcc203' }}>{firstLetter}</Avatar>
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }

    return (
        <AppBar position="absolute" open={open} sx={{
            backgroundColor: '#a2b6df',
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