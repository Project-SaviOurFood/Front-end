import { useContext, useEffect } from 'react'
 //import HeaderFilter from '../components/HeaderFilter'
import SearchFilter from '../components/searchfilter/SarchFilter'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import ProductCard from '../components/ProductCard';
import HeaderFilter from '../components/headerfilter/HeaderFilter';


function Product() {
const {userResponse: {token}} = useContext(UserContext);
const {filterProducts} = useContext(GeneralContext);
const navigate = useNavigate();


useEffect(() => {
    if (token === "") {
      alert('Dados inconsistentes. Verifique as informações de cadastro.')
      navigate("/login")
    }
  }, [token])

  

  return (
   <>
   <HeaderFilter />
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