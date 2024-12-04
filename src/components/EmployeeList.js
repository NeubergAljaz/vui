import React, { useState } from 'react';
import { useUser } from './UserContext';
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Box, Link} from '@mui/material';
import AddEmployeeModal from './addEmployee';
import EditEmployee from './EditEmployee';
import Papa from 'papaparse';
import NavigationBar from './navigationbar';
import {useNavigate} from 'react-router-dom';
import EditEmployeeContact from "./EditEmployeeContact"


const EmployeeList = () => {
  let { users, setUsers, loggedUser } = useUser();

  const [isAddEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
  const [isEditEmployeeContactModalOpen, setEditEmployeeContactInfoModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const onEditContactInfo = (index) => {
    setSelectedUser(users[index]);
    setEditEmployeeContactInfoModalOpen(true);
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const searchValue = searchQuery.toLowerCase();
    return fullName.includes(searchValue);
  });

  const onAddEmployee = (employeeData) => {
    console.log('Implement adding functionality', employeeData);
  };

  const navigate = useNavigate();
  const redirectEmployeeProfile = () => {
    navigate('/profile');
  }

  const exportToCSV = () => {
    const csvData = Papa.unparse(users, {
      header: true,
    });

    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'employee_list.csv';
    link.click();
  };


  const onEdit = (index) => {
    setSelectedUser(users[index]);
    setEditEmployeeModalOpen(true);
  };

  const onArchive = (index) => {
    setSelectedUser(users[index]);
    users[index].archived = !users[index].archived;
    setUsers(users);
  };

  const onDelete = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };


  const handleEdit = (editedUser) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => (user.email === editedUser.email ? editedUser : user));
    });
    setEditEmployeeModalOpen(false);
  };

  const handleHoursChange = (index, hours) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index].hours = hours;
      return updatedUsers;
    });
  };

  const handleActivityChange = (index, isPresent) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index].isPresent = isPresent;
      return updatedUsers;
    });
  };

  const calculateDaysToEnd = (user) => {
    const today = new Date();
    const endContractDate = new Date(user.endDate);
  
    if (user.admin) {
      return ''; 
    }
  
    if (today > endContractDate) {
      const diffTime = today.getTime() - endContractDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Contract expired ${diffDays} days ago`;
    } else {
      const daysToEnd = Math.ceil((endContractDate - today) / (1000 * 60 * 60 * 24));
      return `Days left: ${daysToEnd}`;
    }
  };
  return (
    <div>
      <NavigationBar/>
      {loggedUser.admin && (
        <div>
          <Button variant="contained" color="success" style={{ margin: '50px' }} onClick={() => setAddEmployeeModalOpen(true)}>
            Add Employee
          </Button>

          <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={exportToCSV}>
          Export to CSV
          </Button>

        </div>
      )}

      <TextField
        label="Search by name or surname"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px', width: "400px" }}
      />
      <hr/>
      <Button variant="contained" color="success" style={{ margin: '50px' }}
              onClick={redirectEmployeeProfile}>
        View my profile
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>
                {user.archived ? (
                  user.hours
                ) : 
                  <TextField
                  type="number"
                  value={user.hours || ''}
                  onChange={(e) => handleHoursChange(index, Math.max(0, e.target.value))}
                  style={{ width: '80px' }}
                  inputProps={{ min: 0 }}
                  />
                }
              </TableCell>


              {user.archived ? (
                  <TableCell>Employee archived</TableCell>
                ) : 
                  <TableCell>
                    {user.isPresent ? (
                      <span style={{ color: 'green' }}>✔</span>
                    ) : (
                      <span style={{ color: 'red' }}>❌</span>
                    )}
                    <Button
                      onClick={() => handleActivityChange(index, !user.isPresent)}
                      variant="outlined"
                      style={{ marginLeft: '8px' }}
                    >
                      {user.isPresent ? 'Označi neprisoten' : 'Označi prisoten'}
                    </Button>
                  </TableCell>
              }
              
              {loggedUser.admin && (
               
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(index)} style={{ marginRight: '10px' }}>
                  Edit
                </Button>
                <Button variant="contained" className='admin_edit' color="error" onClick={() => onDelete(index)} style={{ marginRight: '10px' }}>
                  Delete
                </Button>
                <Button variant="contained" color="secondary" onClick={() => onArchive(index)}>
                  Archive
                </Button>
                {calculateDaysToEnd(user)}
              </TableCell>

              )}

              {!loggedUser.admin && !user.archived &&(
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => onEditContactInfo(index)} style={{marginRight: '10px' }}>
                      Edit contact info
                    </Button>
                  </TableCell>
              )}
              {user.archived &&(
                  <TableCell>
                  </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddEmployeeModal
        open={isAddEmployeeModalOpen}
        onClose={() => setAddEmployeeModalOpen(false)}
        onAddEmployee={onAddEmployee}
      />

      <EditEmployee
        open={isEditEmployeeModalOpen}
        onClose={() => setEditEmployeeModalOpen(false)}
        setUsers={setUsers}
        userData={selectedUser}
        onEdit={handleEdit}
      />


      <EditEmployeeContact
          open={isEditEmployeeContactModalOpen}
          onClose={() => setEditEmployeeContactInfoModalOpen(false)}
          setUsers={setUsers}
          userData={selectedUser}
          onEditContactInfo={handleEdit}/>
    </div>
  );
};

export default EmployeeList;