describe('template spec', () => {
 beforeEach(() => {
    cy.visit('http://localhost:8000')
    
    cy.url().should('include', '/login')
  

    cy.get('#login-email').should('be.visible').type('admin@example.cz')
    cy.get('#login-password').should('be.visible').type('admin')
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Týmy').should('be.visible').click()
    cy.contains('a', 'Týmy').click()
  })

  it('Team creation', () => {
    const teamName = 'test team'
    cy.contains('Přidat nový tým').click()
    cy.get('#new-team-name').type(teamName)
    cy.get('#new-team-note').type('test')
    cy.contains('button', 'Přidat tým').click()
    cy.contains(teamName).should('be.visible')
  })

it('Duplicity Team creation', () => {
  const teamName = 'A muži'
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes('already exists')) {
      return false 
    }
  });

  
  cy.contains('Přidat nový tým').click()
  cy.get('#new-team-name').type(teamName)
  cy.contains('button', 'Přidat tým').click()

  cy.url().should('include', '/teams')
  cy.get('table').filter(`:contains("${teamName}")`).should('have.length', 1);
})

it('Team deletion', () => {
  const teamName = 'team to delete '

  
  cy.contains('Přidat nový tým').click();
  cy.get('#new-team-name').clear().type(teamName);
  cy.get('#new-team-note').clear().type('delete check');
  cy.contains('button', 'Přidat tým').click();

  cy.contains('td', teamName).should('be.visible');
  cy.contains('tr', teamName).within(() => {
    cy.get('button').contains('Smazat').click();
  });

  cy.get('table').should('not.contain', teamName);
});


it('Team modification', () => {
  const initialName = 'team to modify ' 
  const modifiedName = 'modified team ' 

  // 1. Vytvorenie tímu
  cy.get('#new-team-name').clear().type(initialName);
  cy.get('#new-team-note').clear().type('original note');
  cy.contains('button', 'Přidat tým').click();
  cy.contains('td', initialName).should('be.visible');

  // 2. Kliknutie na Upravit
  // Nájdeme riadok s naším textom a v ňom tlačidlo Upraviť
  cy.contains('tr', initialName).find('button').contains('Upravit').click();

  // 3. Úprava - počkáme, kým sa objaví input s pôvodnou hodnotou
  // Týmto selektorom priamo zasiahneme ten správny input bez hľadania riadka
  cy.get(`input[value="${initialName}"]`).clear().type(modifiedName);

  // 4. Kliknutie na Potvrdit
  // Keďže je riadok v editačnom móde, hľadáme tlačidlo Potvrdit, 
  // ktoré je v rovnakom riadku (rodičovi) ako náš nový input
  cy.get(`input[value="${modifiedName}"]`)
    .parents('tr')
    .find('button')
    .contains('Potvrdit')
    .click();

  // 5. Overenie
  cy.get('table').should('not.contain', initialName);
  cy.get('table').should('contain', modifiedName);
});

})