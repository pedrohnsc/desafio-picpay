![picture alt](./images/logo-picpay.png "PicPay Logo")

# Desafio para vaga de QA
[![E2E library: Cypress](https://img.shields.io/badge/E2E%20Framework-Cypress-blue)](https://www.cypress.io/)



## Execução

### Pré-Requisitos

- [Git](https://git-scm.com/download/) e [Node.js](https://nodejs.org/en/download/) instalado.

### Instalando as dependências e executando os testes

Todos os comandos abaixo são executados pelo _prompt de comando_.

**1** - Clone o reporsitorio e acesse o diretório criado:

```sh
git clone https://github.com/pedrohnsc/desafio-picpay.git && cd desafio-picpay 
```

**2** - Instale as depedências necessárias para rodar os testes:

```sh
npm install
```

**3** - Você pode escolher rodar os testes no modo com interface gráfica(GUI) ou em Headless, para rodar com o GUI, digite o seguinte comando e depois dsso escolha qual spec você quer rodar:

```sh
npm run open
```

**4** - Para rodar o modo Headless, digite: 

```sh
npm run cypress:run
```
---
[Licença MIT](/LICENSE)