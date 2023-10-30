import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../service/Service";
import { useNavigate } from "react-router-dom";
import IUser from "../../interfaces/IUser";
import { toastAlerta } from "../../utils/toastAlert";

import "./RegisterStyle.css";

export default function Register() {
  const navigate = useNavigate();

  const [register, setRegister] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    picture: "",
  });

  const [registerResponse, setRegisterResponse] = useState<IUser>({
    id: 0,
    name: "",
    email: "",
    password: "",
    picture: "",
  });

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  }

  async function postRegister(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, password } = register;

    if (name.length >= 5 && password.length >= 5) {
      try {
        await registerUser("/user/register", register, setRegisterResponse);
        toastAlerta("Usuário Cadastrado com Sucesso", "sucesso");
      } catch (error) {
        toastAlerta("Erro ao cadastrar o Usuário", "info");
      }
    } else {
      toastAlerta(
        "Dados inconsistentes. Verifique as informações de cadastro.",
        "erro"
      );
      setRegister({ ...register, password: "" });
    }
  }

  useEffect(() => {
    if (registerResponse.id !== 0) {
      navigate("/login");
    }
  }, [registerResponse]);

  return (
    <div className="flex justify-center contain">
      <img
        className="hidden rounded-l-md md:block md:w-3/5 md:max-w-md object-cover"
        src="\src\assets\Frutas.jpg"
        alt=""
      />
      <div
        className="bg-white w-full max-w-md md:w-4/5 rounded-md 
       md:justify-center flex flex-col items-center"
      >
        <h1 className="flex justify-center font-semibold text-2xl mt-4">
          Realize seu cadastro
        </h1>
        <img
          className="my-4 h-32 w-full object-cover md:hidden"
          src="\src\assets\imgman.png"
          alt=""
        />
        <form
          onSubmit={postRegister}
          id="container"
          className="mt-4 items-center"
        >
          <section className="flex flex-col justify-center">
            <label htmlFor="name" className="w-3/5 flex flex-col">
              <span className="after:content-['*'] after:text-red-500 after:ml-0.5">
                Nome
              </span>
              <input
                placeholder="Digite seu nome"
                className="placeholder:italic placeholder:text-slate-400 border-b border-black w-64"
                id="name"
                type="text"
                name="name"
                value={register.name}
                onChange={(e) => updateState(e)}
              />
            </label>
            <label htmlFor="email" className="w-3/5 flex flex-col mt-4">
              <span className="after:content-['*'] after:text-red-500 after:ml-0.5">
                Email
              </span>
              <input
                placeholder="Digite seu email"
                className="placeholder:italic placeholder:text-slate-400 border-b border-black w-64"
                id="email"
                type="email"
                name="email"
                value={register.email}
                onChange={(e) => updateState(e)}
              />
            </label>

            <label htmlFor="password" className="w-3/5 flex flex-col mt-4">
              <span className="after:content-['*'] after:text-red-500 after:ml-0.5">
                Senha
              </span>
              <input
                placeholder="Digite sua senha"
                className="placeholder:italic placeholder:text-slate-400 border-b border-black w-64"
                id="password"
                type="password"
                name="password"
                value={register.password}
                onChange={(e) => updateState(e)}
              />
            </label>
            <label htmlFor="picture" className="w-3/5 flex flex-col mt-4">
              Foto
              <input
                placeholder="Insira uma foto"
                className="placeholder:italic placeholder:text-slate-400 border-b border-black w-64"
                id="picture"
                type="text"
                name="picture"
                value={register.picture}
                onChange={(e) => updateState(e)}
              />
            </label>
          </section>
          <section>
            <p className="text-md mt-2">
              Já possui conta?{" "}
              <Link to="/login" className="text-blue-600 font-bold text-xl">
                Inicie sessão
              </Link>
            </p>
          </section>
          <section id="between" className="flex justify-center my-4">
            <button
              className="py-2 px-4 rounded-md"
              id="buttonCancel"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button
              className="py-2 px-4 rounded-md"
              type="submit"
              id="buttonRegister"
            >
              Cadastrar
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
