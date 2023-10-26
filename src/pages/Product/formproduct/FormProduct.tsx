import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';;
import { toastAlerta } from '../../../utils/toastAlert';
import { UserContext } from '../../../context/UserContext';
import ICategory from '../../../interfaces/ICategory';
import { GeneralContext } from '../../../context/GeneralContext';
import { get, post, put } from '../../../service/Service';
import IProduct from '../../../interfaces/IProduct';
import Legumes from '../../../assets/legumes.png'
import './FormProduct.css'


export default function FormProduct() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { userResponse, handleLogout } = useContext(UserContext);
  const { getCategories, categoryResponse, getProducts } = useContext(GeneralContext);

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
        toastAlerta('Produto atualizado com sucesso', 'sucesso');
        await getCategories();
        navigate('/products');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar o Produto', 'erro');
        }
      }
    } else {
      try {
        await post(`/product`, product, setProduct, {
          headers: {
            Authorization: userResponse.token,
          },
        });
        toastAlerta('Produto cadastrado com sucesso', 'sucesso');
        navigate('/products')
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao cadastrar O Produto', 'erro');
        }
      }
    }
   getProducts(); 
  }

  const carregandoTema = category.description === '';

  return (
      <div className="flex items-center justify-center bg-white rounded-md pt-1" id="principal">

        <div>

          <img src={Legumes} alt="legumixx" />

        </div>

        <form id="form" onSubmit={newProduct} className='m-3 text-xl'>
          <h1 className='font-bold text-4xl text-center mb-10'>{id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
          <div className='p-2'>
            <label htmlFor="name">Nome</label>
            <input
              className='pl-2 w-full'
              value={product.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              type="text"
              placeholder="Name"
              name="name"
              required
            />
          </div>
          <div className='p-2'>
            <label htmlFor="expirationDate">Data de Validade</label>
            <input
              className='pl-2 w-full'
              value={product.expirationDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              type="text"
              placeholder="Data"
              name="expirationDate"
              required
            />
          </div>
          <div className='p-2 '>
            <label htmlFor="value">Valor R$</label>
            <input
              className='pl-2 w-full'
              value={product.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              type="number"
              placeholder="Valor"
              name="value"
              required
            />
          </div>
          <div className='p-2'>
            <label htmlFor="picture">Foto</label>
            <input
              className='pl-2 w-full'
              value={product.picture}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              type="text"
              placeholder="Foto"
              name="picture"
              required
            />
          </div>
          <div className='p-3 flex gap-9'>
            <p className='font-semibold'>Categoria do Produto:</p>
            <select className='bg-gelo rounded p-2 flex' name="category" id="category" onChange={(e) => findCategoryById(e.currentTarget.value)}>
              <option value="" selected disabled>Selecione uma Categoria</option>
              {categoryResponse.map((category) => (
                <>
                  <option value={category.id} >{category.type}</option>
                </>
              ))}
            </select>
          </div>
          <button  className={carregandoTema ? 'rounded-md p-3 font-semibold bg-slate-300 opacity-60' : 'rounded-md p-3 font-semibold bg-vermelho' } disabled={carregandoTema} type='submit'>
            {id !== undefined ? 'Editar' : 'Cadastrar'}
          </button>
        </form>
      </div>

  );
}


