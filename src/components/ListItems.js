import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import HistoryIcon from '@mui/icons-material/History';

export const MainListItems = () => {
  const navigate = useNavigate();

  return <>
    <ListItemButton onClick={() => navigate('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={() => navigate('/integration')}>
      <ListItemIcon>
        <ShareIcon />
      </ListItemIcon>
      <ListItemText primary="Integration" />
    </ListItemButton>
    <ListItemButton onClick={() => navigate('/deposit')} >
      <ListItemIcon>
        <CardTravelIcon />
      </ListItemIcon>
      <ListItemText primary="Deposit Page" />
    </ListItemButton>
    <ListItemButton onClick={() => navigate('/depositHistory')} >
      <ListItemIcon>
       <HistoryIcon/>
      </ListItemIcon>
      <ListItemText primary="Deposit History" />
    </ListItemButton>
  </>
};

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
    </ListSubheader>
  </>
);