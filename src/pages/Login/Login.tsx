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
            navigate('/products')
        }
    }, [userResponse]);

    function userLogin(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(login)
    }


    return (
        <div  >
            <form onSubmit={userLogin} id="container" className=" bg-white rounded-lg mt-8 bg-no-repeat">
                <section className="partemail">
                    <label htmlFor="user" className="text-xl flex justify-center">
                        Email
                        <input
                            className="pr-2 pl-2"
                            id="user"
                            type="email"
                            name="email"
                            value={login.email}
                            onChange={(e) => (updateState(e))}
                        />
                    </label>
                  
                </section>
                <section>
                    <label htmlFor="password" className="text-xl flex justify-center">
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
                    <p className="text-sm flex justify-center">Não possui conta? </p>
                    <p className="text-sm flex justify-center"><Link to='/register'>Cadastre-se</Link ></p>
                </section>
                <section className="text-xl h-12 flex justify-center">
                    <button type="submit" id="buttonLogin">
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span id="buttonLogin">Entrar</span>}
                    </button>
                </section>
            </form>
            <div> <img src="src/assets/imgman.png" alt="" className="imglogin" /></div>
        </div>
    
    );

}

  
