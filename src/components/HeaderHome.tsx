import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export default function HeaderHome() {
const {userResponse: {token}} = useContext(UserContext);

const navigate = useNavigate();


return (
    <div>
        <section>
        <Link to='/'>
        <img src="src/assets/saviourfood.png" alt="Logo Image" width={150} height={150} />
        </Link>
        </section>
        <section>
            <a href="#about">
            <h3>Sobre nós</h3>
            </a>
        </section>
        {token != "" ?
        <section>
        <button type="button" onClick={() => navigate('/products')}>
            Produtos
        </button>
        <button type="button" onClick={() => navigate('/categories')}>
            Categorias
        </button> 
        </section> 
        :
        ""}
        <section>
            <a href="#mission">
            <h3>MIssão</h3>
            </a>
        </section>
        <section>
            <button type="button" onClick={() => navigate('/login')}>Login</button>        
        </section>
        <section>
        <button type="button" onClick={() => navigate('/register')}>Cadastre-se</button>
        </section>
    </div>
);

}