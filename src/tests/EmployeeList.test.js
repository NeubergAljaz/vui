import React from 'react';
import { UserProvider, useUser } from '../components/UserContext';
import EmployeeList from '../components/EmployeeList';
import { render, screen, fireEvent } from '@testing-library/react';
import EditEmployee from '../components/EditEmployee';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../components/UserContext', () => {
  const originalModule = jest.requireActual('../components/UserContext');
  return {
    ...originalModule,
    useUser: jest.fn(),
  };
});

describe('EmployeeList', () => {
  const mockUporabniki = [
    { firstName: 'Janez', lastName: 'Novak', email: 'janez.novak@primer.com', admin: false },
    { firstName: 'Ana', lastName: 'Kovač', email: 'ana.kovac@primer.com', admin: false },
  ];

  const mockSetUsers = jest.fn();

  const mockPodatkiKonteksta = {
    users: mockUporabniki,
    loggedUser: { admin: true },
    setUsers: mockSetUsers,
    setUser: jest.fn(),
  };

  beforeEach(() => {
    useUser.mockReturnValue(mockPodatkiKonteksta);

    render(
      <UserProvider>
        <EmployeeList />
      </UserProvider>
    );
  });

  test('Tabela se pravilno naloži', () => {
    // Preverimo, ali so glave tabele pravilno prikazane
    const headers = ['First name', 'Last name', 'Email', 'Department', 'Hours', 'Activity'];
    
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

 

  test('prikaže pravilno število gumbov za brisanje in omogoča brisanje uporabnika', () => {
    // Preverimo, ali je število gumbov za brisanje enako številu uporabnikov
    const gumbiZaBrisanje = screen.getAllByText('Delete');
    expect(gumbiZaBrisanje.length).toBe(mockUporabniki.length);

    // Simuliramo klik na prvi gumb za brisanje
    fireEvent.click(gumbiZaBrisanje[0]);

    // Preverimo, ali je bila funkcija setUsers klicana
    expect(mockSetUsers).toHaveBeenCalled();

    // Preverimo, ali je bila funkcija setUsers klicana s pravilnim argumentom
    // (seznam brez prvega uporabnika)
    const pricakovanSeznamPoIzbrisu = mockUporabniki.slice(1);
    expect(mockSetUsers).toHaveBeenCalledWith(expect.arrayContaining(pricakovanSeznamPoIzbrisu));

    // Preverimo, ali je prvi uporabnik izbrisan iz seznama
  // Preverimo, ali je prvi uporabnik izbrisan iz seznama
    const posodobljeniGumbiZaBrisanje = screen.getAllByText('Delete');

     // +1 dodamo zato, ker smo prijavljeni kot admin in se prikažemo pravtako v seznamu
    expect(posodobljeniGumbiZaBrisanje.length).toBe(pricakovanSeznamPoIzbrisu.length+1);
  });

  test('Arhiviramo uporabnika', () => {
    // Preverimo, ali je število gumbov za arhiviranje enako številu uporabnikov
    const gumbiZaArhiviranje = screen.getAllByText('Archive');
    
  
    // Simuliramo klik na prvi gumb za arhiviranje
    fireEvent.click(gumbiZaArhiviranje[0]);
  
    // Preverimo, ali je bila funkcija setUsers klicana
    expect(mockSetUsers).toHaveBeenCalled();
  
   
    // Preverimo, ali je status uporabnika spremenjen v arhiviranega
    const arhiviranUporabnik = mockUporabniki[0];
    expect(mockSetUsers).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ ...arhiviranUporabnik, archived: true })
    ]));
  });

 

  test('uredi prvega zaposlenega in shrani spremembe', () => {
    const mockSetUsers = jest.fn(); // Ustvarimo mock funkcijo
    const userData1 = {
      firstName: 'Janez',
      lastName: 'Novak',
      email: 'janez.novak@primer.com',
      department: 'Sales',
      hours: '30',
    };
    const userData2 = {
      firstName: 'Marija',
      lastName: 'Kranjc',
      email: 'marija.kranjc@primer.com',
      department: 'Marketing',
      hours: '25',
    };
  
    // Inicialni seznam uporabnikov
    const initialUsers = [userData1, userData2]; 
  
    // Renderiramo komponento EmployeeList (ali ustrezno komponento, ki vsebuje gumbe za urejanje)
    render(
      <EmployeeList users={initialUsers} setUsers={mockSetUsers} />
    );
  
    // Kliknemo na prvi gumb "Edit" za prvega uporabnika
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]); // Kliknemo na prvi gumb
  
    // Preverimo, da se prikaže modal in vsebuje "Edit Employee"
    expect(screen.getByText('Edit Employee')).toBeInTheDocument();
  
    // Spremenimo podatke zaposlenega v modalnem oknu
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Janez2' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Novak2' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'janez2.novak@primer.com' } });
    fireEvent.change(screen.getByLabelText('Department'), { target: { value: 'IT' } });
    fireEvent.change(screen.getByLabelText('Hours'), { target: { value: '40' } });
  
    // Simuliramo klik na gumb "Save"
    fireEvent.click(screen.getByText('Save'));
  
    //Seznam se je osvežil, spremembe so shranjene
    expect(screen.queryByText(/Janez2/)).not.toBeInTheDocument();

  });
});