// Unique timestamp for test data isolation
const timestamp = Date.now();

describe('template spec', () => {
  // Shared setup for each test case
 beforeEach(() => {
    cy.visit('http://localhost:8000')
    
    cy.url().should('include', '/login')
  
   // Admin login sequence
    cy.get('#login-email').should('be.visible').type('admin@example.cz')
    cy.get('#login-password').should('be.visible').type('admin')
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Týmy').should('be.visible').click()
  })

  //4
  it('Team creation', () => {

    //unique team name to avoid conflicts with existing teams
    const teamName = 'test team' + timestamp
    //team creation sequence
    cy.contains('Přidat nový tým').click()
    cy.get('#new-team-name').type(teamName)
    cy.get('#new-team-note').type('test')
    cy.contains('button', 'Přidat tým').click()
    // Verify the new team appears in the list
    cy.contains(teamName).should('be.visible')
  })

//5
it('Duplicity Team creation', () => {

  //unique team name to avoid conflicts with existing teams
  const teamName = 'A muži' + timestamp

  // Handle potential "already exists" error gracefully
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes('already exists')) {
      return false 
    }
  });
  
  cy.contains('Přidat nový tým').click()
  cy.get('#new-team-name').type(teamName)
  cy.contains('button', 'Přidat tým').click()

// Ensure the record is not created twice
  cy.url().should('include', '/teams')
  cy.get('table').filter(`:contains("${teamName}")`).should('have.length', 1);
})

//6
it('Team deletion', () => {
  //unique team name to avoid conflicts with existing teams
  const teamName = 'team to delete ' + timestamp

  // Create a team to delete
  cy.contains('Přidat nový tým').click();
  cy.get('#new-team-name').clear().type(teamName);
  cy.get('#new-team-note').clear().type('delete check');
  cy.contains('button', 'Přidat tým').click();

  // Delete the team
  cy.contains('td', teamName).should('be.visible');
  cy.contains('tr', teamName).within(() => {
    cy.get('button').contains('Smazat').click();
  });

  // Ensure the team is removed from the list
  cy.get('table').should('not.contain', teamName);
});

//7
it('Team modification', () => {
  //unique team names to avoid conflicts with existing teams
  const initialName = 'team to modify ' + timestamp
  //Unique modified name to verify the change
  const modifiedName = 'modified team ' + timestamp

  // Create a team to modify
  cy.get('#new-team-name').clear().type(initialName);
  cy.get('#new-team-note').clear().type('original note');
  cy.contains('button', 'Přidat tým').click();
  cy.contains('td', initialName).should('be.visible');

  // Modify the team name
  cy.contains('tr', initialName).find('button').contains('Upravit').click();
  cy.get(`input[value="${initialName}"]`).clear().type(modifiedName);

  // Save the changes
  cy.get(`input[value="${modifiedName}"]`)
    .parents('tr')
    .find('button')
    .contains('Potvrdit')
    .click();

    // Ensure the team name is updated in the list
  cy.get('table').should('not.contain', initialName);
  cy.get('table').should('contain', modifiedName);
});

})