import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { put, get, register } from '../../../service/Service';
import { toastAlerta } from '../../../utils/toastAlert';
import { UserContext } from '../../../context/UserContext';
import ICategory from '../../../interfaces/ICategory';
import { GeneralContext } from '../../../context/GeneralContext';
import './FormCategory.css'


export default function FormCategory() {
  const [category, setCategory] = useState<ICategory>({} as ICategory);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { userResponse: { token }, handleLogout } = useContext(UserContext);
  const { getCategories } = useContext(GeneralContext);

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

/*   useEffect(() => {
    getCategories();
  }, [])
 */
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
    setCategory({type: '', description: ''});
    getCategories();
    navigate("/categories");
  }

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token]);

  return (
    <div id="container-category" className='bg-white rounded-md p-1'>
      <form onSubmit={newCategory} className='flex flex-col p-2 gap-10 items-center justify-center text-xl h-full'>

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
            type="text"
            placeholder="Ex: Grãos"
            name="description"
            value={category.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
        </div>
        <button
          className='bg-vermelho rounded-md p-2 font-semibold text-lg w-full hover:underline'
          type="submit"
        >
          {id === undefined ? "Cadastrar" : "Editar"}
        </button>
      </form>
    </div>
  );
}
