import { Link } from "react-router-dom";


export default function NavBar() {



return (
    <div>
        <section>
        <Link to='/home'>
        <img src="" alt="Logo Image" />
        </Link>
        </section>
        <section>
            <a href="">
            <h3>Sobre nós</h3>
            </a>
        </section>
        <section>
            <a href="">
            <h3>MIssão</h3>
            </a>
        </section>
        <section>
            <Link to='/login'>
            <h3>Login</h3>
            </Link>
        </section>
        <section>
            <Link to='/register'>
            <h3>Cadastre-se</h3>
            </Link>
        </section>
    </div>
);

}