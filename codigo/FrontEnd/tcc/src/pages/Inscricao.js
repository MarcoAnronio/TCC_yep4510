import Layout from '../components/layout.js';
import '../style/Inscricao.css';
import '../style/Global.css';
import { useState, useEffect } from "react";
import api from "../services/api";

function Inscricao() {
  const [step, setStep] = useState(1);
  const [clubes, setClubes] = useState([]);
  const [buscaClube, setBuscaClube] = useState("");
  const [clubeSelecionado, setClubeSelecionado] = useState(null);
  const [declaro, setDeclaro] = useState(false);

  // 🔹 Dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    sexo: "",
    serie: "",
    cidade: "",
    cep: "",
    endereco: "",
    telefone: "",
    email: "",
    pais1: "",
    pais2: "",
    pais3: "",
    pais4: "",

    responsaveis: [
      { nome: "", rg: "", cpf: "", email: "", telefone: "", tipo: "PAI" },
      { nome: "", rg: "", cpf: "", email: "", telefone: "", tipo: "MAE" }
    ],

    clubeId: null,
    clubeNome: "",
    clubeCNPJ: "",
    clubeID: "",
    clubeCidade: "",
    clubeCEP: "",
    clubeEndereco: "",
    presidenteNome: "",
    presidenteRG: "",
    presidenteCPF: "",
    presidenteEmail: "",
    presidenteTelefone: "",
    oficialNome: "",
    oficialRG: "",
    oficialCPF: "",
    oficialEmail: "",
    oficialTelefone: "",
    comissaoNome: "Rotary",
    comissaoDistrito: "4510",
    comissaoCidade: "",
    comissaoCEP: "",
    comissaoEndereco: "",
    coordenadorNome: "",
    coordenadorRG: "",
    coordenadorCPF: "",
    coordenadorTelefone: "",
    coordenadorEmail1: "",
    coordenadorEmail2: "",
    comissaoEndereco2: "",
    comissaoCEP2: "",
    comissaoCidade2: "",
  });

  const handleResponsavelChange = (tipo, field, value) => {
    setFormData((prev) => ({
      ...prev,
      responsaveis: prev.responsaveis.map((r) =>
        r.tipo === tipo ? { ...r, [field]: value } : r
      ),
    }));
  };

  useEffect(() => {
    api.get("/clube")
      .then((r) => r.data)
      .then((data) => setClubes(data))
      .catch((err) => console.error("Erro ao buscar clubes:", err));
  }, []);

  const onSelecionarClube = (idStr) => {
    const id = Number(idStr);
    const c = clubes.find((x) => x.id === id);
    if (!c) return;

    setClubeSelecionado(c);
    setFormData((prev) => ({
      ...prev,
      clubeId: c.id,
      clubeNome: c.nomeClube || "",
      clubeCNPJ: c.cnpj || "",
      clubeCidade: c.cidade || "",
      clubeCEP: c.cep || "",
      clubeEndereco: c.endereco || "",
      presidenteNome: c.presidente?.nome || "",
      presidenteRG: c.presidente?.rg || "",
      presidenteCPF: c.presidente?.cpf || "",
      presidenteEmail: c.presidente?.email || "",
      presidenteTelefone: c.presidente?.telefone || "",
      oficialNome: c.oficial?.nome || "",
      oficialRG: c.oficial?.rg || "",
      oficialCPF: c.oficial?.cpf || "",
      oficialEmail: c.oficial?.email || "",
      oficialTelefone: c.oficial?.telefone || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.clubeId) {
    alert("Selecione um clube antes de enviar a inscrição!");
    return;
  }

  const responsaveisValidos = formData.responsaveis.filter(
  (r) => (r.nome || "").trim() !== ""
);


  const payload = {
    nome: formData.nome,
    dataNasc: formData.dataNascimento,
    cep: formData.cep,
    serieEscolar: Number(formData.serie || 0),
    telefone: formData.telefone,
    email: formData.email,
    sexo: formData.sexo,

    cidade: formData.cidade,
    endereco: formData.endereco,
    pais1: formData.pais1,
    pais2: formData.pais2,
    pais3: formData.pais3,
    pais4: formData.pais4,

    clubeId: formData.clubeId,

    responsaveis: responsaveisValidos,
  };

  try {
    await api.post("/inscricao", payload);
    alert("Inscrição enviada com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar ficha:");
    alert("Erro ao enviar inscrição. Verifique os dados e tente novamente.");
  }
};



  const clubesFiltrados = clubes.filter((c) =>
    c.nomeClube.toLowerCase().includes(buscaClube.toLowerCase()) ||
    c.cidade.toLowerCase().includes(buscaClube.toLowerCase())
  );

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Layout>
      {/* Etapa 1 - Ficha cadastral */}
      {step === 1 && (
        <div className='inscricao'>
          <h1 className="section-header">Inscrição</h1>

          <main className="form-container">
            <div className="form-header">
              <h2>Formulário de inscrição</h2>
              <p>
                Processo seletivo para o ano 2025-26 do intercâmbio de jovens do
                distrito 4510 do Rotary International
              </p>

              <div className="progress">
                <div className="step active">
                  1
                  <br />
                  Ficha cadastral
                </div>
                <div className="step">
                  2
                  <br />
                  Termos do acordo
                </div>
                <div className="step">
                  3
                  <br />
                  Valores
                </div>
              </div>
            </div>

            <section className="form-section intercambio-options">
              <h3>Opções de intercâmbio</h3>
              <p>
                <strong>LONGA DURAÇÃO</strong> para nascidos a partir de 1º de janeiro
                de 2009
              </p>
              <p>
                <strong>CURTA DURAÇÃO</strong> para nascidos a partir de 1º de janeiro
                de 2006
              </p>
              <small>
                Obs. 1. Taxa de inscrição ÚNICA para as opções por longa e curta
                durações. Após concluído o processo seletivo o candidato pode decidir
                por:
                <br />
                a) somente curta duração; b) curta e longa duração; ou c) somente longa
                duração.
                <br />
                2. Candidatos de longa passam por treinamento de agosto de 2025 a junho
                de 2026 e viajam no segundo semestre de 2026. Os candidatos de curta
                passam por treinamento de agosto de 2025 a outubro de 2026, recebem o
                intercambista estrangeiro entre junho e agosto de 2026 e viajam entre
                dezembro de 2025 e janeiro 2027.
              </small>
            </section>

            <section className="form-section dados-candidato">
              <h3>INFORMAÇÕES DO CANDIDATO</h3>
              <div className="campo-grupo">
                <label>Nome Completo</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                <label>Data de nascimento</label>
                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
                <label>Sexo</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange}>
                  <option value="">Escolher</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                  <option value="OUTRO">Outro</option>
                </select>
                <label>Série escolar atual</label>
