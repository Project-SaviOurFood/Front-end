import { useContext, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";

type ICartInfo = {
    productInfo: {
        id: number
        name: string,
        picture: string,
        value: number,
        quantity: number
    }
}

export default function Cart({
    productInfo: {
        id,
        picture,
        name,
        value,
        quantity
         } }: ICartInfo) {
const [qtd, setQtd] = useState<number>(quantity);
const {cart, setCart} = useContext(GeneralContext);

const deleteProductCart = (id: number) => {
    const newCart =  cart.filter((cart) => cart.id != id)
    setCart(newCart);
}

    return (
        <div>
            <section>
                <h2>{name}</h2>
            </section>
            <section>
                <label htmlFor="image">
                    <input
                        id="image"
                        type="image"
                        name="image"
                        src={picture}
                        alt="Image Product" />
                </label>
            </section>
            <section>
                <h4>R$ {value.toFixed(2)}</h4>
            </section>
            <section>
                <button type="button" onClick={() => setQtd(qtd+1)}>+</button>
                <p>{qtd}</p>
                <button type="button" onClick={() => setQtd(qtd-1)}>-</button>
            </section>
            <section>
                <button type="button" onClick={() => deleteProductCart(id)}>Excluir</button>
            </section>
        </div>
    );
}