// src/pages/PaginaInicio.jsx
import Layout from '../components/layout';
import '../Style/PaginaInicio.css';
import '../Style/Global.css';

function PaginaInicio() {
  return (
    <Layout>
      <h1>Início</h1>
      <div className="photo-box">
        <img src="/assets/ImagemIntercambistas1.jpg" alt="Grupo Rotary" />
      </div>
    </Layout>
  );
}

export default PaginaInicio;
