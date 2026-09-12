import Layout from '../components/layout.js';
import '../style/Paises.css';
import '../style/Global.css';

function Paises() {
  return (
    <Layout>
      <h1 className="section-header">Países</h1>

      <section className="paises-section">
        <h2>Europa</h2>
        <div className="bandeiras-grid">
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/de.png" alt="Alemanha" />
            <span> <a href='https://www.rotary-austausch.de/welcome-inbounds/'>Alemanha</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/be.png" alt="Bélgica" />
            <span>Bélgica</span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/dk.png" alt="Dinamarca" />
            <span> <a href='https://blog.rotary.org/2016/02/01/a-south-africans-youth-exchange-to-denmark/'>Dinamarca</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/es.png" alt="Espanha" />
            <span> <a href='https://blog.rotary.org/2021/07/22/my-rotary-youth-exchange-to-spain/'>Espanha</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/fi.png" alt="Finlândia" />
            <span> <a href='https://rye.fi/en/rotex-en/experiences-and-stories/'>Finlândia</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/fr.png" alt="França" />
            <span> <a href='https://www.countryreports.org/country/france/fact.htm'>França</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/hu.png" alt="Hungria" />
            <span> <a href='https://www.rye6970.org/2023-24-sam-outbound-to-hungary-sept-20-2023/'>Hungria</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/it.png" alt="Itália" />
            <span><a href='https://www.countryreports.org/country/italy/fact.htm'>Itália</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/nl.png" alt="Holanda" />
            <span><a href='https://www.countryreports.org/country/Netherlands.htm'>Holanda</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/se.png" alt="Suécia" />
            <span><a href='https://www.countryreports.org/country/Sweden.htm'>Suécia</a></span>
          </div>
        </div>

        <h2>América</h2>
        <div className="bandeiras-grid">
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/ca.png" alt="Canadá" />
            <span><a href='https://www.countryreports.org/country/Canada.htm'>Canadá</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/us.png" alt="Estados Unidos" />
            <span> <a href='https://www.countryreports.org/country/UnitedStatesofAmerica.htm'>Estados Unidos</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/mx.png" alt="México" />
            <span><a href='https://www.countryreports.org/country/Mexico.htm'>México</a></span>
          </div>
        </div>

        <h2>Ásia/Oceania</h2>
        <div className="bandeiras-grid">
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/au.png" alt="Austrália" />
            <span><a href='https://www.countryreports.org/country/Australia.htm'>Austrália</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/kr.png" alt="Coreia do Sul" />
            <span><a href='https://www.countryreports.org/country/KoreaSouth.htm'>Coreia do Sul</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/in.png" alt="Índia" />
            <span><a href='https://www.countryreports.org/country/India.htm'>Índia</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/id.png" alt="Indonésia" />
            <span><a href='https://www.countryreports.org/country/Indonesia.htm'>Indonésia</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/jp.png" alt="Japão" />
            <span><a href='https://www.countryreports.org/country/Japan.htm'>Japão</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/nz.png" alt="Nova Zelândia" />
            <span><a href='https://www.countryreports.org/country/NewZealand.htm'>Nova Zelândia</a></span>
          </div>
          <div className="bandeira-card">
            <img src="https://flagcdn.com/w80/tw.png" alt="Taiwan" />
            <span><a href='https://www.countryreports.org/country/Taiwan.htm'>Taiwan</a></span>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Paises;
