import { useState, useEffect, useRef } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import HeaderHome from "../../components/HeaderHome";
import mockCategories from "../../utils/mockCategories";

export default function Home() {
  const carousel = useRef<HTMLDivElement | any>(null);
  const [width, setWidth] = useState(0);
  const [selectedText, setSelectedText] = useState("NOSSA MISSÃO");

  const [isTeamSelected, setIsTeamSelected] = useState(false);
  const [isMissionSelected, setIsMissionSelected] = useState(true);
  const [isCommunitySelected, setIsCommunitySelected] = useState(false);

  const handleImageClick = (text) => {
    if (text === "NOSSA EQUIPE") {
      setIsTeamSelected(true);
      setIsMissionSelected(false);
      setIsCommunitySelected(false);
    } else if (text === "NOSSA MISSÃO") {
      setIsTeamSelected(false);
      setIsMissionSelected(true);
      setIsCommunitySelected(false);
    } else if (text === "NOSSA COMUNIDADE") {
      setIsTeamSelected(false);
      setIsMissionSelected(false);
      setIsCommunitySelected(true);
    }

    setSelectedText(text);
  };

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  return (
    <>
      <HeaderHome />
      <main className="max-w-screen-2xl">
        <section className="ml-36 flex mt-20">
          <h2 className="text-5xl font-bold leading-tight">
            SAVI <br /> OUR <br /> FOOD
          </h2>
          <p className="ml-12 mt-5 max-w-md text-center text-lg font-medium">
            Juntos, podemos reduzir o desperdício de alimentos, economizar
            dinheiro e, mais importante, fazer a diferença na vida daqueles que
            precisam.
          </p>
        </section>

        <section className="app mt-16 ml-32">
          <motion.div
            ref={carousel}
            className="carousel"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              className="inner flex"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              {mockCategories.map((category) => (
                <motion.div className="item" key={category.id}>
                  <h3>{category.type}</h3>
                  <img src={category.image} alt="Images" />
                  <p>{category.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section
          id="about"
          className="flex flex-col justify-center items-center mt-16"
        >
          <div className="w-3/5 text-center">
            <h3 className="text-xl font-bold">SOBRE</h3>
            <p className="mt-3">
              No Save Our Food, estamos comprometidos com uma causa que é tanto
              simples quanto profundamente significativa: reduzir o desperdício
              de alimentos enquanto ajudamos a alimentar aqueles que mais
              precisam. Acreditamos que cada alimento merece uma segunda chance,
              e é por isso que criamos esta plataforma.
            </p>
          </div>
        </section>
        <section className="flex justify-center mt-16">
          <div className="flex flex-col items-center p-8 w-4/5 text-center rounded-md shadow-md bg-lime-200">
            <div className="flex">
              <div
                onClick={() => handleImageClick("NOSSA EQUIPE")}
                className={isTeamSelected ? "selected" : ""}
              >
                <img src="src/assets/team.png" alt="" className="icon" />
              </div>
              <div
                onClick={() => handleImageClick("NOSSA MISSÃO")}
                className={isMissionSelected ? "selected" : ""}
              >
                <img
                  src="src/assets/rede-global 1.png"
                  alt="Icon general"
                  className="icon"
                />
              </div>
              <div
                onClick={() => handleImageClick("NOSSA COMUNIDADE")}
                className={isCommunitySelected ? "selected" : ""}
              >
                <img src="src/assets/community.png" alt="" className="icon" />
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold">{selectedText}</h3>
            <motion.div
              className="mt-6 w-4/5 h-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedText === "NOSSA EQUIPE" &&
                `Nossa equipe é formada por indivíduos dedicados e apaixonados que compartilham a visão de reduzir o desperdício de alimentos e fazer a diferença. Cada membro da nossa equipe traz sua experiência e entusiasmo para criar uma plataforma que une pessoas e alimentos em prol de um mundo melhor. Juntos, trabalhamos incansavelmente para alcançar nosso objetivo e transformar vidas.`}
              {selectedText === "NOSSA MISSÃO" &&
                `Nossa missão é dupla: combater o desperdício de alimentos e
              promover a solidariedade em nossas comunidades. Sabemos que
              toneladas de alimentos perfeitamente bons são descartados todos os
              dias, enquanto muitas pessoas lutam para ter o que comer. No
              Brasil, estima-se que cerca de um terço de todos os alimentos
              produzidos seja desperdiçado, o que equivale a aproximadamente 30%
              de toda a produção alimentar do país. Globalmente, bilhões de
              toneladas de alimentos são desperdiçadas anualmente, representando
              cerca de 33% de toda a comida produzida em todo o mundo. Diante
              desses números alarmantes, decidimos agir e criar uma solução que
              beneficie a todos. `}
              {selectedText === "NOSSA COMUNIDADE" &&
                `Nossa comunidade é o coração do Save Our Food. São pessoas como você, preocupadas com o desperdício de alimentos e dispostas a agir. Juntos, formamos uma rede global de indivíduos, organizações e voluntários dedicados a combater o desperdício de alimentos e ajudar aqueles que mais precisam. Junte-se a nós e faça parte desta comunidade comprometida em fazer a diferença.`}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
