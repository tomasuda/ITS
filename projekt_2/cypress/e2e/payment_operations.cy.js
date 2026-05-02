
describe('template spec', () => {
  // Shared setup for each test case
    beforeEach(() => {
    cy.visit('http://localhost:8000')
    
    // Admin login sequence
    cy.url().should('include', '/login')
    cy.get('#login-email').should('be.visible').type('admin@example.cz')
    cy.get('#login-password').should('be.visible').type('admin')
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')

    cy.contains('a', 'Operace plateb').should('be.visible').click()
    
  })

  //16
  it('Creating Manual Payment', () => {
    // Generate current date in YYYY-MM-DD format
    const today = new Date().toLocaleDateString('en-CA');

    // Create a manual payment transaction
    cy.get('#payments-manual-amount').should('be.visible').type('100')
    cy.get('#payments-manual-note').should('be.visible').type('test payment')
    cy.get('input[type="date"]#payments-manual-date').should('exist').and('be.visible').type(today);
    cy.get('button').contains('Zadat ruční transakci').click()

    //Ensure the new transaction appears in the list of unmatched transactions with correct details
    cy.contains('h3', 'Nespárované transakce')
      .next('.champ-table-wrap')
      .find('table tbody tr')
      .should('contain', `100.00 Kč`)
      .and('contain', "test payment")
      .and('contain', 'MANUAL_ADMIN');
  })
  
  //17
  it ('Pairing Manual Payment', () => {
    // Generate current date in YYYY-MM-DD format
    const today = new Date().toLocaleDateString('en-CA');

    // Create a manual payment transaction
    cy.get('#payments-manual-amount').should('be.visible').type('200')
    cy.get('#payments-manual-note').should('be.visible').type('test payment')
    cy.get('input[type="date"]#payments-manual-date').should('exist').and('be.visible').type(today);
    cy.get('button').contains('Zadat ruční transakci').click()
    cy.contains('h3', 'Nespárované transakce')
      .next('.champ-table-wrap')
      .find('table tbody tr')
      .should('contain', `200.00 Kč`)
      .and('contain', "test payment")
      .and('contain', 'MANUAL_ADMIN');

    // Create an expected payment to pair with
    cy.contains('a', 'Členové').should('be.visible').click()
    cy.get('tr').filter(':contains("Jana")').filter(':contains("Nováková")').find('input[type="checkbox"]').check();
    cy.get('button').contains('Připravit očekávanou platbu').click()
    cy.get('#prepare-title').should('be.visible').type('Membership Fee')
    cy.get('#prepare-amount').should('be.visible').type('100')
    cy.get('input[type="date"]#prepare-due-date').should('exist').and('be.visible').type(today);
    cy.get('button').contains('Vytvořit očekávané platby').click()
    cy.get('#root p.text-success').should('have.text', 'Úspěšně vytvořeno: 1');

    // Match transactions to expected payments
    cy.contains('a', 'Operace plateb').should('be.visible').click()
    cy.get('#payments-match-tx').contains('200.00 Kč').invoke('val').then((txId) => {
        cy.get('#payments-match-tx').select(txId);
    });
    cy.get('#payments-match-payment').contains('Jana Nováková / Membership Fee').invoke('val').then((payId) => {
      cy.get('#payments-match-payment').select(payId);
    });
    cy.get('#payments-match-amount').clear().type('100');
    cy.contains('button', 'Spárovat platbu').click();

    // Ensure the matched payment now appears in the list of paired payments with correct details
    cy.contains('h2', 'Spárované platby')
      .closest('section') 
      .find('.champ-table-wrap table tbody tr')
      .should('contain', 'Jana Nováková')
      .and('contain', 'Membership Fee')
      .and('contain', today)
      .and('contain', '100.00 Kč');

    // Ensure the matched transaction is no longer listed under unmatched transactions
    cy.contains('h3', 'Nespárované transakce')
      .next('.champ-table-wrap')
      .find('table tbody tr')
      .should('contain', `200.00 Kč`)
      .and('contain', "100.00 Kč")
      .and('contain', today)
      .and('contain', "test payment")
      .and('contain', 'MANUAL_ADMIN');

    // Check in global Payments list
    cy.contains('a', 'Platby').should('be.visible').click()
    cy.get('table tbody tr').first().within(() => {
        cy.get('td').should('contain', 'Jana Nováková');
        cy.get('td').should('contain', 'Membership Fee');
        cy.get('td').should('contain', '100.00 Kč');
        cy.get('td').should('contain', today);
        cy.get('td').should('contain', 'Uhrazeno');
        cy.get('td').should('contain', '0.00 Kč');
        });

  })

  //18
  it ('Delete paired payment', () => {
    // Generate current date in YYYY-MM-DD format
    const today = new Date().toLocaleDateString('en-CA');

    // Create an expected payment to pair with
    cy.get('#payments-manual-amount').should('be.visible').type('100')
    cy.get('#payments-manual-note').should('be.visible').type('test payment')
    cy.get('input[type="date"]#payments-manual-date').should('exist').and('be.visible').type(today);
    cy.get('button').contains('Zadat ruční transakci').click()
    cy.contains('h3', 'Nespárované transakce')
      .next('.champ-table-wrap')
      .find('table tbody tr')
      .should('contain', `100.00 Kč`)
      .and('contain', "test payment")
      .and('contain', 'MANUAL_ADMIN');

    cy.contains('a', 'Členové').should('be.visible').click()
    cy.get('tr').filter(':contains("Jana")').filter(':contains("Nováková")').find('input[type="checkbox"]').check();
    cy.get('button').contains('Připravit očekávanou platbu').click()
    cy.get('#prepare-title').should('be.visible').type('Membership Fee')
    cy.get('#prepare-amount').should('be.visible').type('100')
    cy.get('input[type="date"]#prepare-due-date').should('exist').and('be.visible').type(today);

    cy.get('button').contains('Vytvořit očekávané platby').click()
    cy.get('#root p.text-success').should('have.text', 'Úspěšně vytvořeno: 1');

    //Pair the transaction with the expected payment
    cy.contains('a', 'Operace plateb').should('be.visible').click()
     cy.get('#payments-match-tx').contains('100.00 Kč').invoke('val').then((txId) => {
        cy.get('#payments-match-tx').select(txId);
    });
    cy.get('#payments-match-payment').contains('Jana Nováková / Membership Fee').invoke('val').then((payId) => {
        cy.get('#payments-match-payment').select(payId);
    });
    cy.get('#payments-match-amount').clear().type('100');
    cy.contains('button', 'Spárovat platbu').click();

    //Remove the pairing
    cy.contains('h2', 'Spárované platby')
      .closest('section') 
      .find('.champ-table-wrap table tbody tr')
      .should('contain', 'Jana Nováková')
      .and('contain', 'Membership Fee')
      .and('contain', today)
      .and('contain', '100.00 Kč');
    cy.contains('h2', 'Spárované platby')
      .closest('section')
      .find('table tbody tr')
      .contains('Jana Nováková')
      .closest('tr') 
      .within(() => {
        cy.get('td').should('contain', 'Membership Fee');
        cy.get('td').should('contain', today);
        cy.get('td').should('contain', '100.00 Kč');
        cy.get('input[type="checkbox"]').check();
      });
    cy.get('button').contains('Odstranit párování plateb').click()

    // Ensure the payment is moved back to unmatched transactions
    cy.contains('a', 'Platby').should('be.visible').click()
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').should('contain', 'Jana Nováková');
      cy.get('td').should('contain', 'Membership Fee');
      cy.get('td').should('contain', '100.00 Kč');
      cy.get('td').should('contain', today);
      cy.get('td').should('contain', 'Neuhrazeno');
      cy.get('td').should('contain', '100.00 Kč');
      });

  })
})