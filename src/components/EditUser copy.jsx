import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';

export const EditUser = () => {
    
    const [users, setUsers] = useState([]);
    const { id } = useParams();
    const [user, setUser] = useState({ name: '', dob: new Date() });
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:3001/api/people/${id}`);
          const data = await response.json();
          setUsers(data);
        };
        fetchData();
      }, []);

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

      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:4000/users/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        if (response.ok) {
          const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
          setUsers(updatedUsers);
          window.location.href = '/users';
        } else {
          console.error(`Failed to update user with id ${id}. Status: ${response.status}`);
        }
      };
      
      const handleCancel = (event) => {
        event.preventDefault();
        window.location.href = '/users';
      };
      
      return (
        <div className='add-user-container'>
          
        </div>
  );
};
      