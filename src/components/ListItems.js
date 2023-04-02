import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {
  const navigate = useNavigate();

  const handleClickIntegration = () => {
    navigate('/integration');
  }
  const handleClickDashboard = () => {
    navigate('/dashboard');
  }
  return <>
    <ListItemButton onClick={handleClickDashboard}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={handleClickIntegration}>
      <ListItemIcon>
        <ShareIcon />
      </ListItemIcon>
      <ListItemText primary="Integration" />
    </ListItemButton>
  </>
};

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
    </ListSubheader>
  </>
);