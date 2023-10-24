import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toastAlerta } from '../../utils/toastAlert';
import { UserContext } from '../../context/UserContext'
import IProduct from '../../interfaces/IProduct'
import { get, deletar } from '../../service/Service';

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
    <div>
      <h1>Deletar Produto</h1>
      <p>Você tem certeza de que deseja apagar o Produto a seguir?</p>
      <div>
        <header><b>Nome do Produto:</b>  {product.name}</header>
        <div>
            <img src={product.picture} alt="Imge Product" />
        </div>
        <div>
          <p><b>Data de Validade:</b>  {product.expirationDate}</p>
          <p><b>Valor:</b> {product.value}</p>
        </div>
        <div>
          <button onClick={() => navigate('/products')}>Não</button>
          <button onClick={deletarPostagem}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}
