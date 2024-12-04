import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../components/UserContext';
import EmployeeList from '../components/EmployeeList';

describe('EmployeeListSearch', () => {
  const mockUsers = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'HR',
      hours: 40,
      isPresent: true,
      archived: false
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      department: 'Finance',
      hours: 30,
      isPresent: false,
      archived: false
    }
  ];

  const renderWithContext = () => {
    return render(
      <Router>
        <UserProvider value={{ users: mockUsers, loggedUser: { admin: true } }}>
          <EmployeeList />
        </UserProvider>
      </Router>
    );
  };

  test('tabela je prazna, ko ni najdenih uporabnikov po imenu in priimku ', () => {
    renderWithContext();

    // Vnesemo iskalni niz, ki ne obstaja
    fireEvent.change(screen.getByLabelText(/Search by name or surname/i), {
      target: { value: 'NonExistingUser' }
    });

    // Preverimo, da v tabeli ni prikazanih uporabnikov
    expect(screen.queryByText(/John/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Doe/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Jane/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Smith/)).not.toBeInTheDocument();
  });

  test('Filtriranje in prikaz zaposlenega glede na iskanje po imenu:', () => {
    renderWithContext();

    // Vnesemo iskalni niz "John"
    fireEvent.change(screen.getByLabelText(/Search by name or surname/i), {
      target: { value: 'John' }
    });

    // Preverimo, ali je v tabeli prikazan uporabnik John Doe
    expect(screen.getByText(/John/)).toBeInTheDocument();
   


    // Preverimo, da uporabnik Jane Smith ni viden
    expect(screen.queryByText(/Jane/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Smith/)).not.toBeInTheDocument();
  });



});
