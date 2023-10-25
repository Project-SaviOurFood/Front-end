
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Product from './pages/Product/Product';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PurchaseSuccess from './pages/ PurchaseSuccess';
import Category from './pages/Categories/Category';
import FormCategory from './pages/Categories/formcategory/FormCategory';
import FormProduct from './pages/Product/formproduct/FormProduct';
import DeletarProduct from './pages/Product/deleteproduct/DeleterProduct';


function App() {
  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deleteCategory/:id" element={<Category />} />
        <Route path="/editCategory/:id" element={<Category />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/registerCategory" element={<FormCategory />} />
        <Route path="/products" element={<Product />} />
        <Route path="/registerProduct" element={<FormProduct />} />
        <Route path="/editProduct/:id" element={<FormProduct />} />
        <Route path="/deleteProduct/:id" element={<DeletarProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/finish" element={<PurchaseSuccess />} />
      </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;
