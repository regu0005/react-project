// import React from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import '../App.css';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
// import { useToken } from '../context/TokenContext';


export const Login = () => {


    // const navigate = useNavigate();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     navigate('/Home');
    // }

    // const navigate = useNavigate();
    // const [searchParams, setSearchParams] = useSearchParams();
    // const [token, setToken] = useToken();

    // useEffect(() => {
    //     //check for token in querystring
    //     const urlToken = searchParams.get('token');
    //     console.log(urlToken);
    //     if (urlToken) {
    //     setToken(urlToken);
    //     navigate('/people');
    //     }
    //     //check if token already exists in context
    //     if (token) {
    //     navigate('/people');
    //     }
    // }, []);

    function doLogin() {
        //user clicked the login button
        // const redirect = `http://localhost:5174/`;
        // const baseURL = `https://render.xyz/api/auth/google?redirect_url=${redirect}`;
        // //location.href = baseURL;
        // alert('We are pretending to go to ' + baseURL);
        // alert('Google will send us back to ' + redirect);
        // location.href = redirect + '?token=' + crypto.randomUUID();

        // navigate('/Home');
    }
    
    return (
        <>
        <div className='content-wrap'>
            <div className="login-form">
            <h1>Login</h1>
            <p>Google Authentication required</p>
            
                <button onClick={doLogin} id="login-btn">Login</button>
            
            </div>
        </div>
        </>
    )
}
