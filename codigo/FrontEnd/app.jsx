// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import PaginaInicio from 'pages/paginainicio';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      {/* outras rotas futuramente */}
    </Routes>
  );
}

export default App;
