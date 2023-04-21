import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToken } from '../context/TokenContext';
import Swal from 'sweetalert2';
import '../App.css';

export const EditGift = () => {
  const { id, idg } = useParams();
  const [token] = useToken();
  const [mainData, setMainData] = useState(null); 
  const [giftData, setGiftData] = useState(null); 
  const [gift, setGift] = useState('');
  const [store, setStore] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const fetchData = async (token) => {
        try {
            const response = await fetch(`https://aisb001-giftr.onrender.com/api/people/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch users.');
            }
            const data = await response.json();
            setMainData(data);
            const giftById = data.data.gifts.find((gift1) => gift1._id === idg);
            setGiftData(giftById);

            const gift = giftById.txt; 
            const store = giftById.store; 
            const website = giftById.url; 
            setGift(gift);
            setStore(store);
            setWebsite(website);

        } catch (error) {
          console.error(error);
        }
    };

    fetchData(token);

  }, [id, idg, token]);

  if (!giftData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newGift = {
      ...giftData,
      txt: event.target.gift.value,
      store: event.target.store.value,
      url: event.target.website.value,
    };

    try {
      const response = await fetch(
        `https://aisb001-giftr.onrender.com/api/people/${id}/gift/${idg}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newGift),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update gift.');
      }
      setGiftData(newGift);
      Swal.fire({
        title: 'Gift Updated!',
        icon: 'success',
      }).then(() => {
        window.location.href = `/${id}/gift`;
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong while updating the gift.',
        icon: 'error',
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Name: ", [name]);
    console.log("Value: ", value);
    
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

  const handleDelete = async (event) => {
    event.preventDefault();

    const { value: confirmDelete } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this gift',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      });

      if (!confirmDelete) {
        return;
      }
      
      const updatedGifts = mainData.data.gifts.filter((gift1) => gift1._id !== idg);
      const updatedPerson = {
        ...mainData,
        gifts: updatedGifts,
      };

      try {
        const response = await fetch(
          `https://aisb001-giftr.onrender.com/api/people/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPerson),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update gift');
        }

        Swal.fire({
          title: 'Gift Deleted!',
          icon: 'success',
        }).then(() => {
          window.location.href = `/${id}/gift`;
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong while deleting the gift.',
          icon: 'error',
        });
      }
      
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
        <button className='general-btn' onClick={handleDelete} >Delete</button>
        <button className='general-btn' onClick={handleCancel} >Cancel</button>
      </form>
    </>
  );
};