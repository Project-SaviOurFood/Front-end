import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";
import Mais from '../assets/+.png';
import Menos from '../assets/-.png';
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
    <div id="container-card" className="w-80 flex-col text-center content-start">
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
      <h2 id="title-product" className="font-bold p-3">{name}</h2>
      <section>
        <h4 className="font-bold">R$ {value.toFixed(2)}</h4>
      </section>
      <section className="flex gap-7 items-center justify-center">
        <button
          id="mais"
          type="button"
          onClick={() => setQtd(qtd + 1)}>
          <img src={Mais} alt="Sinal de mais" />        
          
        </button>
        <p className="mx-4">{qtd}</p>
        {qtd == 0 ?
                    ""
                    :
                    <button
                    id="menos"
                    type="button"
                    onClick={() => setQtd(qtd - 1)}>
                    <img src={Menos} alt="Sinal de menos" />                  
                    
                  </button>
                    }
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