<select name="serie" value={formData.serie} onChange={handleChange}>
  <option value="">Escolher</option>
  <option value="9">9º ano do Ensino Fundamental</option>
  <option value="1">1º ano do Ensino Médio</option>
  <option value="2">2º ano do Ensino Médio</option>
  <option value="3">3º ano do Ensino Médio</option>
</select>

              </div>
              <div className="campo-grupo">
                <label>Cidade</label>
                <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
                <label>CEP</label>
                <input type="text" name="cep" value={formData.cep} onChange={handleChange} />
                <label>Endereço completo</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
              </div>
              <div className="campo-grupo">
                <label>Telefone</label>
                <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} />
                <label>
                  E-mail do candidato
                  <span className="legenda">(Mantenha este e-mail ao longo do intercâmbio)</span>
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="grupo preferencia">
                <label>Países de preferência em ordem de prioridade:</label>
                <div className="paises">
                  <div>
                    <span>1º</span>
                    <input type="text" name="pais1" value={formData.pais1} onChange={handleChange} />
                  </div>
                  <div>
                    <span>2º</span>
                    <input type="text" name="pais2" value={formData.pais2} onChange={handleChange} />
                  </div>
                  <div>
                    <span>3º</span>
                    <input type="text" name="pais3" value={formData.pais3} onChange={handleChange} />
                  </div>
                  <div>
                    <span>4º</span>
                    <input type="text" name="pais4" value={formData.pais4} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>Responsáveis</h3>

              {["PAI", "MAE"].map((tipo) => {
                const resp = formData.responsaveis.find((r) => r.tipo === tipo);

                return (
                  <div key={tipo} className="responsavel-bloco">
                    <h4>{tipo === "PAI" ? "Pai" : "Mãe"}</h4>

                    <div className="campo-grupo">
                      <label>Nome completo</label>
                      <input
                        type="text"
                        value={resp.nome}
                        onChange={(e) => handleResponsavelChange(tipo, "nome", e.target.value)}
                      />

                      <label>RG</label>
                      <input
                        type="text"
                        value={resp.rg}
                        onChange={(e) => handleResponsavelChange(tipo, "rg", e.target.value)}
                      />

                      <label>CPF</label>
                      <input
                        type="text"
                        value={resp.cpf}
                        onChange={(e) => handleResponsavelChange(tipo, "cpf", e.target.value)}
                      />

                      <label>E-mail</label>
                      <input
                        type="email"
                        value={resp.email}
                        onChange={(e) => handleResponsavelChange(tipo, "email", e.target.value)}
                      />

                      <label>Telefone</label>
                      <input
                        type="tel"
                        value={resp.telefone}
                        onChange={(e) => handleResponsavelChange(tipo, "telefone", e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </section>


            <section className="form-section fixa">
              <h3>INFORMAÇÕES DO CLUBE PATROCINADOR</h3>

              {/* Seletor do clube (busca + select) */}
              <div className="campo-grupo">
                <label>Buscar clube (nome ou cidade)</label>
                <input
                  type="text"
                  placeholder="Digite para filtrar..."
                  value={buscaClube}
                  onChange={(e) => setBuscaClube(e.target.value)}
                />

                <label>Selecionar clube (apenas ATIVOS)</label>
                <select
                  value={clubeSelecionado?.id || ""}
                  onChange={(e) => onSelecionarClube(e.target.value)}
                >
                  <option value="">-- selecione um clube --</option>
                  {clubesFiltrados.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nomeClube} — {c.cidade}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campos somente leitura, preenchidos automaticamente */}
              <div className="campo-grupo">
                <label>Nome do clube</label>
                <input type="text" name="clubeNome" value={formData.clubeNome} readOnly className="input-fixo" />
                <label>CNPJ/MF</label>
                <input type="text" name="clubeCNPJ" value={formData.clubeCNPJ} readOnly className="input-fixo" />
                <label>ID do Rotary</label>
                <input type="text" name="clubeID" value={formData.clubeID} readOnly className="input-fixo" />
                <label>Cidade</label>
                <input type="text" name="clubeCidade" value={formData.clubeCidade} readOnly className="input-fixo" />
              </div>

              <div className="campo-grupo">
                <label>CEP</label>
                <input type="text" name="clubeCEP" value={formData.clubeCEP} readOnly className="input-fixo" />
                <label>Endereço completo</label>
                <input type="text" name="clubeEndereco" value={formData.clubeEndereco} readOnly className="input-fixo" />
              </div>

              <div className="bloco">
                <h3>Presidente</h3>
                <div className="campo-grupo">
                  <label>Nome completo</label>
                  <input type="text" name="presidenteNome" value={formData.presidenteNome} readOnly className="input-fixo" />
                  <label>RG</label>
                  <input type="text" name="presidenteRG" value={formData.presidenteRG} readOnly className="input-fixo" />
                  <label>CPF</label>
                  <input type="text" name="presidenteCPF" value={formData.presidenteCPF} readOnly className="input-fixo" />
                </div>
                <div className="campo-grupo">
                  <label>E-mail</label>
                  <input type="email" name="presidenteEmail" value={formData.presidenteEmail} readOnly className="input-fixo" />
                  <label>Telefone</label>
                  <input type="tel" name="presidenteTelefone" value={formData.presidenteTelefone} readOnly className="input-fixo" />
                </div>
              </div>

              <div className="bloco">
                <h3>Oficial de intercâmbio</h3>
                <div className="campo-grupo">
                  <label>Nome completo</label>
                  <input type="text" name="oficialNome" value={formData.oficialNome} readOnly className="input-fixo" />
                  <label>RG</label>
                  <input type="text" name="oficialRG" value={formData.oficialRG} readOnly className="input-fixo" />
                  <label>CPF</label>
                  <input type="text" name="oficialCPF" value={formData.oficialCPF} readOnly className="input-fixo" />
                </div>
                <div className="campo-grupo">
                  <label>E-mail</label>
                  <input type="email" name="oficialEmail" value={formData.oficialEmail} readOnly className="input-fixo" />
                  <label>Telefone</label>
                  <input type="tel" name="oficialTelefone" value={formData.oficialTelefone} readOnly className="input-fixo" />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>INFORMAÇÕES DA COMISSÃO DISTRITAL DE INTERCÂMBIO – YEP D4510</h3>
              <div className="campo-grupo">
                <label>Nome/Designação</label>
                <input type="text" name="comissaoNome" value={formData.comissaoNome} readOnly className="input-fixo" />
                <label>Distrito do R. I.</label>
                <input type="text" name="comissaoDistrito" value={formData.comissaoDistrito} readOnly className="input-fixo" />
                <label>Cidade</label>
                <input type="text" name="comissaoCidade" value={formData.comissaoCidade} readOnly className="input-fixo" />
              </div>
              <div className="campo-grupo">
                <label>CEP</label>
                <input type="text" name="comissaoCEP" value={formData.comissaoCEP} readOnly className="input-fixo" />
                <label>Endereço completo</label>
                <input type="text" name="comissaoEndereco" value={formData.comissaoEndereco} readOnly className="input-fixo" />
              </div>
              <div className="bloco">
                <h3>Coordenador da comissão/Representante</h3>
                <div className="campo-grupo">
                  <label>Nome completo</label>
                  <input type="text" name="coordenadorNome" value={formData.coordenadorNome} readOnly className="input-fixo" />
                  <label>RG</label>
                  <input type="text" name="coordenadorRG" value={formData.coordenadorRG} readOnly className="input-fixo" />
                  <label>CPF</label>
                  <input type="text" name="coordenadorCPF" value={formData.coordenadorCPF} readOnly className="input-fixo" />
                  <label>Telefone</label>
                  <input type="tel" name="coordenadorTelefone" value={formData.coordenadorTelefone} readOnly className="input-fixo" />
                </div>
                <div className="campo-grupo">
                  <label>E-mail1</label>
                  <input type="email" name="coordenadorEmail1" value={formData.coordenadorEmail1} readOnly className="input-fixo" />
                  <label>E-mail2</label>
                  <input type="email" name="coordenadorEmail2" value={formData.coordenadorEmail2} readOnly className="input-fixo" />
                </div>
              </div>
              <div className="campo-grupo">
                <label>Endereço completo</label>
                <input type="text" name="comissaoEndereco2" value={formData.comissaoEndereco2} readOnly className="input-fixo" />
                <label>CEP</label>
                <input type="text" name="comissaoCEP2" value={formData.comissaoCEP2} readOnly className="input-fixo" />
                <label>Cidade</label>
                <input type="text" name="comissaoCidade2" value={formData.comissaoCidade2} readOnly className="input-fixo" />
              </div>
            </section>

            <div className="form-footer">
              <label className="checkbox-container">
                <input type="checkbox" checked={declaro} onChange={e => setDeclaro(e.target.checked)} />
                <span>Declaro que preenchi todos os campos</span>
              </label>
              <div className="buttons">
                <button className="btn voltar" onClick={prevStep}>VOLTAR</button>
                <button className="btn proximo" onClick={nextStep}>PRÓXIMO</button>
              </div>
            </div>

          </main>
        </div>
      )}

      {/* Etapa 2 - Termos */}
      {step === 2 && (
        <div className="termos-do-acordo">
          <h1 className="section-header">Inscrição</h1>

          <div className="form-header">
            <h2>Formulário de inscrição</h2>
            <p>
              Processo seletivo para o ano 2025-26 do intercâmbio de jovens do
              distrito 4510 do Rotary International
            </p>

            <div className="progress">
              <div className="step">
                1
                <br />
                Ficha cadastral
              </div>
              <div className="step active">
                2
                <br />
                Termos do acordo
              </div>
              <div className="step">
                3
                <br />
                Valores
              </div>
            </div>
          </div>
          <h3>TERMOS DO ACORDO</h3>

          <div className="termos-de-acordo">
            <h1>TERMOS DO ACORDO</h1>

            <p><strong>2.1. - DAS PARTES</strong></p>
            <p>2.1.1. São partes no presente acordo as pessoas físicas e/ou jurídicas identificadas no item 1 deste instrumento.</p>
            <p>2.1.2. Para todos os efeitos as partes doravante serão simplesmente designadas como: CANDIDATO, aquele que consta identificado no item</p>
            <p>1.1, independentemente do gênero; RESPONSÁVEL(IS) LEGAL(IS), aquele(s) que consta(m) no item</p>
            <p>1.2, independentemente do gênero; CLUBE PATROCINADOR, aquele que consta do item</p>
            <p>1.3; YEP D4510, aquele que consta no item</p>
            <p>1.4 INTERVENIENTE aquele que consta no item</p>
            <p>1.5. e GOVERNADOR aquele que consta no item 1.6.</p>

            <p><strong>2.2. - DO OBJETO</strong></p>
            <p>2.2.1 O presente instrumento particular de acordo - que passa a ser designado apenas como “Documento de Inscrição”,
              tem por objetivo regulamentar a participação do CANDIDATO no PROGRAMA DE INTERCÂMBIO INTERNACIONAL DE JOVENS executado
              pelo YEP D4510, estipulando normas, direitos e deveres das partes durante os processos de inscrição, seleção,
              confirmação e efetiva realização do intercâmbio internacional.</p>

            <p><strong>2.3. - DO PROCESSO DE INSCRIÇÃO</strong></p>
            <p>2.3.1. A inscrição do candidato no Processo Seletivo se dá mediante o preenchimento e assinatura das partes do
              Documento de Inscrição e entrega ao escritório do YEP D4510, no prazo estipulado, acompanhado dos documentos exigidos
              e comprovante do pagamento da taxa de inscrição.</p>
            <p>2.3.2. O Documento de Inscrição deverá ter o aval de um CLUBE PATROCINADOR, que necessariamente deverá ser um
              Rotary Club integrante do Distrito 4510 do Rotary International, em dia com suas obrigações perante os órgãos rotários
              competentes, bem como, devidamente habilitado perante o YEP D4510 para participar do Programa de Intercâmbio de Jovens.
              Nenhuma inscrição poderá ser recebida sem um clube patrocinador.</p>
            <p>2.3.3. Recebido o Documento de Inscrição pelo YEP D4510, este será analisado e, se estiver conforme o exigido,
              habilitará o CANDIDATO a participar do Processo Seletivo para o período especificado.</p>

            <p><strong>2.4. - DO PROCESSO DE SELEÇÃO</strong></p>
            <p>2.4.1. O CANDIDATO inscrito e devidamente habilitado participará de um processo seletivo para estabelecer uma ordem
              de classificação entre todos os candidatos para efeito de escolha das vagas de intercâmbio que serão disponibilizadas.</p>
            <p>2.4.2. O processo seletivo será constituído de:</p>
            <p>2.4.2.1. Provas escritas realizadas pelo YEP D4510 em data, local, horário e formato que forem estabelecidos;</p>
            <p>2.4.2.2. Análise do histórico escolar do CANDIDATO, com apuração e consideração da sua nota média anual.</p>
            <p>2.4.2.3. Participação do(s) RESPONSÁVEL(IS) LEGAL(IS) do CANDIDATO em reuniões de treinamento e orientações que  ocorrerão durante as etapas ao longo do períododepreparaçãopara o intercâmbio.</p>
            <p>2.4.2.4. Participação do CANDIDATO e do(s) RESPONSÁVEIS LEGAIS do CANDIDATO em reuniões do Rotary Clube Patrocinador, até o dia anterior a realização das provas de seleção.</p>

            <p>2.4.2.5. Os critérios adotados para a classificação no Processo Seletivo são:</p>
            <ul>
              <li>500 Pontos para a média do histórico escolar do último ano concluído;</li>
              <li>100 Pontos para a participação dos responsáveis legais no primeiro treinamento de candidatos e famílias que consta do calendário do YEP D4510, sendo 50 pontos para a participação da mãe do CANDIDATO e 50 para o pai, ou RESPONSÁVEIS LEGAIS.</li>
              <li>10 Pontos para a participação do candidato e de seus responsáveis legais em reuniões do Rotary Clube Patrocinador, realizadas até o dia anterior à execução das provas de seleção. Serão atribuídos 25 pontos por reunião, considerando-se, para pontuação, um máximo de 4 reuniões.</li>
              <li>500 Pontos para as Provas de Avaliação de Conhecimento, com a seguinte distribuição:
                <ul>
                  <li>200 pontos para inglês;</li>
                  <li>100 pontos para assuntos de Rotary;</li>
                  <li>100 pontos para cidadania e civismo;</li>
                  <li>100 pontos para conhecimentos gerais.</li>
                </ul>
              </li>
            </ul>

            <p>2.4.2.5. A inscrição e a participação no Processo Seletivo não asseguram ao CANDIDATO, por si só, a efetiva e incondicional realização do intercâmbio coordenado pelo YEP D4510.</p>

            <p>2.4.2.6. Cumprida a fase do processo seletivo, ao CANDIDATO será atribuída uma vaga para realizar o intercâmbio, de sua escolha dentre aquelas que lhe forem disponibilizadas pelo YEP D4510.</p>

            <p>2.4.2.6.1. A duração e a data de início de intercâmbio serão estipuladas pelo YEP D4510 de acordo com a possibilidade de acolhimento pelas famílias do distrito anfitrião.</p>

            <p><strong>2.5. – DOS COMPROMISSOS DO CANDIDATO E RESPONSÁVEL(IS) LEGAL(IS)</strong></p>

            <p>2.5.1. O CANDIDATO e RESPONSÁVEL(IS) LEGAL(IS) se comprometem a cumprir as regras distritais disponíveis para consulta em
              <a href="https://l1nk.dev/regrasdistritais4510-2025" target="_blank" rel="noopener noreferrer">
                https://l1nk.dev/regrasdistritais4510-2025
              </a>
              e concordar com o cronograma do Processo Seletivo 202 -202 , perante o Rotary Club Patrocinador, o YEP D4510 e a Governadoria do Distrito 4510.</p>


            <p>2.5.2. O CANDIDATO e RESPONSÁVEL(IS) LEGAL(IS) são responsáveis pelo pagamento de todas as despesas relativas, mas não limitam-se, a aquisição de passagens aéreas, despesas com passaporte e vistos, seguro obrigatório conforme especificação do distrito anfitrião, fundo de emergência conforme especificação do distrito anfitrião, gastos durante o intercâmbio, qualquer viagem ou excursão adicional, e um kit fornecido pelo YEP D4510, de acordo com as orientações.</p>

            <p>2.5.3. O(s) RESPONSÁVEL(IS) LEGAL(IS) autoriza(m) o CLUBE PATROCINADOR e o YEP D4510 a executarem toda atividade e obtenção de documentos exigidos pelo Programa de Intercâmbio do Rotary International tais como visitas ao domicílio do CANDIDATO, entrevistas com os membros da família e solicitação de apresentação de Atestado de Antecedentes Criminais para todos os adultos residentes no domicílio conforme determinação atual de Rotary International.</p>

            <p>2.5.4. O(s) RESPONSÁVEL(IS) LEGAL(IS) declara(m) estar ciente(s) que a inscrição ao Processo Seletivo, em hipótese alguma, garante que o intercâmbio irá acontecer.</p>

            <p>2.5.5. Mesmo após a classificação, a escolha de vaga e o envio do Application Form, existe risco de ocorrer negativa de anfitrionamento do distrito parceiro por razão alheia ao compromisso e desejo do YEP D4510, impossibilitando o intercâmbio planejado.</p>

            <p>2.5.6. O(s) RESPONSÁVEL(IS) LEGAL(IS) declara(m) ter ciência de que a inscrição ora manifestada implica no compromisso e dever de participação, junto com o CANDIDATO, das reuniões de treinamento promovidas pelo Comitê do YEP D4510, em datas e locais anunciados no Calendário Anual do Programa de Intercâmbio de Jovens do Distrito 4510, de forma presencial ou online, conforme for a convocação.</p>

            <p>2.5.7. O CANDIDATO e o(s) REPONSÁVEL(IS) LEGAL(IS) declaram estar cientes de que a ausência do CANDIDATO, nas reuniões obrigatórias, elimina-o do processo e a ausência dos RESPONSÁVEIS LEGAIS não concede os pontos relativos à respectiva participação nessas reuniões.</p>
            <p><strong>2.6. – DO EMPARCEIRAMENTO E APRESENTAÇÃO DO APPLICATION FORM</strong></p>

            <p>2.6.1. Após ser realizada a escolha de vaga para o intercâmbio, o YEP D4510 se empenhará no emparceiramento junto ao respectivo Distrito do Rotary International, mediante a apresentação do documento denominado “Application Form”, cujo preenchimento, assinatura e entrega ao YEP D4510 é de responsabilidade do CANDIDATO e RESPONSÁVEL(IS) LEGAL(IS), sob supervisão do ROTARY CLUB PATROCINADOR.</p>

            <p>2.6.2. O YEP D4510 estabelecerá a data limite para a entrega do “Application Form”, sendo que este prazo deverá ser obedecido rigorosamente, sob pena de eliminação sumária do processo.</p>

            <p>2.6.3. O “Application Form” (Formulário de Inscrição) deverá ser preenchido de acordo com as orientações e normas pertinentes, emitido em três (3) vias, com assinaturas originais, em caneta de cor azul, em todas as vias.</p>

            <p>2.6.4. O YEP D4510 proverá as informações e auxílio para o preenchimento do Formulário de Inscrição, “Application Form”.</p>

            <p>2.6.5. As partes entendem e concordam que uma boa apresentação do “Application Form” e dos documentos anexados podem influenciar, favoravelmente, a aprovação e aceitação do CANDIDATO pelo parceiro internacional de destino.</p>

            <p><strong>2.7. – DO DESENVOLVIMENTO DO INTERCÂMBIO</strong></p>

            <p>2.7.1. Consolidado o emparceiramento com o Distrito de Rotary estrangeiro, e confirmado o intercâmbio, o CANDIDATO e RESPONSÁVEL(IS) LEGAL(IS) se comprometem a cumprir as obrigações e compromissos pertinentes, tais como:</p>

            <p>2.7.2. A aquisição de passagens aéreas para o país / local de destino do intercâmbio, de acordo com as orientações do YEP D4510.</p>

            <p>2.7.3. A aquisição de seguro de viagem pelo correspondente tempo do intercâmbio, de acordo com as orientações do distrito rotário anfitrião. Quando o distrito anfitrião não indicar um seguro de viagem específico, o YEP D4510 orientará a aquisição.</p>

            <p>2.7.4. Cumprir todas as exigências sanitárias e de saúde em geral que forem apresentadas pelo Distrito / País anfitrião.</p>

            <p>2.7.5. A aquisição de um kit fornecido pelo YEP D4510 contendo o uniforme do CANDIDATO, brasão do YEP D4510, bandeira para afixar no blazer, e outros itens necessários para a estadia no país do distrito anfitrião.</p>

            <p><strong>2.8. – DA RECIPROCIDADE NO ANFITRIONAMENTO</strong></p>

            <p>2.8.1. Para o Programa de Longa Duração o(s) RESPONSÁVEL(IS) LEGAL(IS) se compromete(m) e se obriga(m) a hospedar um jovem estrangeiro por um período aproximado de três meses e indicar outras três famílias que possam hospedar um jovem estrangeiro pelo mesmo período aproximado de três meses, de tal forma a completar um ano de anfitrionamento, sujeito a critérios determinados pela comissão distrital do YEP D4510.</p>

            <p>2.8.1.1. O não anfitrionamento ou a não indicação de famílias para anfitrionar um jovem estrangeiro obrigará os RESPONSÁVEIS LEGAIS a pagarem o valor de R$30.000,00 como taxa de não-anfitrionamento.</p>

            <p>2.8.2. Para o Programa de Curta Duração, os RESPONSÁVEIS LEGAIS concordam em hospedar um jovem estrangeiro por um período aproximado de trinta a noventa dias, sujeito a critérios determinados pela comissão distrital do YEP D4510.</p>

            <p>2.8.3. O anfitrionamento aqui relatado não está condicionado a qualquer opinião, restrição ou preferência da família hospedeira quanto ao estudante estrangeiro que será recebido, seja por raça, credo, sexo etc. ou período em que acontecerá o anfitrionamento, sendo que todos esses detalhes serão de exclusiva responsabilidade e decisão do YEP D4510.</p>

            <p><strong>2.9. – DAS ATRIBUIÇÕES DO CLUBE PATROCINADOR</strong></p>

            <p>2.9.1. Ao CLUBE PATROCINADOR, através do seu Presidente e do Oficial de Intercâmbio, cabe a responsabilidade para:</p>
            <ul>
              <li>a) Aceitar o patrocínio do CANDIDATO, depois de prévia aferição de que suas condições pessoais e de sua família estão de acordo com as exigências do Programa de Intercâmbio de Jovens.</li>
              <li>b) Supervisionar o preenchimento e envio dos documentos e formulários para o YEP D4510, orientando o CANDIDATO no que for necessário.</li>
              <li>c) Acompanhar e orientar, quando necessário, o CANDIDATO e seus familiares nas reuniões de treinamento e orientação de preparação que ocorrem durante o desenvolvimento do processo de intercâmbio.</li>
              <li>d) Acompanhar e orientar a família do CANDIDATO quanto ao anfitrionamento do jovem estrangeiro que for recebido, de acordo com as normas e regras estipuladas pelo Programa de Intercâmbio de Jovens do YEP D4510.</li>
            </ul>

            <p><strong>2.10. – DAS ATRIBUIÇÕES DO YEP D4510</strong></p>

            <p>2.10.1. O YEP D4510, como comitê responsável pela coordenação e execução do Programa de Intercâmbio Internacional de Jovens no âmbito do Distrito 4510 do Rotary International, será responsável pelas diligências necessárias para o emparceiramento com Distritos Rotários estrangeiros, obtenção de vagas de intercâmbio, organização e execução dos processos de inscrição, seleção e classificação, encaminhamento de documentos aos parceiros estrangeiros, orientações e treinamentos aos participantes do programa e seus responsáveis legais e o apoio que se fizer necessários antes, durante e no retorno do período de intercâmbio.</p>

            <p>2.10.2. O YEP D4510 se compromete a buscar a vaga do CANDIDATO através de parcerias com distritos Rotários de países participantes, com o objetivo de intercambiar estudantes entre si, buscando promover a cultura, amizade e paz entre os povos e nações.</p>

            <p>2.10.3. O YEP D4510 divulgará previamente ao abrir o período de inscrições, as Regras Distritais e normas gerais que regem o processo de intercâmbio bem como o calendário de atividades previstas para o período.</p>

            <p>2.10.4. O CANDIDATO e RESPONSÁVEL(IS) LEGAL(IS) se declaram cientes e concordam que o YEP D4510 não vende intercâmbio. Todos os valores pagos pelos CANDIDATOS são recolhidos e geridos pelo YEP D4510 junto à ora INTERVENIENTE, sendo que os valores arrecadados se destinam à manutenção do Programa de Intercâmbio de Jovens e patrocínio de bolsas para jovens que, comprovadamente, não tenham condições financeiras de arcar com os custos de participação no programa.</p>

            <p>2.10.5. O YEP D4510 distribuirá as vagas conquistadas aos CANDIDATOS de acordo com a classificação no Processo Seletivo.</p>

            <p>2.10.6. As vagas serão comunicadas aos CANDIDATOS e RESPONSÁVEL(IS) LEGAIS por escrito, através de e-mail ou outro meio válido, para que seja manifestado interesse no prazo que for estipulado.</p>

            <p>2.10.7. A atribuição de vagas obedecerá ao critério de melhor classificação entre os CANDIDATOS, ou seja, o CANDIDATO melhor classificado terá preferência na escolha da vaga.</p>

            <p><strong>2.11. – DAS ATRIBUIÇÕES DA INTERVENIENTE E ANUENTE</strong></p>

            <p>2.11.1. Fica instituído como INTERVENIENTE e ANUENTE, a Associação do Fundo Distrital do Distrito 4510 de Rotary International - C.N.P.J.(M.F.) nº 05.206.906/0001-80 - Inscrição Estadual: Isenta - Endereço: Rua Virgílio Malta, 6-57 Sala 13 – Centro - CEP 17.015-220 – Bauru/SP. Neste ato Representado pela Diretoria Executiva, tendo como Presidente e Diretor Executivo, o Sr. LUIZ CARLOS DE MELO, brasileiro, casado, funcionário público estadual, portador da cédula de identidade, RG nº 5.726.931-2-SSP/SP, e CPF n.º 486.890.688-72, residente e domiciliado à Rua Rio Branco 23-34 – apto 92B – na cidade de Bauru, Estado de São Paulo, Brasil, como depositária e gestora dos recursos financeiros oriundos dos valores arrecadados na execução do Programa de Intercâmbio de Jovens através do YEP D4510, cabendo a ela, receber os valores pagos pelos CANDIDATOS, emitindo os respectivos recibos, bem como efetuar eventuais reembolsos. É também responsável em efetuar o pagamento de todas as despesas decorrentes da execução do Programa de Intercâmbio, de acordo com as demandas solicitadas pelo YEP D4510.</p>

            <p>2.11.2. O ROTARY CLUB patrocinador do Intercâmbio de Jovens, nomeia e constitui seu bastante representante a interveniente e anuente citada no item 2.11.1., a qual exercerá na qualidade de administradora financeira todos os trâmites legais e judiciais na cobrança de valores não pagos pelos responsáveis do Intercâmbio aqui citado, podendo ajuizar ações e cobranças em seu nome e personalidade jurídica, sem quaisquer impedimentos e embaraços extrajudiciais e/ou judiciais.</p>

          </div>
          <div className="form-footer">
            <label className="checkbox-container">
              <input type="checkbox" checked={declaro} onChange={e => setDeclaro(e.target.checked)} />
              <span>Declaro que li e concordo</span>
            </label>
            <div className="buttons">
              <button className="btn voltar" onClick={prevStep}>VOLTAR</button>
              <button className="btn proximo" onClick={nextStep}>PRÓXIMO</button>
            </div>
          </div>
        </div>
      )}

      {/* Etapa 3 - Valores */}
      {step === 3 && (
        <form className="valores" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Formulário de inscrição</h2>
            <p>
              Processo seletivo para o ano 2025-26 do intercâmbio de jovens do
              distrito 4510 do Rotary International
            </p>

            <div className="progress">
              <div className="step">
                1
                <br />
                Ficha cadastral
              </div>
              <div className="step">
                2
                <br />
                Termos do acordo
              </div>
              <div className="step active">
                3
                <br />
                Valores
              </div>
            </div>
          </div>
          <h1>VALORES E PAGAMENTOS</h1>

          <p><strong>3.1.</strong> O CANDIDATO e RESPONSÁVEL(IS) LEGAL(IS) se responsabilizam pelo pagamento dos valores devidos pela participação no Programa de Intercâmbio de Jovens, conforme tabela de custos estabelecida pelo YEP D4510, a saber:</p>

          <p><strong>3.1.1.</strong> Inscrição — Consulte a equipe do programa para obter os valores vigentes e as instruções de pagamento e envio do comprovante.</p>

          <p><strong>3.1.2.</strong> Programa de Longa Duração – Se essa for a opção do CANDIDATO, deverá ser pago o valor de R$13.970,00 (treze mil, novecentos e setenta reais).</p>
          <p>3.1.2.1. O valor será pago da seguinte forma:</p>
          <p>a) 20% do valor total – R$2.794,00 relativo aos serviços de treinamento e orientações, pago ANTES da primeira reunião obrigatória. Pode ser parcelado em até 3x.</p>
          <p>b) 80% restantes – R$11.176,00 relativos ao emparceiramento internacional, pagos após aceitação da vaga, podendo ser parcelado em até 7x.</p>

          <p><strong>3.1.3.</strong> Programa de Curta Duração – Valor de R$5.830,00.</p>
          <p>a) 20% – R$1.166,00 relativo a treinamento, pago em parcela única antes da primeira reunião obrigatória.</p>
          <p>b) 80% – R$4.664,00 relativo ao emparceiramento internacional, pago em até 4 parcelas mensais após escolha da vaga.</p>

          <p><strong>4.</strong> – DA DESISTÊNCIA DO CANDIDATO</p>
          <p>4.1. Condições de reembolso conforme fase em que ocorrer a desistência:</p>
          <p>4.1.1. Fase de inscrição – reembolso integral da taxa de inscrição em até 7 dias.</p>
          <p>4.1.2. Fase de escolha de vaga – reembolso integral da parcela de 20% já paga.</p>
          <p>4.1.3. Fase de treinamento – reembolso proporcional da parcela de 20% aos encontros realizados.</p>
          <p>4.1.4. Fase de consolidação do intercâmbio – não há reembolso da parcela de 80%, exceto se o distrito parceiro negar o anfitrião sem culpa do YEP D4510.</p>

          <p><strong>5.</strong> – DO RETORNO ANTECIPADO</p>
          <p>5.1. Em caso de retorno antecipado, os RESPONSÁVEIS não terão direito a reembolso.</p>
          <p>5.2. O programa não se responsabiliza legalmente pelo retorno antecipado se decisão couber ao distrito anfitrião.</p>

          <p><strong>6.</strong> – DECLARAÇÕES FINAIS</p>
          <p>6.1. O CANDIDATO e RESPONSÁVEL(IS) concordam com a participação no Programa, uso de imagem e normas do YEP D4510.</p>
          <p>6.2. Estão cientes das informações, regras e cronograma no site www.yep4510.org.br.</p>
          <p>6.3. O CLUBE PATROCINADOR reconhece o patrocínio do candidato.</p>
          <p>6.4. As partes concordam com as regras distritais e normas do Rotary International.</p>

          <p><strong>IMPORTANTE:</strong> As condições apresentadas fazem parte do protótipo acadêmico. Confirme os valores, prazos e instruções de pagamento com a equipe do programa antes de realizar qualquer pagamento.</p>

          <div className="form-footer">
            <label className="checkbox-container">
              <input type="checkbox" checked={declaro} onChange={e => setDeclaro(e.target.checked)} />
              <span>Declaro que li e concordo</span>
            </label>
            <button className="btn download" type="button">DOWNLOAD DE DOCUMENTOS</button>
            <div className="buttons">
              <button className="btn voltar" type="button" onClick={prevStep}>VOLTAR</button>
              <button className="btn proximo" type="submit">ENVIAR</button>
            </div>
          </div>
        </form>
      )}

    </Layout>
  );
}

export default Inscricao;
