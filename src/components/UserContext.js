import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { firstName: 'Admin', lastName: 'Account', email: 'admin@example.com', department:"Developer", admin: true, archived: false, hours: 100, password: 'admin', country: 'Slovenia', city: 'Maribor', address: 'Smešna ulica 3', endDate:'2900-01-01' },
    { firstName: 'Jack', lastName: 'Black', email: 'jack.black@example.com', department:"Developer", admin: false, archived: false, hours: 33, password: 'password', country: 'Slovenia', city: 'Slovenska Bistrica', address: 'Jezna ulica 12',endDate:'2023-01-01'  },
    { firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', department:"Developer", admin: false, archived: true, hours: 18, password: 'password' , country: 'Slovenia', city: 'Slovenske Konjice', address: 'Enpleška ulica 3',endDate:'2024-01-01' },
    { firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', department:"Accountant", admin: false, archived: false, hours: 47, password: 'password', country: 'Slovenia', city: 'Omrož', address: 'Dupleška ulica 6' ,endDate: '2025-01-01'},
  ]);

  const [loggedUser, setUser] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser, setUsers, loggedUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
