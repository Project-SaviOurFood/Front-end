import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import ILogin from "../interfaces/ILogin";
import { loginUser } from "../service/Service";



export default function Login() {
    const [login, setLogin] = useState<ILogin>({
        email: '',
        password: ''
    });
    const [isDisabled, setDisabled] = useState<boolean>(false);

    function updateLogin(e: ChangeEvent<HTMLInputElement>) {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        }
        )
    }

    const postLogin = async(e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {password} = login;
        if (password >= 5) {
            try {
                await loginUser('/user/login', login, )
            }
        }
    }

    return (
        <div>
            <form onSubmit={}>
                <section>
                    <label htmlFor="user">
                        Email
                        <input
                            id="user"
                            type="email"
                            name="email"
                            value={login.email}
                            onChange={(e) => (updateLogin(e))}
                        />
                    </label>
                </section>
                <section>
                    <label htmlFor="password">
                        Senha
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={login.password}
                            onChange={(e) => updateLogin(e)}
                        />
                    </label>
                </section>
                <section>
                    <p>Não possui conta? <Link to='/register'><p>Cadastre-se</p></Link></p>
                </section>
                <section>
                    <button type="submit" disabled={isDisabled}>Login</button>
                </section>
            </form>
        </div>
    );

}