import Layout from '../components/layout.js';
import '../style/Materiais.css';
import '../style/Global.css';

function Materiais() {
  return (
    <Layout>
      <h1 className="section-header">Materiais</h1>
      <p>Os materiais para download ainda não estão disponíveis nesta versão.</p>

      <section className="materiais-section">
        <div className="materiais-grid">

          <div>
            <div className="material-card">
              <img src="/images/PlaceholderMateriais.png" alt="Imagem do material" />
              <span>Exemplo de prova</span>
            </div>
          </div>
          <div>
            <div className="material-card">
              <img src="/images/PlaceholderMateriais.png" alt="Imagem do material" />
              <span>Cartão de visitas</span>
            </div>
          </div>
          <div>
            <div className="material-card">
              <img src="/images/PlaceholderMateriais.png" alt="Imagem do material" />
              <span>Noções básicas de Rotary</span>
            </div>
          </div>
          <div>
            <div className="material-card">
              <img src="/images/PlaceholderMateriais.png" alt="Imagem do material" />
              <span>Estudos sobre civismo</span>
            </div>
          </div>
          <div>
            <div className="material-card">
              <img src="/images/PlaceholderMateriais.png" alt="Imagem do material" />
              <span>Regras distritais do distrito 4510 - 2025</span>
            </div>
          </div>
          <div>
            <div className="material-card">
              <img src="/images/PlaceholderMateriais.png" alt="Imagem do material" />
              <span>Manual do intercambista</span>
            </div>
          </div>
          <div>
            <div className="material-card">
              <img src="/images/PlaceholderMateriais.png" alt="Imagem do material" />
              <span>Uniforme feminino</span>
            </div>
          </div>
          <div>
            <div className="material-card">
              <img src="/images/PlaceholderMateriais.png" alt="Imagem do material" />
              <span>Uniforme masculino</span>
            </div>
          </div>
        </div>
      </section>


    </Layout>
  );
}

export default Materiais