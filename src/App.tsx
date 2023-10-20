import { Route, Routes } from 'react-router-dom';
import Register from './pages/Login/Register';
import Login from './pages/Login/Login';
import Product from './pages/Products/Product';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart/Cart';
import PurchaseSuccess from './pages/ PurchaseSuccess';
import Category from './pages/Categories/Category';
import FormCategory from './pages/Categories/FormCategory';
import DeleteCategory from './pages/Categories/DeleteCategory';


function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/categories' element={<Category/>} />
    <Route path='/registerCategory' element={<FormCategory/>} />
    <Route path='/editCategory/:id' element={<FormCategory/>} />
    <Route path='/deleteCategory/:id' element={<DeleteCategory/>} />
    <Route path='/products' element={<Product/>} />
    <Route path='/cart' element={<Cart/>} />
    <Route path='/finish' element={<PurchaseSuccess/>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
