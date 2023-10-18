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
    setCart: React.Dispatch<React.SetStateAction<ICart[]>>
    setCategoryResponse: React.Dispatch<React.SetStateAction<ICategory[]>>,
    setProductResponse: React.Dispatch<React.SetStateAction<IProduct[]>>,
}

export const GeneralContext = createContext({} as IProductContext);


export function GeneralProvider({ children }: IChildren) {
    const [productResponse, setProductResponse] = useState([] as IProduct[]);
    const [categoryResponse, setCategoryResponse] = useState([] as ICategory[]);
    const [cart, setCart] = useState([] as ICart[]);

    const {userResponse: {token}, handleLogout} = useContext(UserContext);

    const products = async () => {
        try {
            await get('/product', setProductResponse,
                {headers: { Authorization: token }})
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout
                alert("O token expirou, por favor logar novamente")
            }
        }
    }

    async function getCategories() {
        try {
          await get('/category', setCategoryResponse, {
            headers: { Authorization: token },
          });
        } catch (error: any) {
          if(error.toString().includes('403')) {
            alert('O token expirou, favor logar novamente')
            handleLogout()
          }
        }
      }


    useEffect(() => {
        products();
        getCategories();
    }, [])

    return (
        <GeneralContext.Provider value={{ 
            productResponse, 
            categoryResponse,
            cart,
            setCart,
            setProductResponse, 
            setCategoryResponse }}>
            {children}
        </GeneralContext.Provider>
    );
}

