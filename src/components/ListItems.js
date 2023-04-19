import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import CardTravelIcon from '@mui/icons-material/CardTravel';

export const MainListItems = () => {
  const navigate = useNavigate();

  const goToIntegration = () => {
    navigate('/integration');
  }
  const goToDashboard = () => {
    navigate('/dashboard');
  }
  const goToDepositPage = () => {
    navigate('/depositpage')
  }
  return <>
    <ListItemButton onClick={goToDashboard}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={goToIntegration}>
      <ListItemIcon>
        <ShareIcon />
      </ListItemIcon>
      <ListItemText primary="Integration" />
    </ListItemButton>
    <ListItemButton onClick={goToDepositPage} >
      <ListItemIcon>
        <CardTravelIcon />
      </ListItemIcon>
      <ListItemText primary="Deposit Page"/>
    </ListItemButton>
  </>
};

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
    </ListSubheader>
  </>
);