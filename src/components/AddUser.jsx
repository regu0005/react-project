import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';
import { useLocalStorage } from "../hooks/UseLocalStorage";

export const AddUser = () => {
    const [users, setUsers] = useLocalStorage("users", []);
    const [user, setUser] = useState({ name: '', dob: ''});
    const [startDate, setStartDate] = useState(new Date());
    const years = range(1950, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    function range(start, end, step = 1) {
        const length = Math.floor((end - start) / step) + 1;
        return Array(length)
          .fill()
          .map((_, index) => start + index * step);
      }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // LOCAL STORAGE PROCESS
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (!user.name) {
    //         alert("Please enter a name");
    //         return;
    //     }
    //     const newUser = { id: Date.now(), name: user.name, dob: user.dob };
    //     setUsers([...users, newUser]);
    //     window.location.href = '/users';
    // };

    // JSON DUMMY DATA 
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!user.name) {
          alert("Please enter a name");
          return;
        }
        const newUser = { name: user.name, dob: user.dob };
        fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            setUsers(data);
            window.location.href = '/users';
          })
          .catch((error) => console.error("Error:", error));
      };

    const handleCancel = (event) => {
        event.preventDefault();
        window.location.href = '/users';
    };

  return (
    <>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="name" className="form-label">Date of Birth</label>
            <DatePicker
            className="form-input"
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
        <button type="submit" className='general-btn'>SAVE</button>
        <button className='general-btn' onClick={handleCancel} >CANCEL</button>
      </form>
    </>
  );
};
