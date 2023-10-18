import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'



function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/product/:id' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
