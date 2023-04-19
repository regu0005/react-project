import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Users } from './components/Users';
import { AddUser } from './components/AddUser';
import { EditUser } from './components/EditUser';
import { NotFound } from './components/NotFound';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
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
      <NavBar/>
      <div className='container'>
        <Routes>
            <Route path='/' element={ <Home />}></Route>
            <Route path='/home' element={ <Home />}></Route>
            <Route path='/users' element={ <Users />}></Route>
            <Route path='/adduser' element={ <AddUser />}></Route>
            <Route path='/edituser/:id' element={ <EditUser />}></Route>
            <Route path='/login' element={ <Login />}></Route>
            <Route path='/logout' element={ <Logout />}></Route>
            <Route path='/*' element={ <NotFound />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
