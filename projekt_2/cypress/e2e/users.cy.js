describe('template spec', () => {
 beforeEach(() => {
    cy.visit('http://localhost:8000')
    
    cy.url().should('include', '/login')
  

    cy.get('#login-email').should('be.visible').type('admin@example.cz')
    cy.get('#login-password').should('be.visible').type('admin')
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')
    
    cy.contains('a', 'Uživatelé').should('be.visible').click()
    cy.contains('a', 'Uživatelé').click()
  })

  it('User Creation', () => {
    const UserEmail = 'newuser@example.cz'
    const UserPassword = 'password123'
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');
  })

  it('User Duplicity Creation', () => {
    const UserEmail = 'duplicit@example.cz'
    const UserPassword = 'password123'

    cy.on('uncaught:exception', (err) => {
    if (err.message.includes('already exists') || err.message.includes('409')) {
      return false; 
    }
  });
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');


    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');

    cy.url().should('include', '/users')
    cy.get('table').filter(`:contains("${UserEmail}")`).should('have.length', 1);

  })

   it('New user can log in', () => {
    const UserEmail = 'testlogin@example.cz'
    const UserPassword = 'password123'
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');

     cy.contains('button', 'Odhlásit se').click()


    cy.get('#login-email').should('be.visible').type(UserEmail)
    cy.get('#login-password').should('be.visible').type(UserPassword)
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')

    cy.get('#root div.small').should('have.text', 'Role: trenér');
  })

   it('Connect Members', () => {
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

    cy.contains('a', 'Uživatelé').should('be.visible').click()


    const UserEmail = 'newlink@example.cz'
    const UserPassword = 'password123'
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');

   cy.contains('tr', UserEmail).within(() => {
      cy.get('select[aria-label^="link-member"]').select('3'); 
      cy.get('select[aria-label^="link-role"]').select('MEMBER_SELF');
      cy.get('button[aria-label^="link-submit"]').click();
      
      cy.get('select[aria-label^="link-member"]').select('1');
      cy.get('button[aria-label^="link-submit"]').click();
  });

    cy.contains('tr', UserEmail).within(() => {
       cy.get('td').should('contain', 'Tomas Suda (3)').and('contain', 'Jana Nováková (1)');
       cy.get('.fw-semibold').should('have.length.at.least', 2);
    });


    cy.contains('tr', UserEmail).find('td').eq(4).should('have.text', '2');
    })


    it("Block User", () => {
    const UserEmail = 'usertobeblocked@example.cz'
    const UserPassword = 'password123'

    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Account is blocked') || err.message.includes('409')) {
        return false; 
      }
    });

    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');

     cy.contains('tr', UserEmail).within(() => {
        cy.contains('button', 'Upravit').click();
      });

  
    cy.get(`input[value="${UserEmail}"]`) // Nájde input s tvojím mailom
        .closest('tr')                     // Vráti sa na úroveň riadka
        .within(() => {                    // Vstúpi do vnútra riadka
          
          cy.get('select[aria-label^="status-"]')
            .should('be.visible')
            .select('LOCKED');

          
          cy.contains('button', 'Potvrdit změny').click();
        });

    cy.contains('tr', UserEmail).should('contain', 'Blokovaný');
    cy.contains('button', 'Odhlásit se').click()
    

    cy.get('#login-email').should('be.visible').type(UserEmail)
    cy.get('#login-password').should('be.visible').type(UserPassword)
    cy.contains('button', 'Přihlásit se').click()

    })

  it('Delete User', () => {
    const UserEmail = 'usertobedeleted@example.cz'
    const UserPassword = 'password123'

   cy.on('window:confirm', (text) => {
    expect(text).to.contains('Smazat uživatele'); 
    expect(text).to.contains(UserEmail);
    return true; 
  });

    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');

     cy.contains('tr', UserEmail).within(() => {
        cy.contains('button', 'Smazat').click();
      });
    cy.contains(UserEmail).should('not.exist');
  })
})