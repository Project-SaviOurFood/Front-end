import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";
import Mais from "../assets/+.png";
import Menos from "../assets/-.png";
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
  <div className="my-4 hover:shadow-xl hover:rounded-md">
      <div className="flex flex-col items-center text-center">
        <section>
          <label htmlFor="image" >
            <input
              className="object-contain mt-2"
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
        <h2 className="font-bold p-3 w-3/5 text-xl">
          {name}
        </h2>
        <section>
          <h4 className="font-bold text-2xl mb-2">R$ {value.toFixed(2)}</h4>
        </section>
      </div>
      <section className="flex gap-3 items-center justify-center mb-16">
        <button id="mais" type="button" onClick={() => setQtd(qtd + 1)}>
          <img src={Mais} alt="Sinal de mais" />
        </button>
        <p className="mx-4 text-xl font-semibold">{qtd}</p>
        {qtd == 0 ? (
          ""
        ) : (
          <button id="menos" type="button" onClick={() => setQtd(qtd - 1)}>
            <img src={Menos} alt="Sinal de menos" />
          </button>
        )}
      </section>


      <section className="my-12 flex items-center justify-center bg-vermelho font-bold mt-9">
     
          <button
          className="hover:underline opacity-80"
            type="button"
            onClick={() => deleteProductCart(id)}
            
            id="botaoFinalizar"
          >
            Excluir
          </button>
        
      </section>
    </div>
  );
}
