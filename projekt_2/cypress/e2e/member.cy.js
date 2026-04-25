describe('Members', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000')
    
    cy.url().should('include', '/login')
  

    cy.get('#login-email').should('be.visible').type('admin@example.cz')
    cy.get('#login-password').should('be.visible').type('admin')
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Členové').should('be.visible').click()
  })

  it('Create a new member and assign them to a team', () => {
    cy.contains('Přidat nového člena').click()
    
    const today = new Date().toLocaleDateString('en-CA');
    
    cy.get('#new-member-first-name').type('Tomas')
    cy.get('#new-member-last-name').type('Suda')
    cy.get('#new-member-primary-email').type("tomassuda@gmail.com")
    cy.get('#new-member-birth-date').type(today)
    
    cy.contains('button', 'Přidat člena').click()
    cy.contains('button', 'Uložit člena').click()
    
    cy.get('select.form-select')
    .contains('Vyberte tým')
    .parent('select')
    .select('A muži');
    
    
       cy.get('section.champ-panel table input[type="date"]')
    .first()
    .type(today)
    
    cy.contains('button', '+').click()
    
    
    cy.get('#root td:nth-child(5) div.d-flex button.btn-outline-primary').click();
    cy.get('#root a.active').click();

   cy.get('table').should('contain', 'Tomas').and('contain', 'Suda');
  })

  it('Search for existing member by name', () => {
    cy.get('input[aria-label="Jméno"]').clear().type('Tomáš')
    cy.get('table').should('contain', 'Tomáš').and('contain', 'Novák');
    cy.get('table').should('not.contain', 'Jana').and('not.contain', 'Nováková')
  })


   it('Filter members by status and team', () => {

    cy.get('body').then(($body) => {
      if ($body.find('button[aria-label="Zobrazit sloupec Stav"]').length > 0) {
        cy.get('button[aria-label="Zobrazit sloupec Stav"]').click();
      }
    });

  cy.get('select[aria-label="Stav"]').should('be.visible').select('ACTIVE');

  cy.get('body').then(($body) => {
    if ($body.find('button[aria-label="Zobrazit sloupec Týmy"]').length > 0) {
      cy.get('button[aria-label="Zobrazit sloupec Týmy"]').click();
    }
  });

  cy.get('input[aria-label="Týmy"]').clear().type('A muži');

  cy.get('table').should('contain', 'Tomáš').and('contain', 'Novák');
  cy.get('table').should('not.contain', 'Jana');
});

})