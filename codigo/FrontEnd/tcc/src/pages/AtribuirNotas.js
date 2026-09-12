import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/layout";
import "../style/Classificacao.css";
import "../style/Global.css";

function AtribuirNotas() {
  const [candidatos, setCandidatos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [notas, setNotas] = useState({
    historicoEscolar: "",
    treinamento: "",
    reunioes: "",
    prova: "",
  });
  const navigate = useNavigate();

  // Busca os candidatos (fichas)
  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const response = await api.get("/inscricao");
        setCandidatos(response.data);
      } catch (error) {
        console.error("Erro ao buscar candidatos:");
      }
    };
    fetchCandidatos();
  }, []);

  const handleChange = (e) => {
    setNotas({
      ...notas,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selecionado) {
      alert("Selecione um candidato!");
      return;
    }

    try {
      const payload = {
        fichaId: selecionado.id,
        historicoEscolar: parseFloat(notas.historicoEscolar),
        treinamento: parseFloat(notas.treinamento),
        reunioes: parseFloat(notas.reunioes),
        prova: parseFloat(notas.prova),
      };

      await api.post("/classificacao", payload);
      alert("Notas atribuídas com sucesso!");
      navigate("/classificacao");
    } catch (error) {
      console.error("Erro ao salvar notas:");
      alert("Erro ao salvar notas. Verifique os dados.");
    }
  };

  return (
    <Layout>
      <h1 className="section-header">Atribuir Notas</h1>

      <main className="main-content">
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
              {candidatos.map((candidato) => (
                <tr key={candidato.id}>
                  <td>
                    <input
                      type="radio"
                      name="selecionado"
                      onChange={() => setSelecionado(candidato)}
                      checked={selecionado?.id === candidato.id}
                    />
                  </td>
                  <td>{candidato.nome}</td>
                  <td>{candidato.clube?.nomeClube || "—"}</td>
                  <td>{candidato.cidade || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selecionado && (
          <div style={{ marginTop: "2rem" }}>
            <h3>Notas para {selecionado.nome}</h3>
            <div className="campo-grupo" style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
              <label>
                Histórico Escolar:
                <input type="number" name="historicoEscolar" value={notas.historicoEscolar} onChange={handleChange} />
              </label>
              <label>
                Treinamento:
                <input type="number" name="treinamento" value={notas.treinamento} onChange={handleChange} />
              </label>
              <label>
                Reuniões:
                <input type="number" name="reunioes" value={notas.reunioes} onChange={handleChange} />
              </label>
              <label>
                Prova:
                <input type="number" name="prova" value={notas.prova} onChange={handleChange} />
              </label>

              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "var(--deafult)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "1rem",
                  fontSize: "1rem",
                }}
              >
                Salvar Notas
              </button>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}

export default AtribuirNotas;
