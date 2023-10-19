import { useContext, useEffect } from "react"
import { GeneralContext } from "../context/GeneralContext"
import CartCard from "../components/CartCard";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { cart, total } = useContext(GeneralContext);
    const {userResponse: {token}} = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (token === "") {
          alert('Dados inconsistentes. Verifique as informações de cadastro.')
          navigate("/login")
        }
      }, [token])


    return (
        <div>
            <section>
            <section></section>
            <h1>Carrinho</h1>
            {cart.map(({ id, name, picture, value, quantity }) => (
                <section>
                    <CartCard productInfo={{ id, name, picture, value, quantity }} />
                </section>
            ))}
            </section>
            <section>
            <section>
                <p>Total R${total.toFixed(2)}</p>
            </section>
            <section>
                <button>Finalizar Compra</button>
            </section>
            </section>
        </div>
    )
}