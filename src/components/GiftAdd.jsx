import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { mdiGift } from '@mdi/js';
import { mdiPencil } from '@mdi/js';
import Swal from 'sweetalert2';
import { useToken } from '../context/TokenContext';

import '../App.css';

export const GiftAdd = () => {
  const [token] = useToken();
  const { id } = useParams();
  const [gift, setGift] = useState('');
  const [store, setStore] = useState('');
  const [website, setWebsite] = useState('');
   
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!gift) {
          const { value: confirmAdd } = await Swal.fire({
              title: 'Add Gift',
              text: 'Please insert Gift name',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Continue',
            });
          
            if (confirmAdd) {
              return;
            }
      }
      
      if (!store) {
          const { value: confirmAdd } = await Swal.fire({
              title: 'Add Gift',
              text: 'Please insert Store',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Continue',
            });
          
            if (confirmAdd) {
              return;
            }
      }
      if (!website) {
        const { value: confirmAdd } = await Swal.fire({
            title: 'Add Gift',
            text: 'Please insert Website URL',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Continue',
          });
        
          if (confirmAdd) {
            return;
          }
      }

            try {
              
              const response = await fetch(`https://aisb001-giftr.onrender.com/api/people/${id}/gift`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                  txt:    gift,
                  store:  store,
                  url:    website,
                }),
              });
              
              console.log("TXT saved: ", gift);
              console.log("STORE saved: ", store);
              console.log("WEBSITE saved: ", website);

              if (!response.ok) {
                  throw new Error("Failed to save gift.");
              }
              
              window.location.href = `/${id}/gift`;
            
          } catch (error) {
            console.error(error);
            alert("Failed to save gift. Please try again.");
          }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'gift') {
        setGift(value);
      } else if (name === 'store') {
        setStore(value);
      } else if (name === 'website') {
        setWebsite(value);
      }
    };

    const handleCancel = (event) => {
      event.preventDefault();
      window.location.href = `/${id}/gift`;
    };

  return (
    <>
      <h1>Add Gift</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name" className="form-label">Gift Idea</label>
            <input
                className="form-input"
                type="text"
                id="gift"
                name="gift"
                value={gift}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="name" className="form-label">Store / Location</label>
            <input
                className="form-input"
                type="text"
                id="store"
                name="store"
                value={store}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="name" className="form-label">Website URL</label>
            <input
                className="form-input"
                type="text"
                id="website"
                name="website"
                value={website}
                onChange={handleInputChange}
            />
        </div>
        <button type="submit" className='general-btn'>Save</button>
        <button className='general-btn' onClick={handleCancel} >Cancel</button>
      </form>
    </>
  );
};