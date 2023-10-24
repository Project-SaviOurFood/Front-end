import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";
import ".././pages/Cart/CartStyle.css";

type ICartInfo = {
  productInfo: {
    id: number;
    name: string;
    picture: string;
    value: number;
    quantity: number;
  };
};

export default function CartCard({
  productInfo: { id, picture, name, value, quantity },
}: ICartInfo) {
  const [qtd, setQtd] = useState<number>(quantity);
  const { cart, setCart, setTotal } = useContext(GeneralContext);

  const deleteProductCart = (id: number) => {
    const newCart = cart.filter((cart) => cart.id != id);
    setCart(newCart);
  };

  const sumTotal = () => {
    let total = 0;
    cart.forEach(({ value, quantity }) => {
      total += quantity * value;
    });
    setTotal(total);
  };

  const updateQuantity = () => {
    const index = cart.findIndex((cart) => cart.id == id);
    cart[index].quantity = qtd;
  };

  useEffect(() => {
    updateQuantity();
    sumTotal();
  }, [cart.length, qtd]);

  return (
    <div>
      <section>
        <label htmlFor="image" >
          <input
          className="object-contain"
            id="image"
            type="image"
            name="image"
            src={picture}
            alt="Image Product"
            width={150}
            height={150}
          />
        </label>
      </section>
      <h2>{name}</h2>
      <section>
        <h4>R$ {value.toFixed(2)}</h4>
      </section>
      <section className="flex justify-center ">
        <button
          type="button"
          onClick={() => setQtd(qtd + 1)}
          className="botaoMais"
        >
          +
        </button>
        <p className="mx-4">{qtd}</p>
        <button
          type="button"
          onClick={() => setQtd(qtd - 1)}
          className="botaoMenos"
        >
          -
        </button>
      </section>

      <section className="my-12 flex items-center justify-center bg-vermelho">
     
          <button
            type="button"
            onClick={() => deleteProductCart(id)}
            className="bg-vermelho w-36 p-2 rounded text-amarelo mx-auto" 
            id="botaoFinalizar"
          >
            Excluir
          </button>
        
      </section>
    </div>
  );
}
