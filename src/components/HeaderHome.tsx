import { Link, useNavigate } from "react-router-dom";


export default function HeaderHome() {
const navigate = useNavigate();


return (
    <div    >
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
        <section>
            <a href="#mission">
            <h3>Missão</h3>
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