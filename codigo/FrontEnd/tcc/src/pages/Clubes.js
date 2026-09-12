import React, { useEffect, useState } from "react";
import Layout from "../components/layout.js";
import "../style/Clubes.css";
import "../style/Global.css";
import api from "../services/api"; 

function Clubes() {
  const [clubes, setClubes] = useState([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [clubeSelecionado, setClubeSelecionado] = useState(null);
  const [pesquisaCidade, setPesquisaCidade] = useState("");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [formData, setFormData] = useState({
    nomeClube: "",
    cnpj: "",
    cep: "",
    cidade: "",
    endereco: "",
    presidente: { nome: "", cpf: "", rg: "", email: "", telefone: "" },
    oficial: { nome: "", cpf: "", rg: "", email: "", telefone: "" },
  });

  useEffect(() => {
    fetchClubes();
  }, []);

  const fetchClubes = () => {
    api
      .get("/clube")
      .then((res) => {
        const ordenado = res.data.sort((a, b) =>
          a.cidade.localeCompare(b.cidade, "pt-BR")
        );
        setClubes(ordenado);
      })
      .catch((err) => console.error("Erro ao buscar clubes:", err));
  };

  //  Filtro de pesquisa
  const clubesFiltrados = clubes.filter((clube) =>
    clube.cidade?.toLowerCase().includes(pesquisaCidade.toLowerCase())
  );

  const handleVerDetalhes = (id) => {
    api
      .get(`/clube/${id}`)
      .then((res) => setClubeSelecionado(res.data))
      .catch((err) => console.error("Erro ao buscar clube:", err));
  };

  // Editar clube
  const handleEditar = (clube) => {
    setFormData(clube);
    setClubeSelecionado(null);
    setMostrarCadastro(true);
  };

  // Atualizar campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("presidente.") || name.startsWith("oficial.")) {
      const [grupo, campo] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [grupo]: { ...prev[grupo], [campo]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Criar / Atualizar clube
  const handleSubmit = (e) => {
    e.preventDefault();

    const metodo = formData.id ? "put" : "post";
    const endpoint = formData.id ? `/clube/${formData.id}` : "/clube";

    api[metodo](endpoint, formData)
      .then(() => {
        alert("Clube salvo com sucesso!");
        setMostrarCadastro(false);
        setFormData({
          nomeClube: "",
          cnpj: "",
          cep: "",
          cidade: "",
          endereco: "",
          presidente: {
            nome: "",
            cpf: "",
            rg: "",
            email: "",
            telefone: "",
          },
          oficial: {
            nome: "",
            cpf: "",
            rg: "",
            email: "",
            telefone: "",
          },
        });
        fetchClubes();
      })
      .catch((err) => {
        console.error("Erro ao salvar clube:");
        alert("Erro ao salvar clube");
      });
  };

  const handleStatus = (id) => {
    api
      .get(`/clube/${id}`)
      .then((res) => {
        const data = res.data;
        const novoStatus = data.status === "ATIVO" ? "INATIVO" : "ATIVO";

        return api.put(`/clube/${id}`, { ...data, status: novoStatus });
      })
      .then(() => {
        alert("Status alterado com sucesso!");
        fetchClubes();
        setClubeSelecionado(null);
      })
      .catch((err) => console.error("Erro ao alterar status:", err));
  };

  return (
    <Layout>
      {/* 🔹 Lista de clubes */}
      {!mostrarCadastro && !clubeSelecionado && (
        <div className="page-content">
          <div className="page-header">
            <h2>Clubes</h2>

            {(usuario?.tipo === "SECRETARIA" || usuario?.tipo === "OFICIAL") && (
              <button
                className="btn cadastrar"
                onClick={() => setMostrarCadastro(true)}
              >
                CADASTRAR
              </button>
            )}
          </div>

          {/* Campo de pesquisa */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Pesquisar por cidade..."
              value={pesquisaCidade}
              onChange={(e) => setPesquisaCidade(e.target.value)}
            />
          </div>

          <div className="clubes-container">
            <h3>Clubes cadastrados</h3>
            <table className="clubes-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cidade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {clubesFiltrados.length > 0 ? (
                  clubesFiltrados.map((clube) => (
                    <tr
                      key={clube.id}
                      onClick={() => handleVerDetalhes(clube.id)}
                      className="linha-click"
                    >
                      <td>{clube.nomeClube}</td>
                      <td>{clube.cidade}</td>
                      <td>{clube.status || "ATIVO"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Nenhum clube encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detalhes */}
      {clubeSelecionado && (
        <div className="detalhes-clube">
          <h3>Detalhes do Clube</h3>
          <p><strong>Nome:</strong> {clubeSelecionado.nomeClube}</p>
          <p><strong>CNPJ:</strong> {clubeSelecionado.cnpj}</p>
          <p><strong>CEP:</strong> {clubeSelecionado.cep}</p>
          <p><strong>Cidade:</strong> {clubeSelecionado.cidade}</p>
          <p><strong>Endereço:</strong> {clubeSelecionado.endereco}</p>
          <p><strong>Status:</strong> {clubeSelecionado.status}</p>

          <h4>Presidente</h4>
          <p><strong>Nome:</strong> {clubeSelecionado.presidente?.nome}</p>
          <p><strong>Email:</strong> {clubeSelecionado.presidente?.email}</p>
          <p><strong>Telefone:</strong> {clubeSelecionado.presidente?.telefone}</p>

          <h4>Oficial</h4>
          <p><strong>Nome:</strong> {clubeSelecionado.oficial?.nome}</p>
          <p><strong>Email:</strong> {clubeSelecionado.oficial?.email}</p>
          <p><strong>Telefone:</strong> {clubeSelecionado.oficial?.telefone}</p>

          <div className="form-actions">
            <button
              className="btn voltar"
              onClick={() => setClubeSelecionado(null)}
            >
              VOLTAR
            </button>

            {(usuario?.tipo === "SECRETARIA" || usuario?.tipo === "OFICIAL") && (
              <>
                <button
                  className="btn editar"
                  onClick={() => handleEditar(clubeSelecionado)}
                >
                  EDITAR
                </button>
                <button
                  className="btn salvar"
                  onClick={() => handleStatus(clubeSelecionado.id)}
                >
                  ALTERAR STATUS
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/*Cadastro / Edição */}
      {mostrarCadastro && (
        <div className="cadastro-clubes">
          <h3>{formData.id ? "Editar Clube" : "Cadastrar Clube"}</h3>
          <form className="cadastro-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Clube</label>
              <input
                type="text"
                name="nomeClube"
                value={formData.nomeClube}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>CEP</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Endereço</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>

            <h4>Presidente</h4>
            {["nome", "cpf", "rg", "email", "telefone"].map((campo) => (
              <div className="form-group" key={`pres-${campo}`}>
                <label>{campo.toUpperCase()}</label>
                <input
                  type="text"
                  name={`presidente.${campo}`}
                  value={formData.presidente[campo]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <h4>Oficial</h4>
            {["nome", "cpf", "rg", "email", "telefone"].map((campo) => (
              <div className="form-group" key={`ofi-${campo}`}>
                <label>{campo.toUpperCase()}</label>
                <input
                  type="text"
                  name={`oficial.${campo}`}
                  value={formData.oficial[campo]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="form-actions">
              <button
                type="button"
                className="btn voltar"
                onClick={() => setMostrarCadastro(false)}
              >
                VOLTAR
              </button>
              <button type="submit" className="btn salvar">
                SALVAR
              </button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}

export default Clubes;
