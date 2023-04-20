import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { mdiGift } from '@mdi/js';
import { mdiPencil } from '@mdi/js';

import '../App.css';

export const GiftAdd = () => {
    // const [users, setUsers] = useState([]);
    // const [user, setUser] = useState({ name: '', dob: ''});
    // const [startDate, setStartDate] = useState(new Date());
    // const years = range(1950, getYear(new Date()) + 1, 1);
    // const months = [
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December",
    // ];

    // function range(start, end, step = 1) {
    //     const length = Math.floor((end - start) / step) + 1;
    //     return Array(length)
    //       .fill()
    //       .map((_, index) => start + index * step);
    //   }

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setUser({ ...user, [name]: value });
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     if (!user.name) {
    //         alert("Please enter a name");
    //         return;
    //     }

    //     try {
    //         const response = await fetch('http://localhost:3001/api/people', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: user.name,
    //                 dob: user.dob
    //             })
    //         });
    //         const data = await response.json();
    //         setUsers([...users, data]);
    //         window.location.href = '/users';
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to save user. Please try again.');
    //     }
    // };

    // const handleCancel = (event) => {
    //     event.preventDefault();
    //     window.location.href = '/users';
    // };


  return (
    <></>
    // <>
    //   <h1>Add User</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //         <label htmlFor="name" className="form-label">Full Name</label>
    //         <input
    //             className="form-input"
    //             type="text"
    //             id="name"
    //             name="name"
    //             value={user.name}
    //             onChange={handleInputChange}
    //         />
    //     </div>
    //     <div className="form-group">
    //         <label htmlFor="name" className="form-label">Date of Birth</label>
    //         <DatePicker
    //         className="form-input"
    //         renderCustomHeader={({
    //             date,
    //             changeYear,
    //             changeMonth,
    //             decreaseMonth,
    //             increaseMonth,
    //             prevMonthButtonDisabled,
    //             nextMonthButtonDisabled,
    //             }) => (
    //                 <div
    //                 style={{
    //                     margin: 10,
    //                     display: "flex",
    //                     justifyContent: "center",
    //                 }}
    //                 >
    //                 <button onClick={decreaseMonth} className='general-btn' disabled={prevMonthButtonDisabled}>
    //                     {"<"}
    //                 </button>
    //                 <select
    //                     value={getYear(date)}
    //                     onChange={({ target: { value } }) => changeYear(value)}
    //                 >
    //                     {years.map((option) => (
    //                     <option key={option} value={option}>
    //                         {option}
    //                     </option>
    //                     ))}
    //                 </select>

    //                 <select
    //                     value={months[getMonth(date)]}
    //                     onChange={({ target: { value } }) =>
    //                     changeMonth(months.indexOf(value))
    //                     }
    //                 >
    //                     {months.map((option) => (
    //                     <option key={option} value={option}>
    //                         {option}
    //                     </option>
    //                     ))}
    //                 </select>

    //                 <button onClick={increaseMonth} className='general-btn' disabled={nextMonthButtonDisabled}>
    //                     {">"}
    //                 </button>
    //                 </div>
    //             )}
    //             selected={startDate}
    //             onChange={(date) => {
    //                 setStartDate(date);
    //                 const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    //                 setUser({...user, dob: formattedDate});
    //             }}
    //         />
    //     </div>
    //     <button type="submit" className='general-btn'>SAVE</button>
    //     <button className='general-btn' onClick={handleCancel} >CANCEL</button>
    //   </form>
    // </>
  );
};