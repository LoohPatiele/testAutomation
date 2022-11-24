/// <reference types= "cypress"/>

describe('Cadastro site kanui ', () => {
  const faker = require('faker-br')

  Cypress.on('uncaught:exception', (err, runnable) => {
    // esse trecho de código visa evitar um falso negativo para os testes por erro de script cruzado 
    return false
  })
  
  it('Cadastro com sucesso de pessoa física', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.url().should('contain', '/customer/account/home')
    cy.get('.header-login-welcome-name').should('have.text','Lucas')
  })

  it('Cadastro com sucesso de pessoa jurídica', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.url().should('contain', '/customer/account/home')
    cy.get('.header-login-welcome-name').should('have.text','Loja')
  })

  it('Erro no cadastro PF- Email inválido', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-type').should('include.text','E-mail inválido')
  })

  it('Erro no cadastro PJ- Email inválido', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha23479')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-required').should('include.text','Preencha os campos')
    cy.get('.parsley-type').should('include.text','E-mail inválido')
  })

  it('Erro no cadastro PF- Email já cadastrado', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a97748@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.message-description').should('include.text','E-mail').and('include.text', 'já cadastrado')  
  })

  it('Erro no cadastro PJ- Email já cadastrado', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha23479@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.message-description').should('include.text','E-mail').and('include.text', 'já cadastrado')
  })

  it('Erro no cadastro - CPF inválido', () => {
    
    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type('25150475051')
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.errorMessage').should('include.text','CPF').and('include.text', 'inválido')

  })

  it('Erro no cadastro - CPF já cadastrado', () => {
    
    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type('13279535280')
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.message-description').should('include.text','CPF').and('include.text', 'já cadastrado')

  })

  it('Erro no cadastro - CNPJ inválido', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type('36214538000107')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.errorMessage').should('include.text','CNPJ').and('include.text', 'inválido')

  })

  it('Erro no cadastro - CNPJ já cadastrado', () => {
    
    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type('05627233104779')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.message-description').should('include.text','CNPJ').and('include.text', 'já cadastrado')

  })

  it('Erro no cadastro - Data de nascimento inválida', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('30')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1993')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.url().should('contain', 'customer/account/login/')
    // A mensagem não deixa claro qual o erro, recomendaria uma melhoria no retorno para o usuário
    cy.get('.message-description').should('include.text','E-mail ou CPF já cadastrado(s).')
  })

  it.only('Erro no cadastro - Inscrição estadual inválido', () => {

    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration').type('00000000', {force: true})
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.errorMessage').should('include.text','CNPJ')

  })

  it.only('Erro no cadastro - Inscrição estadual já cadastrado', () => {
    
    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click()
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration').type('596899139170',{force: true})
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.url().should('contain', 'customer/account/login/')
    // A mensagem não deixa claro qual o erro, recomendaria uma melhoria no retorno para o usuário
    cy.get('.message-description').should('include.text','E-mail ou CNPJ já cadastrado(s).')

  })

  //senhas diferentes
  //campos obrigatórios
  //Inscrição estadual inválida e já cadastrado
  //Nome muito curto
  //Sobrenome muito curto
  //razão social muito curta

})