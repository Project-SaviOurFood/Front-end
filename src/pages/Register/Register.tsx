import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../service/Service";
import { useNavigate } from "react-router-dom";
import IUser from "../../interfaces/IUser";
import "../Register/RegisterStyle.css";
import { toastAlerta } from "../../utils/toastAlert";
import Legumes from '../../assets/legumes.png';

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
    <div>
      <form
        onSubmit={postRegister}
        id="container"
        className=" bg-white rounded-lg mt-8 bg-no-repeat"
      >
        <section className="ml-56 mb-4">
          <label htmlFor="name" className="text-xl flex flex-col justify-center">
            <span className="">Nome</span>
            <input
              className="pr-2 pl-2 w-56 ml-3 "
              id="name"
              type="text"
              name="name"
              value={register.name}
              onChange={(e) => updateState(e)}
            />
          </label>
        </section>
        <section className="ml-56 mb-4">
          <label htmlFor="email" className="text-xl flex flex-col justify-center">
            Email
            <input
              className="pr-2 pl-2 w-56 ml-3"
              id="email"
              type="email"
              name="email"
              value={register.email}
              onChange={(e) => updateState(e)}
            />
          </label>
        </section>
        <section className="ml-56 mb-4">
          <label htmlFor="password" className="text-xl flex flex-col justify-center">
            Senha
            <input
              className="pr-2 pl-2 w-56 ml-3"
              id="password"
              type="password"
              name="password"
              value={register.password}
              onChange={(e) => updateState(e)}
            />
          </label>
        </section>
        <section className="ml-56">
          <label htmlFor="picture" className="text-xl flex flex-col justify-center">
            Foto
            <input
              className="pr-2 pl-2 w-56 ml-3 mb-4"
              id="picture"
              type="text"
              name="picture"
              value={register.picture}
              onChange={(e) => updateState(e)}
            />
          </label>
        </section>
        <section>
          <p className="text-sm flex justify-center">Já possui conta?</p>
          <p className="text-sm flex justify-center">
            <Link to="/login">Login</Link>
          </p>
        </section>
        <section className="text-xl h-12 flex justify-center mt-3">
          <button id="buttonCancel" onClick={() => navigate("/")}>
            Cancelar
          </button>
          <button type="submit" id="buttonRegister">
            Cadastrar
          </button>
        </section>
      </form>
      <div>
        <img src={Legumes} alt="" className="imgregister" />
      </div>
    </div>
  );
}
