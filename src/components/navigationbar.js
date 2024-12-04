import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

export default function  NavigationBar() {

  let { users, setUsers, loggedUser } = useUser();
    const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
         
        </Typography>
        <div>
          <IconButton
            onClick={handleMenu}
            color="inherit"
            edge="end"
          >
           ℹ️
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body1">{loggedUser.firstName} {loggedUser.lastName}</Typography>
                <Typography variant="body2" color="textSecondary">{loggedUser.email}</Typography>
                <Typography variant="body2" color="textSecondary">{loggedUser.department}</Typography>
                <Button onClick={handleLogout} sx={{color:"red", mt:5}}>Logout</Button>
              </CardContent>
            </Card>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

