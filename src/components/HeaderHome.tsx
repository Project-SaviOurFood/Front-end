import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Logo from '../assets/saviourfood.png';

export default function HeaderHome() {
  const {
    userResponse: { token },
  } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <div className="md:flex md:justify-center md:pt-5">
    <div className="flex justify-around 
    md:bg-white md:justify-between md:shadow-md md:w-4/5 md:rounded-2xl md:justify-center md:h-14 md:fixed md:z-50">
        <section className="flex items-center gap-4">
          <Link to="/">
          <div className="mt-2">
              <img
                src={Logo}
                alt="Logo Image"
                width={100}
                height={100}
              />
            </div>
          </Link>

          <a href="#about" className="font-normal hidden sm:block text-vermelho">
            <h3>Sobre nós</h3>
          </a>

          <a href="#mission" className="font-normal hidden sm:block text-vermelho">
            <h3>Missão</h3> 
          </a>

          {token != "" ? (
          <section className="flex gap-10 text-vermelho">
            <button type="button" onClick={() => navigate("/products")}>
              Produtos
            </button>
            <button type="button" onClick={() => navigate("/categories")}>
              Categorias
            </button>
          </section>
        ) : (
          ""
        )}







        </section>
       

        <section className="flex items-center gap-4 mx-4">
          <button type="button" onClick={() => navigate("/login")} className="text-vermelho">
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
        className="bg-vermelho py-2 px-4 rounded-md font-medium text-amarelo"
          >
            Cadastre-se
          </button>
        </section>
      </div>
      
    </div>
  );
}
