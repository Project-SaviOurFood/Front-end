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
    <div className="flex justify-center pt-6 max-w-screen-2xl ">
    <div className="flex justify-between items-center w-4/5 h-14 rounded-2xl shadow-md bg-white">
        <section className="flex items-center gap-10 text-vermelho">
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

          <a href="#about" className="font-normal">
            <h3>Sobre nós</h3>
          </a>

          <a href="#mission" className="font-normal">
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
       

        <section className="flex gap-10">
          <button type="button" onClick={() => navigate("/login")} className="text-vermelho">
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
        className="bg-vermelho rounded-md mr-5 py-1 px-3 font-medium"
          >
            Cadastre-se
          </button>
        </section>
      </div>
      
    </div>
  );
}
