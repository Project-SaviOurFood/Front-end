import { useContext } from "react"
import { GeneralContext } from "../context/GeneralContext";

function SearchFilter() {

const {productResponse, categoryResponse, setFilterProducts} = useContext(GeneralContext);


const filterSearch = (search: string) => {
    setFilterProducts(productResponse.filter((product) => product.category?.type == search))
}

  return (
    <>
        <header>
            <ul>
                <div>
                    <li onClick={() => setFilterProducts(productResponse)} className="text-red-600">TODOS</li>
                </div>
                <section>
                    {categoryResponse.map(({type, id}) => (
                        <div key={id}>
                            <li onClick={() => filterSearch(type)}>{type}</li>
                        </div>
                    ))}
                </section>
            </ul>
        </header>


    
    </>
  )
}

export default SearchFilter;