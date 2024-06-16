import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import UserEdit from './components/UserEdit';
import UserDelete from './components/UserDelete';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://664fc9c7ec9b4a4a602fd685.mockapi.io/Users');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await fetch('https://664fc9c7ec9b4a4a602fd685.mockapi.io/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedUser = await response.json();
      setUsers([...users, addedUser]);
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };

  const updateUser = async (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://664fc9c7ec9b4a4a602fd685.mockapi.io/Users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <h1 className="heading">Lista de Usuarios</h1>
        <UserForm addUser={addUser} />
        <UserList users={users} />
      </div>
      <Routes>
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/edit/:id" element={<UserEdit updateUser={updateUser} />} />
        <Route path="/delete/:id" element={<UserDelete deleteUser={deleteUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
