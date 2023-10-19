import { useState, createContext, useContext, useEffect } from 'react';
import { IChildren } from '../interfaces/IChildren';
import IProduct from '../interfaces/IProduct';
import { get } from '../service/Service';
import { UserContext } from './UserContext.';
import ICategory from '../interfaces/ICategory';
import ICart from '../interfaces/ICart';

type IProductContext = {
  productResponse: IProduct[],
  categoryResponse: ICategory[],
  cart: ICart[],
  filterProducts: IProduct[],
  setFilterProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  setCart: React.Dispatch<React.SetStateAction<ICart[]>>
  setCategoryResponse: React.Dispatch<React.SetStateAction<ICategory[]>>,
  setProductResponse: React.Dispatch<React.SetStateAction<IProduct[]>>,
}

export const GeneralContext = createContext({} as IProductContext);


export function GeneralProvider({ children }: IChildren) {
  const [productResponse, setProductResponse] = useState([] as IProduct[]);
  const [categoryResponse, setCategoryResponse] = useState([] as ICategory[]);
  const [cart, setCart] = useState([] as ICart[]);
  const [filterProducts, setFilterProducts] = useState<IProduct[]>([]);


  const { userResponse: { token }, handleLogout } = useContext(UserContext);

  async function getProducts() {
    try {
      await get('/product', setProductResponse, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente')
        handleLogout()
      }
    }
  }


  async function getCategories() {
    try {
      await get('/category', setCategoryResponse, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente')
        handleLogout()
      }
    }
  }


  useEffect(() => {
    if (token !== '') {
      getCategories();
      getProducts();
      setFilterProducts(productResponse)
    }
  }, [token, productResponse.length])

  return (
    <GeneralContext.Provider value={{
      productResponse,
      categoryResponse,
      cart,
      filterProducts,
      setFilterProducts,
      setCart,
      setProductResponse,
      setCategoryResponse
    }}>
      {children}
    </GeneralContext.Provider>
  );
}

