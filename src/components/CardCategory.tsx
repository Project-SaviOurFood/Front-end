import { Link } from "react-router-dom"

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
    <div>
      <header>{type}</header>
      <p>{description}</p>
      <div className="flex">
        <Link to={`/editCategory/${id}`}>
          <button>Editar</button>
        </Link>
        <Link to={`/deleteCategory/${id}`}>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}