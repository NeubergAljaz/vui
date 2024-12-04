import * as React from 'react';
import Paper from '@mui/material/Card';
import Avatar from '@mui/material/Avatar'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from './UserContext';

export default function EmployeeProfile() {
    let { loggedUser } = useUser();

    const avatarStyle = {
        width: '100px',
        height: '100px',
        display: 'inline-flex',
        marginBottom: '10px',
    };
    return (
        <Paper>
                <Avatar style={avatarStyle}   alt="User" src="/static/images/avatar/1.jpg" />
                <Typography gutterBottom variant="h5" component="div">
                    First Name: {loggedUser.firstName}
            </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Last Name:  {loggedUser.lastName}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Email:  {loggedUser.email}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Department:  {loggedUser.department}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Admin: {loggedUser.admin}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Archived:  {loggedUser.archived}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Hours:  {loggedUser.hours}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    End of contract:  {loggedUser.endDate}
                </Typography>

        </Paper>
    );
}