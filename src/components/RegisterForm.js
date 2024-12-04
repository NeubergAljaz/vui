import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { users, addUser } = useUser();
  const navigate = useNavigate();

  const handleAddUser = (e)  => {
    try {
      e.preventDefault();

      // Validate the form fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        alert('Please fill in all fields.');
        return;
      }

      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        department: "No department set yet",
        password: formData.password,
      };

      addUser(newUser);

      redirectToLogin();
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const redirectToLogin = () => {
    navigate('/login');
  }
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleAddUser}>
          <TextField
            fullWidth
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '20px', marginRight: '10px', fontSize: '18px', backgroundColor: '#007bff' }}
          >
            Register
          </Button>

          <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
            Already have an account? <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={redirectToLogin}>Login here</span>.
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
