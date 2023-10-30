import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ILogin from "../../interfaces/ILogin";
import { UserContext } from "../../context/UserContext";
import { RotatingLines } from "react-loader-spinner";
import "../../pages/Login/Style.css";
import imgLogin from '../../assets/imgman.png';
import imgFruit from '../../assets/Frutas.jpg'

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState<ILogin>({
    email: "",
    password: "",
  });

  const { handleLogin, userResponse, isLoading } = useContext(UserContext);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (userResponse.token != "") {
      navigate("/products");
    }
  }, [userResponse]);

  function userLogin(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(login);
  }

  return (
    <div className="flex justify-center contain">
      <img
        className="hidden rounded-l-md md:block md:w-3/5 md:max-w-md"
        src={imgLogin}
        alt=""
      />
      <div
        className=" bg-white w-full max-w-md md:w-4/5 flex flex-col
       items-center rounded-md 
       md:justify-center"
      >
        <h1 className="flex justify-center font-semibold text-2xl mt-4">
          Realize seu login
        </h1>
        <img
          className="my-4 h-32 w-full object-cover md:hidden"
          src={imgFruit}
          alt=""
        />
        <form onSubmit={userLogin} className="mt-4 items-center">
          <section className="flex flex-col justify-center">
            <label htmlFor="user" className="w-3/5 flex flex-col">
              <span className="after:content-['*'] after:text-red-500 after:ml-0.5">
                Email
              </span>
              <input
                placeholder="exemplo@email.com"
                className="placeholder:italic placeholder:text-slate-400 border-b border-black w-64"
                id="user"
                type="email"
                name="email"
                value={login.email}
                onChange={(e) => updateState(e)}
              />
            </label>

            <label htmlFor="password" className="w-3/5 flex flex-col mt-4">
              <span className="after:content-['*'] after:text-red-500 after:ml-0.5">
                Senha
              </span>
              <input
                placeholder="********"
                className="placeholder:italic placeholder:text-slate-400 border-b border-black w-64"
                id="password"
                type="password"
                name="password"
                value={login.password}
                onChange={(e) => updateState(e)}
              />
            </label>
          </section>

          <section className="">
            <p className="text-md mt-2">
              Não possui conta?{" "}
              <Link to="/register" className="text-blue-600 font-bold text-xl">
                Cadastre-se
              </Link>
            </p>
          </section>

          <section className="flex justify-center my-4">
            <button
              className="py-2 px-4 rounded-md"
              type="submit"
              id="botaoCarregar"
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <span className="py-2 px-4 rounded-md" id="botaoEntrar">
                  Entrar
                </span>
              )}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
