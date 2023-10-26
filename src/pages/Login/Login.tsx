import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ILogin from "../../interfaces/ILogin";
import { UserContext } from "../../context/UserContext";
import { RotatingLines } from "react-loader-spinner";
import "../../pages/Login/Style.css";
import ImgLogin from '../../assets/imgman.png';

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
    <div className=" bg-white rounded-lg mt-8 bg-no-repeat w-24 " id="cont">
      <form onSubmit={userLogin} className="flex">
        <section className="mt-56 ml-40 w-80">
          <label htmlFor="user" className="text-xl">
            Email
            <input
              className="pr-2 pl-2 w-56 block ml-3"
              id="user"
              type="email"
              name="email"
              value={login.email}
              onChange={(e) => updateState(e)}
            />
          </label>
        </section>
        <section className="mt-3 ml-40 w-80 mb-5">
          <label htmlFor="password" className="text-xl">
            Senha
            <input
              className="pr-2 pl-2 w-56 block ml-3"
              id="password"
              type="password"
              name="password"
              value={login.password}
              onChange={(e) => updateState(e)}
            />
          </label>
        </section>

        <section className="ml-48 mb-5">
          <p className="text-xl ">
            Não possui conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </section>

        <section className="">
          <button className="" type="submit"
                id="botaoCarregar">
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span className="hover:underline" id="botaoEntrar">
                Entrar
              </span>
            )}
          </button>
        </section>
      </form>
      <img src={ImgLogin} alt="" className="imglogin" />{" "}
    </div>
  );
}
