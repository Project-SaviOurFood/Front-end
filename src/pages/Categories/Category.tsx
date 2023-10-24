import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import NavBar from "../../components/navbar/NavBar";
import CardCategory from "../../components/category/CardCategory";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import FormCategory from "./formcategory/FormCategory";
import "../../components/category/category.css";

export default function Category() {
  const { categoryResponse, getCategories } = useContext(GeneralContext);
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <NavBar buttonCategory={true} />
      <div className="max ml-2 flex ">
        <section className="sidebar mx-4">
          <FormCategory />
        </section>
        <div className="border hmin">
          <section className="flex justify-center font-bold text-lg">
            <h1>Lista de categorias</h1>
          </section>
        <section className="">
            {categoryResponse.map(({ type, description, id }) => (
              <CardCategory categories={{ type, description, id }} />
            ))}{" "}
          </section>
        </div>
      </div>
    </>
  );
}
