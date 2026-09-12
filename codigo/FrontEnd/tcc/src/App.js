import { Routes, Route } from 'react-router-dom';
import PaginaInicio from './pages/PaginaInicio.js';
import Calendario from './pages/Calendario.js';
import Classificacao from './pages/Classificacao.js';
import AtribuirNotas from './pages/AtribuirNotas.js';
import Inscricao from './pages/Inscricao.js';
import Materiais from './pages/Materiais.js';
import Paises from './pages/Paises.js';
import Clubes from './pages/Clubes.js';
import Usuario from './pages/Usuario.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/Calendario" element={<Calendario />} />
      <Route path="/Classificacao" element={<Classificacao />} />
      <Route path="/Classificacao/Atribuir" element={<AtribuirNotas />} />
      <Route path="/Inscricao" element={<Inscricao />} />
      <Route path="/Materiais" element={<Materiais />} />
      <Route path="/Paises" element={<Paises />} />
      <Route path="/Clubes" element={<Clubes /> } />
      <Route path="/Usuario" element={<Usuario />} />
    </Routes>
  );
  }
export default App;
