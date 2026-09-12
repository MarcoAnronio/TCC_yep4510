// src/components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import "../style/Sidebar.css";
import "../style/Global.css";

function Sidebar() {
  const navigate = useNavigate();

  // Recupera o usuário do localStorage (se houver)
  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem("usuario"));
  } catch {
    // Uma sessão inválida deve permitir que o usuário entre novamente.
  }

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("jwt_token");
    navigate("/usuario"); // redireciona para a tela de login
  };

  return (
    <aside className="sidebar">
      {/* LOGO ROTARY */}
      <div className="logo">
        <img src="/images/Logo4510.png" alt="Rotary" className="logo-img" />
      </div>

      {/* MENU */}
      <nav className="menu">
        <ul>
          <li>
            <Link to="/">
              <img src="/icons/Home.svg" alt="Início" className="icon" />
              Início
            </Link>
          </li>
          <li>
            <Link to="/calendario">
              <img
                src="/icons/Calendar.svg"
                alt="Calendário"
                className="icon"
              />
              Calendário
            </Link>
          </li>
          <li>
            <Link to="/classificacao">
              <img
                src="/icons/Ranking.svg"
                alt="Classificação"
                className="icon"
              />
              Classificação
            </Link>
          </li>
          <li>
            <Link to="/inscricao">
              <img src="/icons/Ficha.svg" alt="Inscrição" className="icon" />
              Inscrição
            </Link>
          </li>
          <li>
            <Link to="/materiais">
              <img
                src="/icons/Materiais.svg"
                alt="Materiais"
                className="icon"
              />
              Materiais
            </Link>
          </li>
          <li>
            <Link to="/paises">
              <img src="/icons/World.svg" alt="Países" className="icon" />
              Países
            </Link>
          </li>
          <li>
            <Link to="/clubes">
              <img src="/icons/Rotary.svg" alt="Clubes" className="icon" />
              Clubes
            </Link>
          </li>
        </ul>
      </nav>

      {/* PERFIL / USUÁRIO */}
      <div className="profile">
        <img src="/icons/User.svg" alt="Usuário" className="user-icon" />

        {usuario ? (
          <>
            <p className="user-name">{usuario.nome}</p>
            <button className="btn-logout" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/usuario" className="login-link">
            Usuário
          </Link>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
