import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
//import Home from './pages/Home'
/* import HeaderFilter from './components/HeaderFilter'
import SearchFilter from './components/SarchFilter' */
import Product from './pages/Product'



function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Product/>} />
    <Route path='/products' element={<Product/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/product/:id' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
