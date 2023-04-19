import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';
import { useLocalStorage } from "../hooks/UseLocalStorage";

export const EditUser = () => {
    const [users, setUsers] = useLocalStorage('users', []);
    const { id } = useParams();
    const [user, setUser] = useState({ name: '', dob: new Date() });
    const [startDate, setStartDate] = useState(new Date());
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
      
      useEffect(() => {
        const user = users.find((u) => u.id === parseInt(id));
        if (user) {
          setUser(user);
          const dobDate = new Date(user.dob);
          setStartDate(dobDate);
        }
      }, [id, users]);
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
        setUsers(updatedUsers);
        window.location.href = '/users';
      };
      
      const handleCancel = (event) => {
        event.preventDefault();
        window.location.href = '/users';
      };
      
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
                value={user.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
            <label htmlFor="name" className="form-label">Date of Birth</label>
                <DatePicker
                className="form-input" 
                value={user.dob}
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
                        setUser({...user, dob: formattedDate});
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
      