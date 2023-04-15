import React from 'react';
import { useLocalStorage } from '../hooks/UseLocalStorage';
import { Link } from 'react-router-dom';
import '../App.css';

export const Users = () => {
  const [users] = useLocalStorage('users', []);

  const sortByMonth = (a, b) => {
    const monthA = new Date(a.dob).getMonth();
    const monthB = new Date(b.dob).getMonth();
    if (monthA < monthB) {
      return -1;
    }
    if (monthA > monthB) {
      return 1;
    }
    return 0;
  };

  const sortedUsers = [...users].sort(sortByMonth);

  return (
    <div className='users-container'>
      <div className='title'>
        <h1>List of Current Users</h1>
      </div>
      <div className='user-list'>
        {sortedUsers.length > 0 ? (
          <ul>
            {sortedUsers.map((user) => (
              <li key={user.id}>
                <div className='user-info'>
                  <div className='name'>{user.name}</div>
                  <div className='dob'>{user.dob}</div>
                </div>
                <div className='edit'>
                  <Link to={`/edituser/${user.id}`}>
                    <i className='fa fa-pencil'></i>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='no-users'>No users found.</div>
        )}
      </div>
      <div className='add-user'>
        <Link to='/adduser'>
          <button className='general-btn'>Add User</button>
        </Link>
      </div>
    </div>
  );
};
