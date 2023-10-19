import { useState } from 'react'
import { Link } from 'react-router-dom'

function HeaderFilter() {
const [search, setSearch] = useState<string>(""); 

    return (
        <>
            <nav>
                <ul>
                    <section>
                        <li>
                            <Link to="/products"><img src="src/assets/saviourfood.png" alt='logo' width={150} height={150} /></Link>
                        </li>
                    </section>
                    <section>
                        <li>
                            <label htmlFor="search">
                            <input 
                            type="text" 
                            name="search" 
                            id="search"
                            value={search}
                            onChange={({target: {value}}) => setSearch(value)} />
                            </label>
                        </li>
                    </section>
                    <section>
                        <li>
                            <Link to="/cart"><img src="src/assets/carrinhos.png" alt='carrinho'  width={100} height={100}/></Link>
                        </li>
                    </section>
                </ul>
            </nav>

        </>
    )
}

export default HeaderFilter