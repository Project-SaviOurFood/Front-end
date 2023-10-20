import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
//import Home from './pages/Home'
/* import HeaderFilter from './components/HeaderFilter'
import SearchFilter from './components/SarchFilter' */
import Product from './pages/product/Product'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart'



function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/products' element={<Product/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/cart' element={<Cart/>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
