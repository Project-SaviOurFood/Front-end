import { useContext, useEffect } from "react"
import { GeneralContext } from "../../context/GeneralContext"
import NavBar from "../../components/navbar/NavBar";
import CardCategory from "../../components/CardCategory";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Category() {
const {categoryResponse, getCategories} = useContext(GeneralContext);
const {userResponse: {token}} = useContext(UserContext);
const navigate = useNavigate();

useEffect(() => {
    if (token === "") {
        alert('Dados inconsistentes. Verifique as informações de cadastro.')
        navigate("/login")
    }
}, [token])

useEffect(() => {
    getCategories();
}, [])


return (
    <>
    <NavBar buttonCategory={true} />
    <section>
        <h1>Categorias</h1>
    </section>
    <section>
        {categoryResponse.map(({type, description, id}) => (
            <CardCategory categories={{type, description, id}} />
        ))}
    </section>
    </>

  )
}