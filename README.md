# Projeto em NodeJs com Typescript

Projeto desenvolido no ecossistema NodeJs com a intenção de exercitar a utilização das seguintes tecnologias:

- [NodeJs](https://nodejs.org/en) com [Typescript](https://www.typescriptlang.org/);
- [Express](https://expressjs.com/), para expor uma API Rest;
- [Express-validator](https://express-validator.github.io/docs) para aplicar validações nas requisições;
- [PostgreSQL](https://www.postgresql.org/) para armazenamento de dados;
- [TypeOrm](https://typeorm.io/) para manipulação da persistência de dados (ORM) e gerenciamento de versões (migrations);
- [Jest](https://jestjs.io/pt-BR/) e [Supertest](https://www.npmjs.com/package/supertest) para testes unitários e integrados.


## Etapas do Projeto

- Desenvolver CRUD básico de usuários; :heavy_check_mark:
- Desenvolver CRUD básico de categorias; :heavy_check_mark:
- Desenvolver CRUD básico de Registros financeiros; :heavy_check_mark:
- Inclusão de validação nas entradas da API; :heavy_check_mark:
- Testes unitários com database em memória; :heavy_check_mark:
- Testes integrados com database reservado à testes; :heavy_check_mark:
- Incluir mais regras de negócio e aumentar cobertura de testes;
- Adicionar controle de acesso segregando por tipo de usuário;
- Inserir produção e consumo em filas;
- Explorar mais opções para cobertura de testes (mocks, testContainer, etc);
- ...


## Passos para rodar o projeto

1. Ter NodeJs e PostgresSQl instalado;
2. Clonar projeto e rodar `npm i` no diretório raiz;
2. Ajustar dados de acesso ao PostegreSQL no arquivo `src/infra/orm/datasource.ts`;
3. Rodar `npm run server:start`.