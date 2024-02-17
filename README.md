# Projeto em NodeJs com Typescript

Projeto desenvolido no ecossistema NodeJs desenvolvido com a intenção de exercitar a utilização das seguintes tecnologias:

- [NodeJs](https://nodejs.org/en) com [Typescript](https://www.typescriptlang.org/);
- [Express](https://expressjs.com/), para expor uma API Rest;
- [Express-validator](https://express-validator.github.io/docs) para aplicar validações nas requisições;
- [PostgreSQL](https://www.postgresql.org/) para armazenamento de dados;
- [TypeOrm](https://typeorm.io/) para manipulação da persistência de dados (ORM) e gerenciamento de versões (migrations);
- [Jest](https://jestjs.io/pt-BR/) e [Supertest](https://www.npmjs.com/package/supertest) para testes unitários e integrados.


## Etapas do Projeto

- Desenvolver CRUD básico de usuários;
- Desenvolver CRUD básico de categorias;
- Desenvolver CRUD básico de Registros financeiros;
- Inclusão de validação nas entradas da API;
- Testes unitários com database em memória;
- Testes integrados com database reservado à testes;
- Incluir mais regras de negócio e aumentar cobertura de testes;
- Adicionar controle de acesso segregando por tipo de usuário;
- Inserir produção e consumo em filas;
- Explorar mais opções para cobertura de testes (mocks, testContainer, etc);
- ...


Passos para rodar o projeto

1. Ter NodeJs e PostgresSQl instalado;
2. Clonar projeto e rodar `npm i` no diretório raiz;
2. Ajustar dados de acesso ao PostegreSQL no arquivo `src/infra/orm/datasource.ts`;
3. Rodar `npm run server:start`.
