import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'

type IButtonCategory = {
    buttonCategory?: boolean
}


function NavBar({ buttonCategory = false }: IButtonCategory) {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();
    return (
        <>
            <nav className='bg-white px-4 fixed w-full top-0 z-10'>
                <ul className='flex justify-between items-center'>
                    <section>
                        <li>
                            <Link to="/"><img src="src/assets/saviourfood.png" alt='logo' width={100} height={100} /></Link>
                        </li>
                    </section>
                    <section>
                        {buttonCategory ?
                            <button
                                className='bg-vermelho text-amarelo p-3 rounded-md font-bold hover:underline w-96'
                                type='button'
                                onClick={() => navigate('/registerCategory')}>
                                Cadastrar Categoria
                            </button>
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
                            <Link to="/cart"><img src="src/assets/cart.png" alt='carrinho' width={50} height={50} /></Link>
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