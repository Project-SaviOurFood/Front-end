import { useContext, useEffect } from "react"
import { GeneralContext } from "../context/GeneralContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function PurchaseSuccess() {
    const {cart, total, ong, setCart, setTotal} = useContext(GeneralContext);
    const {userResponse: {token}, handleLogout} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token === "") {
          alert('Dados inconsistentes. Verifique as informações de cadastro.')
          navigate("/login")
        }
      }, [token])
    
    return (
        <div>
            <NavBar />
            <section>
                <img src="src/assets/verificado.png" alt="Success purchase" width={150} height={150} />
                <h1>Compra Finalizada com Sucesso</h1>
            </section>
            <section>
                {cart.map(({name, picture, value}) => (
                    <div>
                        <img src={picture} alt="Image Product" />
                        <h2>{name}</h2>
                        <p>Valor Unitário: R${value} </p>
                    </div>
                ))}
                <span> Total: R${total}</span>
            </section>
            <section>
                <h2>Instituição de Destino: {ong}</h2>
                <h3>Valor destinado a Doação: R${(total*0.1).toFixed(2)}</h3>
            </section>
            <section>
                <button type="button" onClick={() => {
                    setCart([]);
                    setTotal(0);
                    navigate('/products');
                    }}>Voltar</button>
                <button type="button" onClick={() => {
                    setCart([])
                    setTotal(0);
                    handleLogout()
                    }}>Sair</button>
            </section>
        </div>
    )
}