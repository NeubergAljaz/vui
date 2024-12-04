import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeProfile from "./components/EmployeeProfile";

function App() {
  return (
    <UserProvider>
      <Router>
          <div className="App">
            <Routes>
            <Route path="/" element={<LoginForm/>}/>
              <Route path="/register" element={<RegisterForm/>}/>
              <Route path="/login" element={<LoginForm/>}/>
              <Route path="/employees" element={<EmployeeList/>}/>
                <Route path="/profile" element={<EmployeeProfile/>}/>
            </Routes>
          </div>
      </Router>
    </UserProvider>
  );
}

export default App;
