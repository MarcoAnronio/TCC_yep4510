# YEP 4510 — Sistema de gestão do intercâmbio de jovens

Projeto acadêmico desenvolvido como Trabalho de Conclusão de Curso, com foco na digitalização das inscrições e da seleção de vagas do **Youth Exchange Program (YEP)** do Rotary no Distrito 4510. A proposta é reunir essas etapas em uma plataforma para facilitar o acesso dos candidatos e apoiar o trabalho de oficiais e secretariado.

Este repositório reúne o código-fonte, a documentação acadêmica e os materiais de modelagem e identidade visual do projeto.

## Sobre o projeto

O levantamento apresentado na qualificação identifica duas etapas realizadas manualmente: a inscrição, com preenchimento e envio da ficha pelo correio, e a escolha de vagas, conduzida presencialmente com o apoio de uma planilha.

Esse formato envolve custos de envio e exige a organização de documentos e informações em diferentes meios. A plataforma busca centralizar as inscrições, o calendário, os resultados e a seleção de vagas, facilitando o acompanhamento do processo pelos candidatos e pela equipe responsável.

## Objetivo

Desenvolver uma plataforma para o cadastro de fichas de inscrição e a seleção de vagas do intercâmbio de jovens do Distrito 4510, complementando as etapas já digitalizadas no programa. Com essa proposta, espera-se reduzir o uso de formulários impressos, melhorar a organização dos registros e facilitar a consulta às informações.

## Funcionalidades previstas

O escopo definido na qualificação contempla:

- **Acesso:** cadastro e login de candidatos e oficiais.
- **Inscrições:** preenchimento, envio e consulta de fichas pela área do candidato.
- **Calendário e materiais:** consulta a treinamentos, datas relevantes e materiais de preparação para a prova.
- **Resultados e classificação:** cadastro e consulta dos resultados das provas e da classificação final.
- **Escolha de vagas:** organização e consulta do processo de seleção dos destinos de intercâmbio.
- **Cadastros de apoio:** manutenção de usuários, clubes do distrito e distritos parceiros confirmados.

As funcionalidades listadas correspondem ao planejamento do projeto. A implementação e a validação de cada item precisam ser verificadas no código e nos testes da aplicação.

## Tecnologias

Tecnologias identificadas nos arquivos de configuração do projeto:

| Camada | Tecnologias |
| --- | --- |
| Interface | React, JavaScript, HTML e CSS |
| API | Java 21 e Spring Boot |
| Persistência | Spring Data JPA e driver JDBC para SQL Server |
| Compilação e execução | Maven e React Scripts |

## Estrutura do repositório

```text
.
├── codigo/
│   ├── api/                  # Projeto da API
│   └── FrontEnd/             # Projeto e materiais da interface
├── documentos/
│   ├── monografia/           # Versões do texto do TCC
│   ├── qualificacao/         # Proposta e escopo do trabalho
│   ├── apresentacoes/        # Banners em PowerPoint e PDF
│   ├── referencias/          # Material acadêmico de referência
│   └── formularios/          # Ficha de inscrição do programa
├── modelagem/                # Diagramas, modelo de dados e protótipos
├── identidade-visual/        # Logos, fotografias e guia visual
├── arquivos-compactados/     # Pacote original da qualificação
├── .gitignore
└── README.md
```

## Documentação

A [qualificação](documentos/qualificacao/Qualificacao.pdf) apresenta o contexto, os objetivos, a justificativa e o planejamento do trabalho. A metodologia proposta é qualitativa e considera as percepções de pessoas envolvidas nas inscrições e na seleção de vagas para orientar o desenvolvimento da plataforma.

O [diagrama de classes](modelagem/DiagramaClasses.pdf), a [modelagem do banco de dados](modelagem/modelagemBD.xml) e os [protótipos de telas](modelagem/PrototipacaoTelas.pdf) complementam a documentação com a estrutura dos dados e a proposta de navegação. As versões do texto acadêmico estão em [documentos/monografia](documentos/monografia/).

## Autoria

**Marco Antonio de Lima Lopes**  
Tecnologia em Análise e Desenvolvimento de Sistemas — Fundação Educacional do Município de Assis (FEMA)  
Orientação: **Dr. Luiz Ricardo Begosso**  
Assis/SP, 2025.
