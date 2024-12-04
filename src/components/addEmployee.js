import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import { useUser } from './UserContext';

const AddEmployeeModal = ({ open, onClose, onAddEmployee }) => {
  const { addUser } = useUser();
  const [employeeData, setEmployeeData] = useState({ firstName: '', lastName: '', email: '', department: '' });

  function handleAddEmployee () {
    const employee = { ...employeeData }; 
    console.log('Employee being added:', employee);
    addUser(employee); 
    onClose();
  };

  function log () {
   
    console.log('Employee being added:');
    
  };

console.log('Employee being added:');
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, background: 'white', padding: 20 }}>
        <h2>Add Employee</h2>
        <TextField
          label="First Name"
          value={employeeData.firstName}
          onChange={(e) => setEmployeeData({ ...employeeData, firstName: e.target.value })}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={employeeData.lastName}
          onChange={(e) => setEmployeeData({ ...employeeData, lastName: e.target.value })}
          fullWidth
        />
        <TextField
          label="Email"
          value={employeeData.email}
          onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Department"
          value={employeeData.department}
          onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
          fullWidth
        />

        <Button variant="contained" color="success" onClick={handleAddEmployee} style={{ marginTop: 10 }}>
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default AddEmployeeModal;