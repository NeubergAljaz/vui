import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { UserProvider } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginForm', () => {
  const mockUsers = [
    { email: 'admin@example.com', password: 'admin' },
  ];

  const renderWithContext = () => {
    return render(
      <Router>
        <UserProvider value={{ users: mockUsers }}>
          <LoginForm />
        </UserProvider>
      </Router>
    );
  };

  test('login stran se pravilno zrenderira', () => {
    renderWithContext();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('Če so polja prazna ob prijavi se prikaže alert:', () => {
    renderWithContext();

    window.alert = jest.fn(); // Mock the alert function

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(window.alert).toHaveBeenCalledWith('Please enter email and password.');
  });

  test('Če podamo napačne podatke ob prijavi, s prikaže alert:', () => {
    renderWithContext();

    window.alert = jest.fn(); // Mock the alert function

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(window.alert).toHaveBeenCalledWith('Invalid email or password. Please try again.');
  });

  test('Ob uspešni prijavi nas preusmeri na url /employees:', () => {
    const navigate = jest.fn(); // Mock the navigate function
    useNavigate.mockReturnValue(navigate); // Set up the mock

    renderWithContext();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'admin@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'admin' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(navigate).toHaveBeenCalledWith('/employees'); 
  });
});
