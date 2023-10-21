import { useContext, useEffect } from "react"
import { GeneralContext } from "../../context/GeneralContext"
import CartCard from "../../components/CartCard";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import instituicoes from "../../utils/instituicoes";
import NavBar from "../../components/NavBar";

export default function Cart() {
    
    const { cart, total, setOng, ong } = useContext(GeneralContext);
    const { userResponse: { token } } = useContext(UserContext)
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
                <h1>Carrinho</h1>
                {cart.map(({ id, name, picture, value, quantity }) => (
                        <CartCard productInfo={{ id, name, picture, value, quantity }} />
                ))}
            </section>
            <section>
                <section>
                    <h2>Escolha a instituição que deseja Ajudar!!!</h2>
                        <select
                            name="select"
                            value={ong}
                            id="select"
                            onChange={({ target: { value } }) => setOng(value)}>
                            {instituicoes.map((ong) => (
                                <option value={ong}>{ong}</option>
                            ))}
                        </select>
                </section>
                <section>
                    <p>Total: R${total.toFixed(2)}</p>
                </section>
                <section>
                    <button disabled={cart.length == 0} onClick={() => navigate('/finish')}>Finalizar Compra</button>
                </section>
            </section>
        </div>
    )
}