import ReactModal from 'react-modal';
import { Link } from "react-router-dom"
import "./Category.css"
import { useContext } from 'react';
import DeleteCategory from '../../pages/Categories/DeleteCategory';
import { GeneralContext } from '../../context/GeneralContext';

type ICategoryInfo = {
    categories: {
        id: number,
        type: string,
        description: string,
    }
}


export default function CardCategory({
    categories: {
        id,
        type,
        description
    }}: ICategoryInfo) {
const {isOPen, setIsOpen} = useContext(GeneralContext);

return (
  <div className="mx-4 my-2 shadow-md w-11/12 min">
    <ReactModal isOpen={isOPen}
    style={{overlay: {
      backgroundColor: 'transparent'
    },
      content: {
      top: '50%',
      left: '50%',
      width: '500px',
      height: '500px',
      translate: '-50% -50%'

    }}}>
      <DeleteCategory />
    </ReactModal>
    <header className="font-semibold text-lg px-8">{type}</header>
      <p className="italic px-4 w-10/12">{description}</p>
      <div className="flex justify-end mx-4">
        <Link to={`/editCategory/${id}`} >
          <button >Editar</button>
        </Link>
        <Link to={`/deleteCategory/${id}`}>
          <button className="ml-8" onClick={() => setIsOpen(true)} >Deletar</button>
        </Link>
      </div>
    </div>
  )
}