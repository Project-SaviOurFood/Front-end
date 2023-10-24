import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type IButtonCategory = {
    buttonCategory?: boolean
}


function NavBar({ buttonCategory = false }: IButtonCategory) {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();
    return (
        <>
            <nav>
                <ul>
                    <section>
                        <li>
                            <Link to="/"><img src="src/assets/saviourfood.png" alt='logo' width={150} height={150} /></Link>
                        </li>
                    </section>
                    <section>
                        {buttonCategory ?
                            <button
                                type='button'
                                onClick={() => navigate('/registerCategory')}>
                                Cadastrar Categoria
                            </button>
                            : <li>
                            <label htmlFor="search">
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    value={search}
                                    onChange={({ target: { value } }) => setSearch(value)} />
                            </label>
                        </li>
                        }
                    </section>
                    <button type='button' onClick={() => navigate('/categories')}>Categorias</button>
                    <button type='button' onClick={() => navigate('/products')}>Produtos</button>
                    <button type='button' onClick={() => navigate('/registerProduct')} >Cadastrar Produto</button>
                    <section>
                        <li>
                            <Link to="/cart"><img src="src/assets/carrinhos.png" alt='carrinho' width={100} height={100} /></Link>
                        </li>
                    </section>
                </ul>
            </nav>
                        
        </>
    )
}

export default NavBar;