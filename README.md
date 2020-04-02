![logo-branca](https://user-images.githubusercontent.com/39037180/77867103-34d88300-720c-11ea-943f-609933b3370e.png)

# TASKS

Gerenciador de Tarefas com cronômetro

Desenvolvido em ReactJS

## Objetivo

- O usuário pode criar e editar tarefas;
- Cada tarefa criada possui um cronômetro;
- Cada tarefa possui dois botões:
  - Play / Start: Inicia a tarefa / cronômetro;
  - Stop: Para a tarefa / cronômetro;
- Cada tarefa contem um botão para marcar sua “conclusão”;
- Tarefas concluídas são listadas em um tela, onde constam: 
  - Tempo total computado até a conclusão da tarefa (desde o primeiro “start” até a conclusão)
  - Botão para “reabrir a tarefa”;
- Contem um campo com o “Tempo Total Trabalhado” que é a soma do tempo de todas as tarefas;
- A aplicação mantem o cronômetro rodando para a tarefa selecionada ainda que a janela seja atualizada ou o navegador seja fechado;

## Ferramentas e dependencias usadas:

#### Backend
- [NodeJS](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/pt-br/)
- [Knex](http://knexjs.org/)
- [Celebrate](https://www.npmjs.com/package/celebrate)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Nodemon](https://nodemon.io/)
- [Cross-env](https://www.npmjs.com/package/cross-env)
- Banco de Dados: [SQLite](https://www.sqlite.org/index.html)

## Instalação

#### Backend

Na pasta _backend_ rode o comando de instalação dos pacotes com npm
```
npm install
```

Para iniciar o _backend_ basta executar
```
npm start
```

#### Frontend

Na pasta _frontend_ rode o comando de instalação dos pacotes com npm
```
npm install
```

Para iniciar o _frontend_ basta executar
```
npm start
```
