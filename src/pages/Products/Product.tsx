import { useContext, useEffect } from 'react'
import SearchFilter from '../../components/SarchFilter'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';
import ProductCard from '../../components/ProductCard';
import NavBar from '../../components/NavBar';


function Product() {
const {userResponse: {token}} = useContext(UserContext);
const {filterProducts, getProducts} = useContext(GeneralContext);
const navigate = useNavigate();


useEffect(() => {
    if (token === "") {
      alert('Dados inconsistentes. Verifique as informações de cadastro.')
      navigate("/login")
    }
  }, [token])

  useEffect(() => {
    getProducts()
  }, [])
  

  return (
   <>
   <NavBar />
   <SearchFilter />
      <div>
      {filterProducts.map(({name, picture, expirationDate, value, id}) => (
        <div key={id}>
          <ProductCard productInfo={{name, picture, expirationDate, value, id}} />
        </div>
      ))}
      </div>

   </>
  )
}

export default Product