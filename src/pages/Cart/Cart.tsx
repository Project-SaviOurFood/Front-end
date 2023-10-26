import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import CartCard from "../../components/CartCard";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import instituicoes from "../../utils/instituicoes";
import NavBar from "../../components/navbar/NavBar";

export default function Cart() {
  const { cart, total, setOng, ong } = useContext(GeneralContext);
  const {
    userResponse: { token },
  } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
      alert("Dados inconsistentes. Verifique as informações de cadastro.");
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="">
      <NavBar />    
        <div className="flex  flex-col justify-center mt-4">
        <h1 className="flex justify-center text-3xl font-bold">Carrinho</h1>     
          <div className="flex flex-col items-center bg-white rounded-md" id="container-cart">
            {cart.map(({ id, name, picture, value, quantity }) => (
              <CartCard productInfo={{ id, name, picture, value, quantity }} />
            ))}
            <h2 className="mt-4 text-xl font-semibold">Escolha a instituição que deseja ajudar!!!</h2>
            <p className="text-2xl font-bold">Total: R${total.toFixed(2)}</p>
            <select
              className="my-4 mb-6 font-semibold text-xl px-0 bg-gray-200 rounded-md"
              name="select"
              value={ong}
              id="select"
              onChange={({ target: { value } }) => setOng(value)}
            >
              {instituicoes.map((ong) => (
                <option value={ong}>{ong}</option>
              ))}
            </select>
            <section className="mb-4">
              <button
                disabled={cart.length == 0}
                onClick={() => navigate("/finish")}
                className="bg-vermelho w-36 p-2 rounded text-amarelo hover:underline"
                id="botaoFinalizar"
              >
                Finalizar Compra
              </button>
            </section>
          </div>
        </div>
      </div>


  );
}
