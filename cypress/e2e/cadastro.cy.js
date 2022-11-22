/// <reference types= "cypress"/>



describe('Cadastro site kanui ', () => {
  const faker = require('faker-br')
  
  
  // beforeEach(() => {
  //   cy.generateUser()
  //   cy.fixture('user').then(data => {
  //     cy.log('fixture is:', data);
  //   });
  // })
  

  
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    // esse trecho de código visa evitar um falso negativo para os testes por erro de script cruzado 
    return false
  })
  
  
  it.only('Cadastro com sucesso de pessoa física', () => {

    // const user_data = {
    //   'firstName': 'Lucas',
    //   'lastName': 'Andrade',
    //   'gender': 'Masculino',
    //   'email': 
    //   'cpf': faker.br.cpf(),
    //   'day':'02',
    //   'month':'05',
    //   'year': '1995',
    //   'password': 'Teste123',
    // }

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('gggg')
    cy.get('#RegistrationForm_last_name').type('lastName')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false,})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false,})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false,})
    cy.get('#customer-account-create').click()
  
    // cy.url().should('contain', '/customer/account/home')
    // cy.get('.header-login-welcome-name').should('have.text','Lucas')
  })

  it('Cadastro com sucesso de pessoa jurídica', () => {
    // cy.visit('https://www.kanui.com.br/')
    // cy.get('.header-login-link').contains('Entrar').click()
    // cy.get('.accordion-link').contains('Quero me cadastrar').click()
    // cy.get('#RegistrationForm_customer_personality_1').click()

  })

  it('Erro no cadastro - Email inválido', () => {
    
  })

  it('Erro no cadastro - Email já cadastrado', () => {
    
  })

  it('Erro no cadastro - CPF inválido', () => {
    
  })

  it('Erro no cadastro - CPF já cadastrado', () => {
    
    //const mensage= cy.get('.message').should('be.disabled')
    //expect().to.contains('CPF já cadastrado')
  })

  it('Erro no cadastro - Usuário já cadastrado', () => {
    
  })
})