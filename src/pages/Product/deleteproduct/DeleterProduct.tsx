import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toastAlerta } from '../../../utils/toastAlert';
import { UserContext } from '../../../context/UserContext'
import IProduct from '../../../interfaces/IProduct'
import { get, deletar } from '../../../service/Service';

import './DeleterProduct.css'

export default function DeletarProduct() {
  const [product, setProduct] = useState<IProduct>({} as IProduct);

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { userResponse: {token}, handleLogout } = useContext(UserContext);

  async function findById(id: string) {
    try {
      await get(`/product/${id}`, setProduct, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  async function deletarPostagem() {
    try {
      await deletar(`/product/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      toastAlerta('Produto apagado com sucesso', 'sucesso')

    } catch (error) {
      toastAlerta('Erro ao apagar o Produto', 'erro')
    }

    navigate('/products')
  }


  return (
    <div className='flex flex-col justify-center items-center gap-5 bg-white rounded-md' id="container-deletar">
      <h1 className='text-3xl font-bold'>Deletar Produto</h1>
      <p className='text-2xl text-center'>Você tem certeza de que deseja apagar o <br/>Produto a seguir?</p>
      <div>
        <header className='text-xl text-center'><b>Nome do Produto:</b> <br />  {product.name}</header>
        <div className='flex justify-center p-10'>
            <img src={product.picture} alt="Imge Product" id="img-delete"/>
        </div>
        <div className='text-center'>
          <p className='text-xl'><b>Data de Validade:</b>  {product.expirationDate}</p>
          <p className='text-xl'><b>Valor:</b> R${product.value}</p>
        </div>
        <div className='flex justify-around p-4'>
          <button className='bg-red-600 rounded-md font-bold px-5 py-2 hover:underline' onClick={() => navigate('/products')}>Não</button>
          <button className='bg-green-500 rounded-md font-bold px-5 hover:underline' onClick={deletarPostagem}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}
