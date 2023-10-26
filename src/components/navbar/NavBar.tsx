import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
import { UserContext } from '../../context/UserContext'
import { GeneralContext } from '../../context/GeneralContext'
import { get } from '../../service/Service'
import Cart from '../../assets/cart.png';
import Logo from '../../assets/saviourfood.png';

type IRenderSearch = {
    renderSearch?: boolean
}


function NavBar({ renderSearch = false }: IRenderSearch) {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();
    const {userResponse: {token}} = useContext(UserContext);
    const {setFilterProducts, getProducts, productResponse} = useContext(GeneralContext);

    async function findProductsByName() {
        if (search != ""){
        await get(`/product/name/${search}`, setFilterProducts, {
          headers: {
            Authorization: token,
          },
        });
    } else {
        getProducts();
        setFilterProducts(productResponse)
    }
      }

    useEffect(() => {
    findProductsByName();
    }, [search])


    return (
        <>
            <nav className='bg-white px-4 fixed w-full top-0 z-10'>
                <ul className='flex justify-between items-center'>
                    <section>
                        <li>
                            <Link to="/"><img src={Logo} alt='logo' width={100} height={100} /></Link>
                        </li>
                    </section>
                    <section>
                        {renderSearch ?
                            ""
                            : <li>
                                <label htmlFor="search">
                                    <input
                                        className='border-none bg-vermelho w-96 py-2.5 px-5'
                                        type="text"
                                        name="search"
                                        id="search"
                                        value={search}
                                        onChange={({ target: { value } }) => setSearch(value)} />
                                    <i id="lupaImg" className='bg-vermelho px-5'></i>
                                </label>
                            </li>
                        }
                    </section>
                    <section className='flex justify-between w-96'>
                        <button className="font-bold hover:underline" type='button' onClick={() => navigate('/categories')}>Categorias</button>
                        <button className="font-bold hover:underline" type='button' onClick={() => navigate('/products')}>Produtos</button>
                        <button className="font-bold hover:underline" type='button' onClick={() => navigate('/registerProduct')} >Cadastrar Produto</button>
                    </section>

                    <section>
                        <li>
                            <Link to="/cart"><img src={Cart} alt='carrinho' width={50} height={50} /></Link>
                        </li>
                    </section>
                </ul>
            </nav>
            <div style={{ marginTop: '120px' }}>
            </div>

        </>
    )
}

export default NavBar;