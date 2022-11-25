# Automação de testes
Projeto para automação de testes da cadastro no site da [Kanui](https://www.kanui.com.br/). 
Desafio proposto como etapa do processo seletivo da [Tangerino](https://www.linkedin.com/company/tangerino/).

Este projeto contém atualmente apenas a spec de cadastro com 35 cenários de testes estando um com "skip" pela regra de negócio não estar implementada e dois com falha por a implementação estar incorreta. Mais detalhes em comentários no código.

## Rodando o projeto
Para rodar o projeto é necessário  instalar o [npm](https://docs.npmjs.com/cli/v8/commands/npm-install) e o [cypress](https://www.cypress.io/).

Na pasta do projeto basta rodar o comando: 

> npm install cypress --save-dev

Em seguida use o comando:

> npm run cypress:open

Você deve visualizar a interface do Cypress. Escolha o browser da sua preferencia e pressione o botão verde em destaque, en seguida clique na spec de cadastro em evidencia na cor azul. Voce deve visualizar os cenários rodando. 

> OBS: Como testes E2E são pesados recomendo dar skip em alguns cenários e rodas apenas alguns por vez. 

Acesse o relatório completo a partir da opção "Runs" na lateral esquerda da tela.



