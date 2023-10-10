import { Route, Routes } from 'react-router-dom'
import './App.css'
/* import NavBar from './components/navBar'
import Login from './pages/Login'  */
import Register from './pages/Register'

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Register/>} />
    </Routes>
    </>
  )
}

export default App
