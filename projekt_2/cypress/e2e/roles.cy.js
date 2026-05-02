// Unique timestamp for test data isolation
const timestamp = Date.now();

// Test user credentials
const CommitteeEmail = 'committee@example.cz ' + timestamp
const CommitteePassword = 'password123'

const TrainerEmail = 'trainer@example.cz' + timestamp 
const TrainerPassword = 'password123'

const MemberEmail = 'member@example.cz' + timestamp
const MemberPassword = 'password123'

const PlayerEmail = 'player@example.cz' + timestamp
const PlayerPassword = 'password123'

const AdminEmail = 'admin@example.cz'
const AdminPassword = 'admin'

// Ignore specific application errors
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Missing required action for this endpoint')) {
    return false; 
  }
  return true; 
});

describe('template spec', () => {
  // Create all required users once
    before(() => {
    cy.visit('http://localhost:8000')
    
    cy.url().should('include', '/login')
  
    
    cy.get('#login-email').should('be.visible').type(AdminEmail)
    cy.get('#login-password').should('be.visible').type(AdminPassword)
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Uživatelé').should('be.visible').click()

    // Create Committee user
    cy.get('#new-user-email').type(CommitteeEmail)
    cy.get('#new-user-password').type(CommitteePassword)
    cy.contains('label', 'COMMITTEE').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(CommitteeEmail).should('be.visible')
    cy.contains('tr', CommitteeEmail).should('contain', 'COMMITTEE');

    // Create Trainer user
    cy.get('#new-user-email').type(TrainerEmail)
    cy.get('#new-user-password').type(TrainerPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(TrainerEmail).should('be.visible')
    cy.contains('tr', TrainerEmail).should('contain', 'TRAINER');

   // Create Member user
    cy.get('#new-user-email').type(MemberEmail)
    cy.get('#new-user-password').type(MemberPassword)
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(MemberEmail).should('be.visible')
    cy.contains('tr', MemberEmail).should('contain', 'MEMBER');


    // Create Player user
    cy.get('#new-user-email').type(PlayerEmail)
    cy.get('#new-user-password').type(PlayerPassword)
    cy.contains('label', 'PLAYER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(PlayerEmail).should('be.visible')
    cy.contains('tr', PlayerEmail).should('contain', 'PLAYER');

    cy.get('button').contains('Odhlásit se').click()
   
  })

  // Start at login page before each test
  beforeEach(() => {
    cy.visit('http://localhost:8000')
  })


  //19
  it(' Member permissions', () => {
    cy.get('#login-email').should('be.visible').type(MemberEmail)
    cy.get('#login-password').should('be.visible').type(MemberPassword)
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Můj účet').should('be.visible')
    cy.contains('a', 'Členové').should('not.exist')
    cy.contains('a', 'Týmy').should('not.exist')
    cy.contains('a', 'Uživatelé').should('not.exist')
    cy.contains('a', 'Platby').should('not.exist')
    cy.contains('a', 'Operace plateb').should('not.exist')
    cy.contains('a', 'E-mailový log').should('not.exist')
    cy.contains('a', 'Role').should('not.exist')
  })

  //20
  it(' Player permissions', () => {
    cy.get('#login-email').should('be.visible').type(PlayerEmail)
    cy.get('#login-password').should('be.visible').type(PlayerPassword)
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Můj účet').should('be.visible')
    cy.contains('a', 'Členové').should('not.exist')
    cy.contains('a', 'Týmy').should('not.exist')
    cy.contains('a', 'Uživatelé').should('not.exist')
    cy.contains('a', 'Platby').should('not.exist')
    cy.contains('a', 'Operace plateb').should('not.exist')
    cy.contains('a', 'E-mailový log').should('not.exist')
    cy.contains('a', 'Role').should('not.exist')
  })


  //21
  it(' Committee permissions', () => {
    cy.get('#login-email').should('be.visible').type(CommitteeEmail)
    cy.get('#login-password').should('be.visible').type(CommitteePassword)
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Můj účet').should('not.exist')
    cy.contains('a', 'Členové').should('be.visible')
    cy.contains('a', 'Týmy').should('be.visible')
    cy.contains('a', 'Uživatelé').should('not.exist')
    cy.contains('a', 'Platby').should('be.visible')
    cy.contains('a', 'Operace plateb').should('not.exist')
    cy.contains('a', 'E-mailový log').should('not.exist')
    cy.contains('a', 'Role').should('not.exist')
  })


//22
  it(' Trainer permissions', () => {
    cy.get('#login-email').should('be.visible').type(TrainerEmail)
    cy.get('#login-password').should('be.visible').type(TrainerPassword)
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Můj účet').should('not.exist')
    cy.contains('a', 'Členové').should('be.visible')
    cy.contains('a', 'Týmy').should('be.visible')
    cy.contains('a', 'Uživatelé').should('not.exist')
    cy.contains('a', 'Platby').should('be.visible')
    cy.contains('a', 'Operace plateb').should('not.exist')
    cy.contains('a', 'E-mailový log').should('not.exist')
    cy.contains('a', 'Role').should('not.exist')
  })
  
   
  //13
  it(' Admin permissions', () => {
    cy.get('#login-email').should('be.visible').type(AdminEmail)
    cy.get('#login-password').should('be.visible').type(AdminPassword)
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Můj účet').should('be.visible')
    cy.contains('a', 'Členové').should('be.visible')
    cy.contains('a', 'Týmy').should('be.visible')
    cy.contains('a', 'Uživatelé').should('be.visible')
    cy.contains('a', 'Platby').should('be.visible')
    cy.contains('a', 'Operace plateb').should('be.visible')
    cy.contains('a', 'E-mailový log').should('be.visible')
    cy.contains('a', 'Role').should('be.visible')
  })

})