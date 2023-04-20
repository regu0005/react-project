import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useToken } from '../context/TokenContext';

export function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useToken();

  useEffect(() => {
    //check for token in querystring
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        sessionStorage.setItem('token', token);
        setToken(token);
        window.location.href = '/users';
    }
    else{
        // Check if it exist in local storage
        const savedToken = sessionStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            window.location.href = '/users';
        }
    }

  }, [setToken]);

  function handleLoginClick() {
   const redirect = 'http://localhost:5176/login/';
    const baseURL = `https://aisb001-giftr.onrender.com/auth/google/?redirect_url=${redirect}`
    location.href = baseURL;
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="login-message">Please login to access</p>
      <button className="general-btn" onClick={handleLoginClick}>Login</button>
    </div>
  );
}