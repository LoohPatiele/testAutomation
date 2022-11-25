/// <reference types= "cypress"/>



describe('Cadastro site kanui ', () => {
  const faker = require('faker-br')

  Cypress.on('uncaught:exception', (err, runnable) => {
    // esse trecho de código visa evitar um falso negativo para os testes por erro de script cruzado 
    return false
  })

  beforeEach(function () {
    cy.visit('https://www.kanui.com.br/')
    cy.get('.header-login-link').contains('Entrar').click({force: true})
    cy.get('.accordion-link').contains('Quero me cadastrar').click()
  })
  
  it('Cadastro com sucesso de pessoa física', () => {

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

  it('Erro no cadastro PF- Nome muito curto', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('L')
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

    cy.get('.errorMessage').should('include.text','Mínimo 2 caracteres')
  })

  it('Erro no cadastro PF- Sobrenome muito curto', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('A')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.errorMessage').should('include.text','Mínimo 2 caracteres')
  })

  it('Erro no cadastro PJ- Email inválido', () => {

    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('L')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.errorMessage').should('include.text','Mínimo 2 caracteres')
  })

  it('Erro no cadastro PF- Email inválido', () => {

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

  // As regras de validação de numero de inscrição estadual não estão implementadas, então este cenário deve falhar
  it('Erro no cadastro - Inscrição estadual inválido', () => {

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
  
  // Essa regra não esta cadastrada e pode ter sido uma questão de escolha de negócio pois já existe a conferencia de CNPJ
  // e tanto CPNJ quanto inscrição estadual são números únicos, estão esta pulando este cenário pois falhará 
  it.skip('Erro no cadastro - Inscrição estadual já cadastrado', () => {
    
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

  it('Erro no cadastro PF - Senhas diferentes', () => {

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
    cy.get('#RegistrationForm_password2').type('Teste124', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-equalto').should('include.text','Certifique-se de que as senhas informadas são idênticas')
  })

  it('Erro no cadastro PJ - Senhas diferentes', () => {

    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste124', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-required').should('include.text','Preencha os campos')
    cy.get('.parsley-equalto').should('include.text','Certifique-se de que as senhas informadas são idênticas')
  })

  //Validação de campos obrigatórios
  //OBS: Esse tipo de validação não é recomendado realizar nesta camada de testes já que E2E são caros e dispendiosos
  it('Erro no cadastro PF - Campo de nome vazio', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
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
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
  })

  it('Erro no cadastro PF - Campo de sobrenome vazio', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
  })

  it('Erro no cadastro PF - Campo de e-mail vazio', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
  })

  it('Erro no cadastro PF - Campo de CPF vazio', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
  })

  it('Erro no cadastro PF - Campo de gênero não selecionado vazio', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
  })

  it('Erro no cadastro PF - Dia do nascimento não selecionado', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })

  it('Erro no cadastro PF - Mês do nascimento não selecionado', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })

  it('Erro no cadastro PF - Ano do nascimento não selecionado', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })

  it('Erro no cadastro PF - Campo de senha vazio', () => {

    cy.get('#RegistrationForm_customer_personality_0').click()
    cy.get('#RegistrationForm_first_name').type('Lucas')
    cy.get('#RegistrationForm_last_name').type('Andrade')
    cy.get('#RegistrationForm_email').type('lucas_a'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_gender').select('Masculino')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cpf(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_day').select('04')
    cy.get('#RegistrationForm_month').select('02')
    cy.get('#RegistrationForm_year').select('1992')
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
  })

  it('Erro no cadastro PF - Campo de confirmação de senha vazio', () => {

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
    cy.get('#customer-account-create').click()
  
    cy.get('.parsley-required').should('include.text','Campo obrigatório')
  })

  it('Erro no cadastro PJ - Campo de razão social vazio', () => {

    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })

  // Esse cenário irá dar erro pois apesar da regra de obrigatoriedade do 
  //campo estar implementada no formulário o cadastro é realizado com sucesso
  it('Erro no cadastro PJ - Campo de inscrição estadual vazio e campo isento não marcado', () => {

    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })

  it('Erro no cadastro PJ - Campo de E-mail vazio', () => {

    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })

  it('Erro no cadastro PJ - Campo de CNPJ vazio', () => {

    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })

  it('Erro no cadastro PJ - Campo de senha vazio', () => {

    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#RegistrationForm_password2').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })

  it('Erro no cadastro PJ - Campo de confirmação de senha vazio', () => {

    cy.get('#RegistrationForm_customer_personality_1').click()
    cy.get('#RegistrationForm_first_name').type('Loja da Looh')
    cy.get('#RegistrationForm_state_registration_exempt').click()
    cy.get('#RegistrationForm_email').type('lojinha'+ faker.random.number() +'@hotmail.com')
    cy.get('#RegistrationForm_tax_identification').type(faker.br.cnpj(), { parseSpecialCharSequences: false})
    cy.get('#form-customer-account-password').type('Teste123', { parseSpecialCharSequences: false})
    cy.get('#customer-account-create').click()

    cy.get('.parsley-required').should('include.text','Campo obrigatório')
    cy.get('.parsley-required').should('include.text','Preencha os campos de data')
  })
})