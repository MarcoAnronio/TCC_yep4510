# YEP 4510 — Sistema de gestão do intercâmbio de jovens

Projeto acadêmico desenvolvido como Trabalho de Conclusão de Curso, com foco na digitalização das inscrições e da seleção de vagas do **Youth Exchange Program (YEP)** do Rotary no Distrito 4510. A proposta é reunir essas etapas em uma plataforma para facilitar o acesso dos candidatos e apoiar o trabalho de oficiais e secretariado.

Este repositório reúne o código-fonte e os materiais de modelagem e identidade visual do projeto.

## Sobre o projeto

O levantamento de requisitos identificou duas etapas realizadas manualmente: a inscrição, com preenchimento e envio da ficha pelo correio, e a escolha de vagas, conduzida presencialmente com o apoio de uma planilha.

Esse formato envolve custos de envio e exige a organização de documentos e informações em diferentes meios. A plataforma busca centralizar as inscrições, o calendário, os resultados e a seleção de vagas, facilitando o acompanhamento do processo pelos candidatos e pela equipe responsável.

## Objetivo

Desenvolver uma plataforma para o cadastro de fichas de inscrição e a seleção de vagas do intercâmbio de jovens do Distrito 4510, complementando as etapas já digitalizadas no programa. Com essa proposta, espera-se reduzir o uso de formulários impressos, melhorar a organização dos registros e facilitar a consulta às informações.

## Funcionalidades previstas

O escopo do projeto contempla:

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
├── modelagem/                # Diagramas, modelo de dados e protótipos
├── identidade-visual/        # Logos, fotografias e guia visual
├── .gitignore
└── README.md
```

## Execução local

### Interface

Requisitos: Node.js 20 ou superior e npm. A aplicação React está em `codigo/FrontEnd/tcc`; as pastas `Index`, `Pages`, `Style` e `components` diretamente em `codigo/FrontEnd` guardam protótipos anteriores.

```powershell
cd codigo/FrontEnd/tcc
npm install
npm start
```

A interface abre em `http://localhost:3000`. O endereço padrão da API é `http://localhost:8080`; para alterá-lo, copie `.env.example` para `.env.local` e ajuste `REACT_APP_API_URL`. Reinicie o frontend após mudar essa configuração. Variáveis do frontend são públicas e não devem conter senhas ou chaves.

A navegação inclui início, calendário, classificação, inscrição, materiais, países, clubes e acesso de usuários. Operações de cadastro e consulta dependem da API e do banco configurados. Os links de materiais hospedados em contas pessoais foram retirados desta versão pública.

### API

Requisitos: Java 21, Maven e uma instância de SQL Server com o banco e as tabelas do projeto preparados.

Em `codigo/api/YEP4510`, copie `src/main/resources/application.properties.example` para `src/main/resources/application.properties`, caso ainda não exista uma configuração local. O arquivo local é ignorado pelo Git.

Configure no ambiente do processo:

| Variável | Uso |
| --- | --- |
| `DB_URL` | URL JDBC da instância de SQL Server |
| `DB_USERNAME` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |
| `JWT_SECRET` | Chave aleatória de assinatura dos tokens, com pelo menos 32 bytes |
| `API_KEY` | Opcional; chave para integrações de servidor, nunca para o navegador |

O modelo utiliza `ddl-auto=validate`: ele verifica o esquema existente e não cria tabelas. Uma configuração local anterior pode usar outras propriedades; nesse caso, mantenha os dados do ambiente e configure também `JWT_SECRET`.

Para gerar uma nova chave temporária na sessão do PowerShell, sem exibi-la:

```powershell
$jwtBytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($jwtBytes)
$env:JWT_SECRET = [Convert]::ToBase64String($jwtBytes)
$rng.Dispose()
```

No ambiente de execução, guarde a chave de forma segura e use o mesmo valor entre reinicializações. A troca da chave invalida os tokens anteriores. A API não inicia se a chave estiver ausente ou for curta demais.

Com o ambiente configurado:

```powershell
cd codigo/api/YEP4510
mvn spring-boot:run
```

### Verificação

Na pasta da interface:

```powershell
npm run build
npm test -- --watchAll=false --runInBand
```

Na pasta da API, os testes de assinatura e autenticação podem ser executados sem banco:

```powershell
mvn "-Dtest=JwtUtilTests,ApiKeyFilterTests" test
```

O teste de contexto completo da API depende da configuração local e do banco. A compilação e os testes isolados não substituem a validação dos fluxos de negócio com a API em execução.

## Modelagem

O [diagrama de classes](modelagem/DiagramaClasses.pdf), a [modelagem do banco de dados](modelagem/modelagemBD.xml) e os [protótipos de telas](modelagem/PrototipacaoTelas.pdf) apresentam a estrutura dos dados e a proposta de navegação.
