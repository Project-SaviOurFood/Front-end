 import HeaderHome from "../components/HeaderHome";
import mockCategories from "../utils/mockCategories";



export default function Home() {
    return (
        <>
        <HeaderHome />
        <main>
            <section> 
                <h2>Savi Our Food</h2>
                <p>Juntos, podemos reduzir o desperdício de alimentos, economizar dinheiro e, mais importante, fazer a diferença na vida daqueles que precisam.</p>
            </section>
            <section>
                {mockCategories.map((category) => [
                    <div>
                    <h3>{category.type}</h3>
                    <img src={category.image} alt="Images" />
                    <p>{category.description}</p>
                    </div>
                ])}
            </section>
            <section id="about">
                <h3>Sobre</h3>
                <p>No Save Our Food, estamos comprometidos com uma causa que é tanto simples quanto profundamente significativa: reduzir o desperdício de alimentos enquanto ajudamos a alimentar aqueles que mais precisam. Acreditamos que cada alimento merece uma segunda chance, e é por isso que criamos esta plataforma.</p>
            </section>
            <section>
                <img src="src/assets/rede-global 1.png" alt="Icon general" />
                <p>Nossa missão é dupla: combater o desperdício de alimentos e promover a solidariedade em nossas comunidades. Sabemos que toneladas de alimentos perfeitamente bons são descartados todos os dias, enquanto muitas pessoas lutam para ter o que comer. No Brasil, estima-se que cerca de um terço de todos os alimentos produzidos seja desperdiçado, o que equivale a aproximadamente 30% de toda a produção alimentar do país. Globalmente, bilhões de toneladas de alimentos são desperdiçadas anualmente, representando cerca de 33% de toda a comida produzida em todo o mundo. Diante desses números alarmantes, decidimos agir e criar uma solução que beneficie a todos.</p>
            </section>
        </main>
        </>
    )
}