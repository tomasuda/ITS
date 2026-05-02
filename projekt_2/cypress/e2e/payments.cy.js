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

    // Create a new member to be used in payment tests
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
    
    // Assign member to a team and confirm
    cy.get('select.form-select').contains('Vyberte tým').parent('select').select('A muži');
    cy.get('section.champ-panel table input[type="date"]').first().type(today)
    cy.contains('button', '+').click()
    cy.get('#root td:nth-child(5) div.d-flex button.btn-outline-primary').click();
    cy.get('#root a.active').click();
    cy.get('table').should('contain', name).and('contain', surname);
    cy.contains('a', 'Platby').should('be.visible').click()
  })

  //14
  it(' Create expected payments for multiple members', () => {
    // Generate current date in YYYY-MM-DD format
     const today = new Date().toLocaleDateString('en-CA');

    cy.contains('a', 'Členové').should('be.visible').click()   
    // Select multiple members using checkboxes
    cy.get('tr').filter(':contains("Tomáš")').filter(':contains("Novák")')
      .find('input[type="checkbox"]').check();
    cy.get('tr').filter(':contains("Tomas")').filter(':contains("Suda")')
      .first().find('input[type="checkbox"]').check();

    // Configure batch payment details
    cy.get('button').contains('Připravit očekávanou platbu').click()
    cy.get('#prepare-title').should('be.visible').type('Membership Fee')
    cy.get('#prepare-amount').should('be.visible').type('100')
    cy.get('input[type="date"]#prepare-due-date').should('exist').and('be.visible').type(today);

    cy.get('button').contains('Vytvořit očekávané platby').click()
    cy.get('#root p.text-success').should('have.text', 'Úspěšně vytvořeno: 2');
    cy.contains('a', 'Platby').should('be.visible').click()

    //Ensure the expected payments are listed with correct details
    cy.contains('tr', 'Tomas Suda').within(() => {
       cy.get('td').should('contain', 'Membership Fee').and('contain', '100.00 Kč');
    });
    cy.contains('tr', 'Tomáš Novák').within(() => {
       cy.get('td').should('contain', 'Membership Fee').and('contain', '100.00 Kč');
    });

  })

  //15
  it('Find payment with Filters', () => {
    const today = new Date().toLocaleDateString('en-CA');
    // Create a unique payment title to ensure test isolation
    const uniquePayment = 'Training Fee' + timestamp

    //Create multiple expected payments
    cy.contains('a', 'Členové').should('be.visible').click()
    cy.get('tr').filter(':contains("Jana")').filter(':contains("Nováková")').find('input[type="checkbox"]').check();
    cy.get('button').contains('Připravit očekávanou platbu').click()
    cy.get('#prepare-title').should('be.visible').type('Membership Fee')
    cy.get('#prepare-amount').should('be.visible').type('100')
    cy.get('input[type="date"]#prepare-due-date').should('exist').and('be.visible').type(today);
    cy.get('button').contains('Vytvořit očekávané platby').click()
    cy.get('#root p.text-success').should('have.text', 'Úspěšně vytvořeno: 1');


    cy.contains('a', 'Členové').should('be.visible').click()   
    cy.get('tr').filter(':contains("Tomáš")').filter(':contains("Novák")').find('input[type="checkbox"]').check();
    cy.get('tr').filter(':contains("Tomas")').filter(':contains("Suda")').first().find('input[type="checkbox"]').check();
    cy.get('button').contains('Připravit očekávanou platbu').click()
    cy.get('#prepare-title').should('be.visible').type(uniquePayment)
    cy.get('#prepare-amount').should('be.visible').type('200')
    cy.get('input[type="date"]#prepare-due-date').should('exist').and('be.visible').type(today);
    cy.get('button').contains('Vytvořit očekávané platby').click()
    cy.get('#root p.text-success').should('have.text', 'Úspěšně vytvořeno: 2');

   //Create manual bank transactions
    cy.contains('a', 'Operace plateb').should('be.visible').click()
    cy.get('#payments-manual-amount').should('be.visible').type('200')
    cy.get('#payments-manual-note').should('be.visible').type('test note 1')
    cy.get('input[type="date"]#payments-manual-date').should('exist').and('be.visible').type(today);
    cy.get('button').contains('Zadat ruční transakci').click()
    cy.contains('h3', 'Nespárované transakce')
      .next('.champ-table-wrap')
      .find('table tbody tr')
      .should('contain', `200.00 Kč`)
      .and('contain', "test note 1")
      .and('contain', 'MANUAL_ADMIN'); 

    cy.get('#payments-manual-amount').should('be.visible').type('100')
    cy.get('#payments-manual-note').should('be.visible').type('test note 2')
    cy.get('input[type="date"]#payments-manual-date').should('exist').and('be.visible').type(today);
    cy.get('button').contains('Zadat ruční transakci').click()

    cy.contains('h3', 'Nespárované transakce')
      .next('.champ-table-wrap')
      .find('table tbody tr')
      .should('contain', `100.00 Kč`)
      .and('contain', "test note 2")
      .and('contain', 'MANUAL_ADMIN'); 

    // Match transactions to expected payments
    cy.get('#payments-match-tx').contains('200.00 Kč').invoke('val').then((txId) => {
        cy.get('#payments-match-tx').select(txId);
    });
    cy.get('#payments-match-payment').contains('Tomas Suda / ' + uniquePayment).invoke('val').then((payId) => {
        cy.get('#payments-match-payment').select(payId);
    });
    cy.get('#payments-match-amount').clear().type('200');
    cy.contains('button', 'Spárovat platbu').click();

    cy.get('#payments-match-tx').contains('100.00 Kč').invoke('val').then((txId) => {
        cy.get('#payments-match-tx').select(txId);
    });
    cy.get('#payments-match-payment').contains('Tomáš Novák / ' + uniquePayment).invoke('val').then((payId) => {
        cy.get('#payments-match-payment').select(payId);
    });
    cy.get('#payments-match-amount').clear().type('100');
    cy.contains('button', 'Spárovat platbu').click();
    cy.contains('a', 'Platby').click();
    cy.get('#payments-filter-title').type(uniquePayment);
    cy.get('select#payments-filter-settlement').select('Uhrazeno'); 

  // Ensure only the matched payments are displayed with correct details
    cy.get('table tbody tr').should('have.length', 1);
    cy.get('table tbody tr').first().within(() => {
        cy.get('td').should('contain', 'Tomas Suda');
        cy.get('td').should('contain', uniquePayment);
        cy.get('td').should('contain', '200.00 Kč');
        cy.get('td').should('contain', 'Uhrazeno');
        });
    

  })
})



