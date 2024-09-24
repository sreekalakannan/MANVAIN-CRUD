import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', job: '' });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const createUser = () => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(response => {
        setUsers([response.data, ...users]);
        setNewUser({ name: '', job: '' });
      })
      .catch(error => console.error('Error creating user:', error));
  };

  const updateUser = () => {
    if (!selectedUser) return;
    axios.put(`https://reqres.in/api/users/${selectedUser.id}`, selectedUser)
      .then(response => {
        const updatedUsers = users.map(user =>
          user.id === selectedUser.id ? { ...user, ...response.data } : user
        );
        setUsers(updatedUsers);
        setSelectedUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const deleteUser = (id) => {
    axios.delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="App">
      <h1>Perform crud operation using react js using any API</h1>

      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Job"
        value={newUser.job}
        onChange={(e) => setNewUser({ ...newUser, job: e.target.value })}
      />
      <button onClick={createUser}>Create User</button>

      {selectedUser && (
        <>
          <h2>Update User</h2>
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
          />
          <input
            type="text"
            value={selectedUser.job}
            onChange={(e) => setSelectedUser({ ...selectedUser, job: e.target.value })}
          />
          <button onClick={updateUser}>Update User</button>
        </>
      )}

/////      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.first_name} {user.last_name}</h3>
          <p>Email: {user.email}</p>
          <button onClick={() => setSelectedUser(user)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
