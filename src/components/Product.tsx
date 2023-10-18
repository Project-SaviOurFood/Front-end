import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import ICart from "../interfaces/ICart";

type ICardsInfo = {
    productInfo: {
        name: string,
        picture: string,
        value: number,
        expirationDate: Date,
        id: number
    }
}

export default function Product({
    productInfo: {
        picture,
        name,
        value,
        expirationDate,
        id } }: ICardsInfo) {
    const [quantity, setQuantity] = useState<number>(0);
    const navigate = useNavigate();

    const {cart, setCart} = useContext(GeneralContext);

    const addCart = ({id, name, picture, value, quantity}: ICart) => {
        setCart([
            ...cart,
            {id ,name, picture, value, quantity}
        ])
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
                        alt="Image Product"
                        onClick={() => navigate('/product/' + id)} />
                </label>
            </section>
            <section>
                <h4>R$ {value.toFixed(2)}</h4>
            </section>
            <section>
                <p>
                    {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(expirationDate))}
                </p>
            </section>
            <section>
                <button type="button" onClick={() => setQuantity(quantity+1)}>+</button>
                <p>{quantity}</p>
                <button type="button" onClick={() => setQuantity(quantity-1)}>-</button>
                <button type="button" onClick={() => addCart({id, name, picture, value, quantity})} >Adicionar ao Carrinho</button>
            </section>
        </div>
    );
}