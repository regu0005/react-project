import React from 'react';
import { useToken } from '../context/TokenContext';
import '../App.css';

export const NavBar = () => {
  const [token] = useToken();

  return (
    <nav className='navbar'>
      <ul>
        {token && <li><a href="/users">Users</a></li>}
        {!token && <li><a href="/login">Login</a></li>}
        {token && <li><a href="/logout">Logout</a></li>}
      </ul>
    </nav>
  );
};
