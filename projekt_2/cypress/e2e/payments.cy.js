describe('template spec', () => {
   beforeEach(() => {
    cy.visit('http://localhost:8000')
    
    cy.url().should('include', '/login')
  

    cy.get('#login-email').should('be.visible').type('admin@example.cz')
    cy.get('#login-password').should('be.visible').type('admin')
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')

    cy.contains('a', 'Členové').should('be.visible').click()
    cy.contains('Přidat nového člena').click()
    
    const today = new Date().toLocaleDateString('en-CA');
    const name = 'Tomas'
    const surname = 'Suda'
    const email = `tomassuda@gmail.com`
    cy.get('#new-member-first-name').type(name)
    cy.get('#new-member-last-name').type(surname)
    cy.get('#new-member-primary-email').type(email)
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

    cy.get('table').should('contain', name).and('contain', surname);

    
    cy.contains('a', 'Platby').should('be.visible').click()
  })

  it(' Create expected payments for multiple members', () => {

     const today = new Date().toLocaleDateString('en-CA');

    cy.contains('a', 'Členové').should('be.visible').click()   
    cy.get('tr').filter(':contains("Tomáš")').filter(':contains("Novák")')
      .find('input[type="checkbox"]').check();

    cy.get('tr').filter(':contains("Tomas")').filter(':contains("Suda")')
      .first().find('input[type="checkbox"]').check();

    cy.get('button').contains('Připravit očekávanou platbu').click()

    cy.get('#prepare-title').should('be.visible').type('Membership Fee')
    cy.get('#prepare-amount').should('be.visible').type('100')
    cy.get('input[type="date"]#prepare-due-date').should('exist').and('be.visible').type(today);

    cy.get('button').contains('Vytvořit očekávané platby').click()
    cy.get('#root p.text-success').should('have.text', 'Úspěšně vytvořeno: 2');
    cy.contains('a', 'Platby').should('be.visible').click()

    cy.contains('tr', 'Tomas Suda').within(() => {
       cy.get('td').should('contain', 'Membership Fee').and('contain', '100.00 Kč');
    });

    cy.contains('tr', 'Tomáš Novák').within(() => {
       cy.get('td').should('contain', 'Membership Fee').and('contain', '100.00 Kč');
    });

  })


  it('Find payment with Filters', () => {
    const today = new Date().toLocaleDateString('en-CA');
    cy.contains('a', 'Členové').should('be.visible').click()

    cy.get('tr').filter(':contains("Jana")').filter(':contains("Nováková")')
      .find('input[type="checkbox"]').check();

      cy.get('button').contains('Připravit očekávanou platbu').click()

    cy.get('#prepare-title').should('be.visible').type('Membership Fee')
    cy.get('#prepare-amount').should('be.visible').type('100')
    cy.get('input[type="date"]#prepare-due-date').should('exist').and('be.visible').type(today);

    cy.get('button').contains('Vytvořit očekávané platby').click()
    cy.get('#root p.text-success').should('have.text', 'Úspěšně vytvořeno: 1');


    cy.contains('a', 'Členové').should('be.visible').click()   
    cy.get('tr').filter(':contains("Tomáš")').filter(':contains("Novák")')
      .find('input[type="checkbox"]').check();

    cy.get('tr').filter(':contains("Tomas")').filter(':contains("Suda")')
      .first().find('input[type="checkbox"]').check();

    cy.get('button').contains('Připravit očekávanou platbu').click()

    cy.get('#prepare-title').should('be.visible').type('Training Fee')
    cy.get('#prepare-amount').should('be.visible').type('200')
    cy.get('input[type="date"]#prepare-due-date').should('exist').and('be.visible').type(today);


    cy.get('button').contains('Vytvořit očekávané platby').click()
    cy.get('#root p.text-success').should('have.text', 'Úspěšně vytvořeno: 2');

    

  })
})