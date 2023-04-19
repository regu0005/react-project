import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mdiGift } from '@mdi/js';
import { mdiPencil } from '@mdi/js';

import '../App.css';

export const Users = () => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/api/people');
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  const formatDob = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

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

  const sortedUsersMain = users.data ? [...users.data].sort(sortByMonth) : [];

  const sortedUsers = sortedUsersMain.map((user) => ({
    ...user,
    dob: formatDob(user.dob),
  }));

  return (
    <div className='users-container'>
      <div className='title'>
        <h1>List of Current Users</h1>
      </div>
      <div className='user-list'>
        {sortedUsers.length > 0 ? (
          <div className='user-grid'>
            <div className='user-grid-item header'>Name</div>
            <div className='user-grid-item header'>Gifts</div>
            <div className='user-grid-item header'>Edit</div>
            {sortedUsers.map((user) => (
              <React.Fragment key={user._id}>
                <div className='user-grid-item'>
                  <div className='name'>
                  {user.name}
                  </div>
                  <div className='dob'>
                  {user.dob}
                  </div>
                </div>
                <div className='user-grid-item'>
                  <Link to={`/edituser/${user._id}`}>
                    <svg className="gift-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d={mdiGift} />
                    </svg>
                  </Link>
                </div>
                <div className='user-grid-item'>
                  <Link to={`/edituser/${user._id}`}>
                    <svg className="edit-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d={mdiPencil} />
                    </svg>
                  </Link>
                </div>
              </React.Fragment>
            ))}
          </div>
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