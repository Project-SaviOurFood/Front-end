import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toastAlerta } from '../../utils/toastAlert';
import { UserContext } from '../../context/UserContext';
import ICategory from '../../interfaces/ICategory';
import { deletar, get } from '../../service/Service';
import { GeneralContext } from '../../context/GeneralContext';

export default function DeleteCategory() {
    const [category, setCategory] = useState<ICategory>({} as ICategory)

    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const {userResponse: {token} , handleLogout } = useContext(UserContext);
    const {getCategories } = useContext(GeneralContext);

    async function findById(id: string) {
        try {
            await get(`/category/${id}`, setCategory, {
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

    async function deleteCategory() {
        try {
            await deletar(`/category/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Tema apagado com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao apagar o Tema', 'erro')
        }

        navigate('/categories')
    }
    return (
        <div>
            <h1>Deletar tema</h1>
            <p >Você tem certeza de que deseja apagar Categoria a seguir?</p>
            <div>
                <header>{category.type}</header>
                <p>{category.description}</p>
                <div className="flex">
                    <button onClick={() => navigate('/categories')}>Não</button>
                    <button onClick={() => {
                        deleteCategory();
                        getCategories();
                    }}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}
