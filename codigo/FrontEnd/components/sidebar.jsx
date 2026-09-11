// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import './Style/Sidebar.css'; // se tiver estilos

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/assets/Logo4510.png" alt="Rotary" className="logo-img" />
      </div>

      <nav className="menu">
        <ul>
          <li><Link to="/"><i className="fas fa-home"></i> Início</Link></li>
          <li><Link to="/calendario"><i className="fas fa-calendar-alt"></i> Calendário</Link></li>
          <li><Link to="/classificacao"><i className="fas fa-chart-bar"></i> Classificação</Link></li>
          <li><Link to="/inscricao"><i className="fas fa-edit"></i> Inscrição</Link></li>
          <li><Link to="/materiais"><i className="fas fa-book"></i> Materiais</Link></li>
          <li><Link to="/paises"><i className="fas fa-globe"></i> Países</Link></li>
          <li><Link to="/clubes"><i className="fas fa-users"></i> Clubes</Link></li>
          <li><Link to="/vagas"><i className="fas fa-briefcase"></i> Vagas</Link></li>
        </ul>
      </nav>

      <div className="profile">
        <i className="fas fa-user-circle fa-2x"></i>
        <a href="#">Marco Antonio <i className="fas fa-sign-out-alt"></i></a>
      </div>
    </aside>
  );
}

export default Sidebar;
