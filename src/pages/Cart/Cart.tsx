import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import CartCard from "../../components/CartCard";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import instituicoes from "../../utils/instituicoes";
import NavBar from "../../components/NavBar";

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
    <div className="flex justify-center align-center h-full flex-col w-4/5">
      <NavBar/>
      <section className="flex flex-col items-center p-8 w-4/5 text-center rounded-md shadow-md bg-white mx-80">
        <h1>Carrinho</h1>
        {cart.map(({ id, name, picture, value, quantity }) => (
          <CartCard productInfo={{ id, name, picture, value, quantity }} />
        ))}
        <section>
          <section>
            <section className="-mr-9">
              <h2 className="font-bold flex justify-center" id="options">
                Escolha a instituição que deseja Ajudar!!!
              </h2>
              <select
                className="text-vermelho mt-12 "
                name="select"
                value={ong}
                id="select"
                onChange={({ target: { value } }) => setOng(value)}
              >
                {instituicoes.map((ong) => (
                  <option value={ong}>{ong}</option>
                ))}
              </select>
            </section>

            <div className="total">
              <section className="flex flex-col mt-12 mr-2" id="h22">
                <p className="mr-48">Total: R${total.toFixed(2)}</p>
              </section>
            </div>

            <div className="botao">
              <section className="flex flex-col justify-center items-end">
                <button
                  disabled={cart.length == 0}
                  onClick={() => navigate("/finish")}
                  className="bg-vermelho w-36 p-2 rounded text-amarelo"
                  id="botaoFinalizar"
                >
                  Finalizar Compra
                </button>
              </section>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}

