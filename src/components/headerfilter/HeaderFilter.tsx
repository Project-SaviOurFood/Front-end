import { useState } from 'react'
import { Link } from 'react-router-dom'
import './HeaderFilter.css'
import Logo from '../../assets/saviourfood.png';
import Carrinhos from '../../assets/carrinhos.png';


function HeaderFilter() {
const [search, setSearch] = useState<string>(""); 

    return (
        <>
        

        <nav className='flex'>
                <ul className=''>
                    <section>
                        <li>
                            <Link to="/products"><img src={Logo} alt='logo' width={75} height={150} /></Link>
                        </li>
                    </section>
                    <section className='w-3/4 text-center'>
                        <li>
                            <label htmlFor="search">
                            <input
                            className='bg-vermelho border-none outline-none' 
                            type="text" 
                            name="search" 
                            id="search"
                            value={search}
                            onChange={({target: {value}}) => setSearch(value)} />
                            <i id="lupaImg" className='bg-vermelho px-5'></i>
                            </label>
                        </li>
                    </section>
                    <section>
                        <li>
                            <Link to="/cart"><img src={Carrinhos} alt='carrinho' id='cart'  width={40} height={100}/></Link>
                        </li>
                    </section>
                </ul>
            </nav>
           
        </>
    )
}

export default HeaderFilter