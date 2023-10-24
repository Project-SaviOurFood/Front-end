<<<<<<< HEAD:src/pages/Categories/FormCategory.tsx
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { put, get, register } from "../../service/Service";
import { toastAlerta } from "../../utils/toastAlert";
import { UserContext } from "../../context/UserContext";
import ICategory from "../../interfaces/ICategory";
import "../../components/category/Category.css"
=======
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { put, get, register } from '../../../service/Service';
import { toastAlerta } from '../../../utils/toastAlert';
import { UserContext } from '../../../context/UserContext';
import ICategory from '../../../interfaces/ICategory';

import Legumes from '../../../assets/legumes.png'

import './FormCategory.css'
>>>>>>> 695ad8efb48e7882be23df65cbd39aa0826a9d47:src/pages/Categories/formcategory/FormCategory.tsx

export default function FormCategory() {
  const [category, setCategory] = useState<ICategory>({} as ICategory);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

<<<<<<< HEAD:src/pages/Categories/FormCategory.tsx
  const {
    userResponse: { token },
    handleLogout,
  } = useContext(UserContext);
=======
  const { userResponse: { token }, handleLogout } = useContext(UserContext);
>>>>>>> 695ad8efb48e7882be23df65cbd39aa0826a9d47:src/pages/Categories/formcategory/FormCategory.tsx

  async function findById(id: string) {
    await get(`/category/${id}`, setCategory, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });

    console.log(JSON.stringify(category));
  }

  async function newCategory(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await put(`/category`, category, setCategory, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta("Category atualizada com sucesso", "sucesso");
        navigate("/categories");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlerta("Erro ao atualizar a Category", "erro");
        }
      }
    } else {
      try {
        await register(`/category`, category, setCategory, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta("Category cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlerta("Erro ao cadastrar a Category", "erro");
        }
      }
    }

    navigate("/categories");
  }

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token]);

  return (
<<<<<<< HEAD:src/pages/Categories/FormCategory.tsx
    <div>
      <h1 className="flex justify-center font-bold text-lg">
        {id === undefined ? "Cadastre uma nova categoria" : "Editar Categoria"}
      </h1>
      <form onSubmit={newCategory}>
        <div className="flex flex-col sidelabel">
          <label htmlFor="type">Categoria:</label>
          <input
          className="w-full"
=======
    <div id="container-category" className='flex justify-center items-center bg-white rounded-md p-1'>

      <div>
        <img id="img-legumes" src={Legumes} alt="legumixx" />
      </div>

      <form onSubmit={newCategory} className='flex flex-col p-2 gap-10 items-center justify-center text-xl'>

      <h1 className='font-bold text-4xl'>
          {id === undefined ? 'Cadastre uma nova Categoria' : 'Editar Categoria'}
        </h1>

        <div>
          <label htmlFor="type">Tipo</label>
          <input
          className='w-full pl-2'
            type="text"
            placeholder="Tipo"
            name='type'
            value={category.type}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)} />
          <label htmlFor="descricao">Descrição da Categoria</label>
          <input
            className='w-full pl-2'
>>>>>>> 695ad8efb48e7882be23df65cbd39aa0826a9d47:src/pages/Categories/formcategory/FormCategory.tsx
            type="text"
            placeholder="Ex: Grãos"
            name="type"
            value={category.type}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
          <label htmlFor="descricao" className="mt-4">
            Descrição da Categoria:
          </label>
          <input
            className="w-full"
            type="text"
            placeholder="Ex: Grãos ricos em carboidratos..."
            name="description"
            value={category.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
        </div>
        <button
          className='bg-vermelho rounded-md p-2 font-semibold text-lg w-full hover:underline'
          type="submit"
          className="bg-vermelho p-2 rounded-lg mt-10 text-amarelo font-bold"
        >
          {id === undefined ? "Cadastrar" : "Editar"}
        </button>
      </form>
    </div>
  );
}
