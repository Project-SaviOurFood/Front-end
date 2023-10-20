import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ILogin from "../../interfaces/ILogin";
import { UserContext } from "../../context/UserContext";
import { RotatingLines } from "react-loader-spinner";
import '../../pages/Login/Style.css';


export default function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = useState<ILogin>({
        email: '',
        password: ''
    });

    const { handleLogin, userResponse, isLoading } = useContext(UserContext)

    function updateState(e: ChangeEvent<HTMLInputElement>) {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        }
        )
    }

    useEffect(() => {
        if (userResponse.token != '') {
            navigate('/home')
        }
    }, [userResponse]);

    function userLogin(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(login)
    }


    return (
        <div  >
            <form onSubmit={userLogin} className="flex flex-col gap-4">
                <section className="partemail">
                    <label htmlFor="user" className="text-2xl">
                        Email
                        <input
                            id="user"
                            type="email"
                            name="email"
                            value={login.email}
                            onChange={(e) => (updateState(e))}
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
                            onChange={(e) => updateState(e)}
                        />
                    </label>
                </section>
                <section>
                    <p>Não possui conta? <Link to='/register'>Cadastre-se</Link></p>
                </section>
                <section>
                    <button type="submit">
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>}
                    </button>
                </section>
            </form>
            <div> <img src="\src\assets\imgman.png" alt="" className="imglogin" /> </div>
          
        </div>
    
    );

}

  
