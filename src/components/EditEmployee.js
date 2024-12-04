import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditEmployee = ({ open, onClose, setUsers, userData }) => {
  const [editedUser, setEditedUser] = useState(userData || {});

  useEffect(() => {
    setEditedUser(userData || {});
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEdit = () => {
    if (userData) {
      setUsers((prevUsers) => {
        return prevUsers.map((user) => (user.email === editedUser.email ? editedUser : user));
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          value={editedUser.firstName || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={editedUser.lastName || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={editedUser.email || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Department"
          name="department"
          value={editedUser.department || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
            label="Hours"
            type="number"
            name="hours"
            value={editedUser.hours || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleEdit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployee;
