import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { users } = useUser();
  const { loggedUser, setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.email || !formData.password) {
      alert('Please enter email and password.');
      return;
    }

    // Check if the user exists
    const loggedUser = users.find((user) => user.email === formData.email && user.password === formData.password);

    if (loggedUser) {
      setUser(loggedUser);
      navigate('/employees');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
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
            Login
          </Button>

          <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
            Don't have an account? <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={redirectToRegister}>Register here</span>.
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
