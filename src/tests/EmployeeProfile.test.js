import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../components/UserContext';
import EmployeeList from '../components/EmployeeList';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('EmployeeList', () => {
    const mockAddUser = jest.fn(); // Mock the addUser function
    const mockNavigate = jest.fn(); // Mock the navigate function

    const renderWithContext = (loggedUser) => {
        return render(
            <Router>
                <UserProvider value={{ users: [], addUser: mockAddUser, loggedUser }}>
                    <EmployeeList />
                </UserProvider>
            </Router>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock calls before each test
    });

    test('register stran se pravilno zrenderira', () => {
        const loggedUser = { 
            firstName: 'Admin', 
            lastName: 'Account', 
            email: 'admin@example.com', 
            department: 'Developer', 
            admin: true, 
            archived: false, 
            hours: 100 
        };

        renderWithContext(loggedUser);

        expect(screen.getByRole('button', { name: /View my profile/i })).toBeInTheDocument();
    });

    test('preusmeri na profil ob kliku na "View my profile"', () => {
        const navigate = jest.fn(); // Mock the navigate function
    useNavigate.mockReturnValue(navigate); // Set up the mock
        const loggedUser = { 
            firstName: 'Admin', 
            lastName: 'Account', 
            email: 'admin@example.com', 
            department: 'Developer', 
            admin: true, 
            archived: false, 
            hours: 100 
        };

        renderWithContext(loggedUser);

        fireEvent.click(screen.getByRole('button', { name: /View my profile/i }));

        expect(navigate).toHaveBeenCalledWith('/profile');

        expect(screen.getByText(/Admin/)).toBeInTheDocument();
        expect(screen.getByText(/admin@example.com/)).toBeInTheDocument();
        
    });
});