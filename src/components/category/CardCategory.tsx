import { Link } from "react-router-dom"
import "./Category.css"

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

return (
  <div className="mx-4 my-2 shadow-md w-11/12 min">
    <header className="font-semibold text-lg px-8">{type}</header>
      <p className="italic px-4 w-10/12">{description}</p>
      <div className="flex justify-end mx-4">
        <Link to={`/editCategory/${id}`} >
          <button >Editar</button>
        </Link>
        <Link to={`/deleteCategory/${id}`}>
          <button className="ml-8">Deletar</button>
        </Link>
      </div>
    </div>
  )
}