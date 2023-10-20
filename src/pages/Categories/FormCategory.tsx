import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { put, get, register } from '../../service/Service';
import { toastAlerta } from '../../utils/toastAlert';
import { UserContext } from '../../context/UserContext';
import ICategory from '../../interfaces/ICategory';

export default function FormCategory() {
  const [category, setCategory] = useState<ICategory>({} as ICategory);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { userResponse: {token}, handleLogout } = useContext(UserContext);

  async function findById(id: string) {
    await get(`/category/${id}`, setCategory, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })

    console.log(JSON.stringify(category))
  }

  async function newCategory(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await put(`/category`, category, setCategory, {
          headers: {
            'Authorization': token
          }
        })

        toastAlerta('Tema atualizado com sucesso', 'sucesso')
        navigate('/categories')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar o Tema', 'erro')
        }

      }

    } else {
      try {
        await register(`/category`, category, setCategory, {
          headers: {
            'Authorization': token
          }
        })

        toastAlerta('Tema cadastrado com sucesso', 'sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao cadastrado o Tema', 'erro')
        }
      }
    }

    navigate('/categories')
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  return (
    <div>
      <h1>
        {id === undefined ? 'Cadastre uma nova Categoria' : 'Editar Categoria'}
      </h1>
      <form onSubmit={newCategory}>
        <div>
          <label htmlFor="type">Tipo:</label>
          <input
              type="text"
              placeholder="Tipo"
              name='type'
              value={category.type}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)} />
          <label htmlFor="descricao">Descrição da Categoria:</label>
          <input
            type="text"
            placeholder="Descrição"
            name='description'
            value={category.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
        </div>
        <button
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  );
}
