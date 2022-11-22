// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('generateUser',() => {
    const faker = require('faker-br')

    // cy.writeFile('cypress/fixtures/user.json', {
    //     "user": Cypress._.times(5 , () => {
    //         return{
    //             'firstName': 'Lucas',
    //             'lastName': 'Andrade',
    //             'gender': 'Masculino',
    //             'email': 'lucas_a'+ faker.random.number() +'@hotmail.com',
    //             'cpf': faker.br.cpf(),
    //             'day':'02',
    //             'month':'05',
    //             'year': '1995',
    //             'password': 'Teste123',
    //         }
    //     })
    // })

    // cy.writeFile('cypress/fixtures/user.json', {

    //     'firstName': 'Lucas',
    //     'lastName': 'Andrade',
    //     'gender': 'Masculino',
    //     'email': 'lucas_a'+ faker.random.number() +'@hotmail.com',
    //     'cpf': faker.br.cpf(),
    //     'day':'02',
    //     'month':'05',
    //     'year': '1995',
    //     'password': 'Teste123',
    // })
})