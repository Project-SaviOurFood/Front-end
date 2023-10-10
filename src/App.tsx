import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    </Routes>
    </>
  )
}

export default App
