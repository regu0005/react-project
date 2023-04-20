import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { mdiGift } from '@mdi/js';
import { mdiPencil } from '@mdi/js';

import '../App.css';

export const Gifts = () => {

  const [gifts, setGifts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/api/people/${id}`);
      const data = await response.json();
      setGifts(data.data.gifts);
    };

    fetchData();
  }, [id]);

  const handleCancel = (event) => {
    event.preventDefault();
    window.location.href = '/users';
  };
  
  return (
    <div className='users-container'>
            <div className='title'>
                <h1>List of Gifts</h1>
            </div>
            <div className='add-user'>
                <Link to={`/${id}/gift/add`}>
                  <button className='general-btn'>Add Gift</button>
                </Link>
                <Link to='/users'>
                  <button className='general-btn'>Return</button>
                </Link>
            </div>
            <div className='user-list'>
                <div className='user-grid'>
                    <div className='user-grid-item header'>Gift</div>
                    <div className='user-grid-item header'>Store</div>
                    <div className='user-grid-item header'>Edit</div>
                    {
                        gifts.map((gift) => (
                        <React.Fragment key={gift._id}>
                            <div className='user-grid-name'>
                            {gift.txt}
                            </div>
                            <div className='user-grid-name'>
                            {gift.store}
                            </div>
                            <div className='user-grid-item'>
                                <Link to={`${id}/gifts/${gift._id}`}>
                                    <svg className="edit-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d={mdiPencil} />
                                    </svg>
                                </Link>
                            </div>
                        </React.Fragment>
                        ))
                    }
                </div>
                
            </div>
    </div>
  );
};