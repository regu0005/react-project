import React from 'react'
import '../App.css';

export const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  )
}
