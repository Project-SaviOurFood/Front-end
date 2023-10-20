import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContext";
import ICart from "../../interfaces/ICart";
import Cart from '../../assets/cart.png';
import Mais from '../../assets/+.png';
import Menos from '../../assets/-.png';
import './ProductCard.css';

type ICardsInfo = {
    productInfo: {
        name: string,
        picture: string,
        value: number,
        expirationDate: string,
        id: number
    }
}

export default function ProductCard({
    productInfo: {
        picture,
        name,
        value,
        expirationDate,
        id } }: ICardsInfo) {
    const [quantity, setQuantity] = useState<number>(1);
    const navigate = useNavigate();

    const { cart, setCart } = useContext(GeneralContext);

    const addCart = ({ id, name, picture, value, quantity }: ICart) => {
            setCart([
                ...cart,
                { id, name, picture, value, quantity }
            ])
    }

    useEffect(() => {
        console.log(cart)
    }, [cart])

    return (
        <div id="container-card" className="w-80 flex-col text-center content-start mt-11">
            <section className="">
                <h2 className="font-bold p-3">{name}</h2>
            </section>
            <section>
                <label htmlFor="image">
                    <input
                        id="image"
                        type="image"
                        name="image"
                        src={picture}
                        alt="Image Product"
                        onClick={() => navigate('/product/' + id)}
                        width={170}
                        height={190} />
                </label>
            </section>
            <section className="p-4">
                <h4 className="font-bold">R$ {value.toFixed(2)}</h4>
            </section>
            <section>
                <p className="font-bold mb-1">
                    {expirationDate}
                </p>
            </section>
            <section className="flex gap-7 items-center justify-center">
                <button id="menos" type="button" onClick={() => setQuantity(quantity - 1)}><img src={Menos} alt="Sinal de menos" /></button>
                <p className="font-bold text-cinza bg-gelo w-20 p-1 rounded-lg">{quantity}</p>
                <button id="mais" type="button" onClick={() => setQuantity(quantity + 1)}><img src={Mais} alt="Sinal de mais" /></button>
                <button id="carrinho" type="button" onClick={() => addCart({ id, name, picture, value, quantity })} ><img src={Cart} alt="carrinho" /></button>
            </section>
        </div>
    );
}