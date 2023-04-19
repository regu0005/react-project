import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../App.css';

export const EditUser = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/api/people/${id}`);
      const data = await response.json();
      console.log("DATA::: ", data);
      setName(data.name);
      setDob(data.dob);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/api/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        dob,
      }),
    });
    if (response.ok) {
      // history.push('/');
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

  console.log("Name::: ",{name});
  console.log("DOB::: ",{dob});
  return (
    <div className='edit-user-container'>
    {name && (
        <>
            <div>
                  Name: {name}
            </div>
            <div>
                      DOB: {dob}
            </div></>
        )
    }
    
      
    </div>
  );
};




// <form onSubmit={handleSubmit}>
{/* <div className='form-group'>
<label htmlFor='name'>Name:</label>
<input
  type='text'
  id='name'
  name='name'
  value={name}
  onChange={handleInputChange}
/>
</div>
<div className='form-group'>
<label htmlFor='dob'>Date of Birth:</label>
<input
  type='text'
  id='dob'
  name='dob'
  value={dob}
  onChange={handleInputChange}
/>
</div>
<button type='submit' className='general-btn'>
Save
</button>
</form> */}
// 
// import { useParams } from 'react-router-dom';

// import '../App.css';

// export const EditUser = () => {
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:3001/api/people/${id}`);
//       const data = await response.json();
//       setName(data.name);
//       setDob(data.dob);
//     };

//     fetchData();
//   }, [id]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await fetch(`http://localhost:3001/api/people/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name,
//         dob,
//       }),
//     });
//     if (response.ok) {
//       //   history.push('/');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setName(value);
//   };

//   return (
//     <div className='edit-user-container'>
//       <form onSubmit={handleSubmit}>
//         <div className='form-group'>
          
//         </div>
//         <div>
//             <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={name}
//                 onChange={handleInputChange}
//             />
//         </div>
//         <button type='submit' className='general-btn'>
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };
