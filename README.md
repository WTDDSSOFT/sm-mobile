# sm-mobile

### Prova feita com node.js e react-native.

- Funcionalidade 1: Cadastro de médico - ok
- Funcionalidade 2: Cadastro de paciente - ok
- Funcionalidade 3: Realizar atendimento - ok
- Funcionalidade 4: Gerar relatório/tabela dos atendimentos, por data início e data fim; -
- Funcionalidade 5: Integrações via json - ok.

**Desafio 01: Modelar o banco para atender os requisitos**. -ok
**Desafio 02: Legibilidade do código fonte**. -ok
**Desafio 03: Realizar consulta no banco** -ok
**Desafio 04: Integração** -ok
  - Construção direto do app.


### duvidas que surgiram ao final da construção do app & erros.

- o Cadastro dos medicos e pelo crm ou password ?.

  - O atendimento e criado pelo usuario ou medico ?.
  - Na construção de rotas para usuario e medicos, a authentication e dada por password para usuario e do medico por crm/password.  
  - Erro ao busca atendimento da api, reject promise.
  - Os cadastros dos medicos foram feitos pelo imsonina.
  - O relatorio e praçe gerado em pdf. ?

### O que melhora.
  - Estudar e pratica mais o consumo de apis em react-native.
  - Defini a prototipação mais detalhada antes de coda.
  
# Como Roda  APi & APP.

# Docker
-  docker run --name gostack_samel -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
-  docker ps -a
- docker start nome do container.

# APi
 - stacks: Node.js, jwt, typeorm, Rest, express, autenticação dos users e doctors
- yarn install
  ## Migrations
    - yarn typeorm migrations:run

# React-Native
  yarn start
  yarn android.
  
