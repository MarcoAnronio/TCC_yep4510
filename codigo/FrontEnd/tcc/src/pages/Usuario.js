import React, { useState } from "react";
import Layout from "../components/layout.js";
import "../style/Global.css";
import "../style/Usuario.css";
import api from "../services/api.js";

function Usuario() {
  const [formData, setFormData] = useState({
    login: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      // Salva token JWT 
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      alert("Login realizado com sucesso!");
      window.location.href = "/"; // redireciona para a página inicial
    } catch (error) {
      console.error("Erro no login:");
      if (error.response?.status === 401) {
        alert("Usuário ou senha incorretos!");
      } else {
        alert("Erro ao conectar ao servidor. Verifique sua conexão.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-left">
          <img
            src="/images/Logo4510.png"
            alt="Rotary Logo"
            className="rotary-logo"
          />
        </div>

        <div className="login-right">
          <div className="login-header">
            <img src="/images/LogoRYE.png" alt="RYE" className="rye-logo" />
            <p>Entrar com sua conta</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="login"
              placeholder="Usuário"
              value={formData.login}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Usuario;
