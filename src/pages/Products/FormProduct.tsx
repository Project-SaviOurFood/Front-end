import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';;
import { toastAlerta } from '../../utils/toastAlert';
import { UserContext } from '../../context/UserContext';
import ICategory from '../../interfaces/ICategory';
import { GeneralContext } from '../../context/GeneralContext';
import { get, post, put } from '../../service/Service';
import IProduct from '../../interfaces/IProduct';


export default function FormProduct() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { userResponse, handleLogout } = useContext(UserContext);
  const { getCategories, categoryResponse } = useContext(GeneralContext);

  const [category, setCategory] = useState<ICategory>({
    id: 0,
    description: '',
    type: ''
  });

  const [product, setProduct] = useState<IProduct>({
    id: 0,
    name: '',
    value: 0,
    expirationDate: '',
    picture: '',
    category: null,
    user: null,
  });

  async function findProductById(id: string) {
    await get(`/product/${id}`, setProduct, {
      headers: {
        Authorization: userResponse.token,
      },
    });
  }

  async function findCategoryById(id: string) {
    await get(`/category/${id}`, setCategory, {
      headers: {
        Authorization: userResponse.token,
      },
    });
  }

  useEffect(() => {
    if (userResponse.token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [userResponse.token]);

  useEffect(() => {
    getCategories()
    if (id !== undefined) {
      findProductById(id);
    }
  }, [id]);

  useEffect(() => {
    setProduct({
      ...product,
      category,
    });
  }, [category]);


  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      category,
      user: userResponse,
    });
  }

  async function newProduct(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id != undefined) {
      try {
        await put(`/product`, product, setProduct, {
          headers: {
            Authorization: userResponse.token,
          },
        });
        toastAlerta('Postagem atualizada com sucesso', 'sucesso');
        navigate('/products');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar a Postagem', 'erro');
        }
      }
    } else {
      try {
        await post(`/product`, product, setProduct, {
          headers: {
            Authorization: userResponse.token,
          },
        });

        toastAlerta('Postagem cadastrada com sucesso', 'sucesso');
        navigate('/products')
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao cadastrar a Postagem', 'erro');
        }
      }
    }
  }

  const carregandoTema = category.description === '';

  return (
    <div>
      <h1>{id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}</h1>

      <form onSubmit={newProduct}>
        <div>
          <label htmlFor="titulo">Nome:</label>
          <input
            value={product.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div>
          <label htmlFor="titulo">Date de Validade:</label>
          <input
            value={product.expirationDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="text"
            placeholder="Data"
            name="expirationDate"
            required
          />
        </div>
        <div>
          <label htmlFor="titulo">Valor:</label>
          <input
            value={product.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="number"
            placeholder="Valor"
            name="value"
            required
          />
        </div>
        <div>
          <label htmlFor="titulo">Foto:</label>
          <input
            value={product.picture}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="text"
            placeholder="Foto"
            name="picture"
            required
          />
        </div>
        <div>
          <p>Categoria do Produto</p>
          <select name="category" id="category" onChange={(e) => findCategoryById(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione uma Categoria</option>
            {categoryResponse.map((category) => (
              <>
                <option value={category.id} >{category.type}</option>
              </>
            ))}
          </select>
        </div>
        <button disabled={carregandoTema} type='submit'>
          {carregandoTema ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}