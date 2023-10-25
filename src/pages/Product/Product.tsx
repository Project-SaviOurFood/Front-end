import { useContext, useEffect } from 'react'
import NavBar from '../../components/navbar/NavBar';
import SearchFilter from '../../components/searchfilter/SarchFilter'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';
import ProductCard from '../../components/productcard/ProductCard';
import './Product.css'



function Product() {
const {userResponse: {token}} = useContext(UserContext);
const {filterProducts, getProducts, setFilterProducts, productResponse} = useContext(GeneralContext);
const navigate = useNavigate();


useEffect(() => {
    if (token === "") {
      alert('Dados inconsistentes. Verifique as informações de cadastro.')
      navigate("/login")
    }
  }, [token])

  useEffect(() => {
     getProducts();
     setFilterProducts(productResponse);
  }, [])
  

  return (
   <>
   <NavBar />
   <SearchFilter />
      <div id="container-product">
      {filterProducts.map(({name, picture, expirationDate, value, id}) => (
        <div key={id} className=''>
          <ProductCard productInfo={{name, picture, expirationDate, value, id}} />
        </div>
      ))}
      </div>

   </>
  )
}

export default Product