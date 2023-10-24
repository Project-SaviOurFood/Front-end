import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toastAlerta } from '../../../utils/toastAlert';
import { UserContext } from '../../../context/UserContext';
import ICategory from '../../../interfaces/ICategory';
import { deletar, get } from '../../../service/Service';
import { GeneralContext } from '../../../context/GeneralContext';

import './DeleteCategory.css'

export default function DeleteCategory() {
    const [category, setCategory] = useState<ICategory>({} as ICategory)

    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const {userResponse: {token} , handleLogout } = useContext(UserContext);
    const {setIsOpen, getCategories } = useContext(GeneralContext);

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

            toastAlerta('Category apagado com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao apagar o Tema', 'erro')
        }

        setIsOpen(false)
        getCategories();
        navigate('/categories')
    }
    return (
        <div className='flex flex-col justify-center items-center h-full gap-10 w-3/4' id="container-delete">
            <h1 className='font-bold text-4xl '>Deletar tema</h1>
            <p className='text-2xl text-ident'>Você tem certeza de que deseja apagar Categoria a seguir?</p>
            <div className='text-xl flex flex-col justify-center items-center gap-10'>
                <header className='text-center mb-3'><b>Categoria:</b> <br />{category.type}</header>
                <p className='text-center'><b>Descrição da Categoria</b> <br />{category.description}</p>
                <div className="flex gap-10">
                    <button onClick={() => setIsOpen(false)} className='bg-red-600 rounded-md font-bold px-5 py-2 hover:underline'>Não</button>
                    <button onClick={() => deleteCategory()} className='bg-green-500 rounded-md font-bold px-5 hover:underline'>Sim</button>
                </div>
            </div>
        </div>
    )
}
