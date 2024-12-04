import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditEmployeeContact = ({ open, onClose, setUsers, userData }) => {
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
                    label="Country"
                    name="country"
                    value={editedUser.country || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="City"
                    name="city"
                    value={editedUser.city || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    name="address"
                    value={editedUser.address || ''}
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

export default EditEmployeeContact;