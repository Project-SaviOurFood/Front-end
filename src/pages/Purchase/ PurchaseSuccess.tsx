import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";

export default function PurchaseSuccess() {
  const { cart, total, ong, setCart, setTotal } = useContext(GeneralContext);
  const {
    userResponse: { token },
    handleLogout,
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
      <NavBar />
      <section className="flex flex-col items-center p-8 w-4/5 text-center rounded-md shadow-md bg-white mx-80">
            <section className="flex justify-end flex-col">
            <h2 className="font-bold flex justify-center mx-20 text-2xl">Compra Finalizada com Sucesso</h2>
            <img
             className="flex mr-0 -mt-9"
                src="src/assets/verificado.png"
                alt="Success purchase"
                width={55}
                height={55}
            />
            </section>
            <section>
            {cart.map(({ name, picture, value }) => (
                <div>
                <img src={picture} alt="Image Product" className="flex justify-center align-center h-full flex-col w-20 mx-80 my-4" />
                <h2 className="my-4 text-2xl">{name}</h2>
                <p className="hover:no-underline opacity-80 font-bold text-2xl">Valor Unitário: R${value} </p>
                </div>
            ))}
            <section className="mb-4">
            <span className="my-4 hover:no-underline opacity-80 font-bold text-2xl"> Total: R${total}</span>
            </section>
           
            </section>
            <section className=" hover:no-underline opacity-80 font-bold">
            <h2 className="text-2xl">Instituição de Destino: {ong}</h2>
            <h3 className="mb-4 text-2xl">Valor destinado a Doação: R${(total * 0.1).toFixed(2)}</h3>
            </section>
            <section>
            <button
                className="bg-vermelho w-36 p-2 rounded text-amarelo m-5"
                type="button"
                onClick={() => {
                setCart([]);
                setTotal(0);
                navigate("/products");
                }}
            >
                Voltar
            </button>
            <button
                className="bg-vermelho w-36 p-2 rounded text-amarelo m-5"
                type="button"
                onClick={() => {
                setCart([]);
                setTotal(0);
                handleLogout();
                }}
            >
                Sair
            </button>
            </section>
      </section>
    </div>
  );
}
