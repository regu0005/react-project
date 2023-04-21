// App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Users } from './components/Users';
import { AddUser } from './components/AddUser';
import { EditUser } from './components/EditUser';
import { Gifts } from './components/Gifts';
import { GiftAdd } from './components/GiftAdd';
import { EditGift } from './components/EditGift';
import { NotFound } from './components/NotFound';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { TokenProvider } from './context/TokenContext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <TokenProvider>
      <div className="App">
        <header className="App-header">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <h1>Giftr</h1>
        </header>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/home" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/:id/gift" element={<Gifts />} />
            <Route path="/:id/gift/add" element={<GiftAdd />} />
            <Route path="/:id/gift/edit/:idg" element={<EditGift />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </TokenProvider>
  );
}

export default App;
