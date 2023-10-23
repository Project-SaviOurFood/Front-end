import { useContext } from "react"
import { GeneralContext } from "../../context/GeneralContext";
import './SearchFilter.css'

function SearchFilter() {

const {productResponse, categoryResponse, setFilterProducts} = useContext(GeneralContext);


const filterSearch = (search: string) => {
    setFilterProducts(productResponse.filter((product) => product.category?.type == search))
}

  return (
    <>
        <header className="flex items-center px-6 h-1">
            <ul className="flex ">
                    <li onClick={() => setFilterProducts(productResponse)} id="todos" className="text-vermelho cursor-pointer font-extrabold">TODOS</li>
                    <div className="flex gap-10">    
                    {categoryResponse.map(({type, id}) => (     
                            <li key={id} className="cursor-pointer border-r pr-10 text-vermelho font-normal" onClick={() => filterSearch(type)}>{type}</li>
                    ))}
                    </div>  
            </ul>
        </header>
    </>
  )
}

export default SearchFilter;