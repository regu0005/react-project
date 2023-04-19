import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// DATEPICKER
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';

import '../App.css';

export const EditUser = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const { id } = useParams();

  const [user, setUser] = useState({ name: '', dob: new Date() });
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/api/people/${id}`);
      const data = await response.json();
      console.log("DATA::: ", data);
      setName(data.data.name);
      setDob(data.data.dob);
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

  const formatDob = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
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
                value={dob}
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
            <button className='general-btn' onClick={handleCancel} >CANCEL</button>
          </form>
        </div>
  );
};