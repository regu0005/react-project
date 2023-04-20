import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


// DATEPICKER
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';

import '../App.css';

export const EditUser = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/api/people/${id}`);
      const data = await response.json();
      setName(data.data.name);
      setDob(data.data.dob);
      const dobDate = new Date(data.data.dob);
      setStartDate(dobDate);
    };
  
    fetchData();
  }, [id]);

   
  const years = range(1950, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

    function range(start, end, step = 1) {
      const length = Math.floor((end - start) / step) + 1;
      return Array(length)
        .fill()
        .map((_, index) => start + index * step);
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/api/people/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        dob,
      }),
    });
    if (response.ok) {
        window.location.href = '/users';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'dob') {
      setDob(value);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    window.location.href = '/users';
  };

const handleDelete = async (event) => {
  event.preventDefault();
  const { value: confirmDelete } = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this user!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
  });

  if (!confirmDelete) {
    return;
  }

  const response = await fetch(`http://localhost:3001/api/people/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    await Swal.fire({
      title: 'Deleted!',
      text: 'The user has been deleted.',
      icon: 'success',
      timer: 3000,
      timerProgressBar: true,
    });
    window.location.href = '/users';
  } else {
    await Swal.fire({
      title: 'Error!',
      text: 'Failed to delete user.',
      icon: 'error',
      timer: 3000,
      timerProgressBar: true,
    });
  }
};


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toISOString().substring(0, 10);
  };

  console.log("Name::: ",{name});
  console.log("DOB::: ",{dob});
  return (
    <div className='add-user-container'>
          <h1>Edit User</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name' className='form-label'>
                Full Name
              </label>
              <input
                className='form-input'
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
                <label htmlFor="name" className="form-label">Date of Birth</label>
                <DatePicker
                className="form-input" 
                value={formatDate(dob)}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                    }) => (
                        <div
                        style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                        }}
                        >
                        <button onClick={decreaseMonth} className='general-btn' disabled={prevMonthButtonDisabled}>
                            {"<"}
                        </button>
                        <select
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(value)}
                        >
                            {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>

                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                            }
                        >
                            {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>

                        <button onClick={increaseMonth} className='general-btn' disabled={nextMonthButtonDisabled}>
                            {">"}
                        </button>
                        </div>
                    )}
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
                        setDob(formattedDate);
                    }}
                />    
            </div>

            <button type='submit' className='general-btn'>
              Update User
            </button>
            <button className='general-btn' onClick={handleDelete} >Delete User</button>
            <button className='general-btn' onClick={handleCancel} >Cancel</button>
          </form>
        </div>
  );
};