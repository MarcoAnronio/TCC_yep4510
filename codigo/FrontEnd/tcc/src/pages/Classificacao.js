import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/layout";
import "../style/Classificacao.css";
import "../style/Global.css";

function Classificacao() {
  const [ranking, setRanking] = useState([]);
  const [modoAtribuir, setModoAtribuir] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [form, setForm] = useState({
    historicoEscolar: "",
    treinamento: "",
    reunioes: "",
    prova: "",
    paisEscolhido: ""
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await api.get("/classificacao");
        setRanking(response.data);
      } catch (error) {
        console.error("Erro ao buscar classificação:");
      }
    };
    fetchRanking();
  }, []);

  const handleSelecionar = (item) => {
    setSelecionado(item);
    setForm({
      historicoEscolar: item.historicoEscolar || "",
      treinamento: item.treinamento || "",
      reunioes: item.reunioes || "",
      prova: item.prova || "",
      paisEscolhido: item.paisEscolhido || ""
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    if (!selecionado) {
      alert("Selecione um candidato antes de salvar.");
      return;
    }

    const payload = {
      fichaId: selecionado.fichaId,
      historicoEscolar: parseFloat(form.historicoEscolar || 0),
      treinamento: parseFloat(form.treinamento || 0),
      reunioes: parseFloat(form.reunioes || 0),
      prova: parseFloat(form.prova || 0),
      paisEscolhido: form.paisEscolhido || null
    };

    try {
      const temNotas = selecionado.total > 0;
      if (temNotas) {
        await api.put(`/classificacao/${selecionado.fichaId}`, payload);
        alert("Notas atualizadas com sucesso!");
      } else {
        await api.post("/classificacao", payload);
        alert("Notas salvas com sucesso!");
      }

      // Atualiza lista
      const response = await api.get("/classificacao");
      setRanking(response.data);
      setSelecionado(null);
      setForm({
        historicoEscolar: "",
        treinamento: "",
        reunioes: "",
        prova: "",
        paisEscolhido: ""
      });
    } catch (error) {
      console.error("Erro ao salvar notas:");
      alert("Erro ao salvar notas.");
    }
  };

  return (
    <Layout>
      <h1 className="section-header">Classificação</h1>

      <main className="main-content">
        {!modoAtribuir ? (
          <>
            <div className="table-container">
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th>Nome</th>
                    <th>Clube</th>
                    <th>Hist. escolar</th>
                    <th>Treinamento</th>
                    <th>Reuniões</th>
                    <th>Prova</th>
                    <th>Total</th>
                    <th>País escolhido</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.length > 0 ? (
                    ranking.map((item, index) => (
                      <tr key={item.fichaId}>
                        <td>{index + 1}</td>
                        <td>{item.nome}</td>
                        <td>{item.clube || "—"}</td>
                        <td>{item.historicoEscolar}</td>
                        <td>{item.treinamento}</td>
                        <td>{item.reunioes}</td>
                        <td>{item.prova}</td>
                        <td>
                          <strong>{item.total}</strong>
                        </td>
                        <td>{item.paisEscolhido || "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">Nenhuma classificação encontrada</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {(usuario?.tipo === "SECRETARIA" || usuario?.tipo === "OFICIAL") && (
              <div className="actions">
                <button
                  className="btn-atribuir"
                  onClick={() => setModoAtribuir(true)}
                >
                  Atribuir Notas
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2>Atribuir / Editar Notas</h2>
            <div className="table-container">
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Selecionar</th>
                    <th>Nome</th>
                    <th>Clube</th>
                    <th>Cidade</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((item) => (
                    <tr key={item.fichaId}>
                      <td>
                        <input
                          type="radio"
                          name="selecionado"
                          checked={selecionado?.fichaId === item.fichaId}
                          onChange={() => handleSelecionar(item)}
                        />
                      </td>
                      <td>{item.nome}</td>
                      <td>{item.clube || "—"}</td>
                      <td>{item.cidade || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selecionado && (
              <div className="form-container">
                <h3>Notas para {selecionado.nome}</h3>
                <div className="form-row">
                  <label>Histórico Escolar:</label>
                  <input
                    type="number"
                    name="historicoEscolar"
                    value={form.historicoEscolar}
                    onChange={handleChange}
                  />

                  <label>Treinamento:</label>
                  <input
                    type="number"
                    name="treinamento"
                    value={form.treinamento}
                    onChange={handleChange}
                  />

                  <label>Reuniões:</label>
                  <input
                    type="number"
                    name="reunioes"
                    value={form.reunioes}
                    onChange={handleChange}
                  />

                  <label>Prova:</label>
                  <input
                    type="number"
                    name="prova"
                    value={form.prova}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>País Escolhido:</label>
                  <input
                    type="text"
                    name="paisEscolhido"
                    placeholder="Ex: Canadá"
                    value={form.paisEscolhido}
                    onChange={handleChange}
                  />
                </div>

                <div className="actions">
                  <button className="btn-atribuir" onClick={handleSalvar}>
                    {selecionado.total > 0 ? "Atualizar Notas" : "Salvar Notas"}
                  </button>
                  <button
                    className="btn-cancelar"
                    onClick={() => setModoAtribuir(false)}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}

export default Classificacao;
