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
    
    cy.contains('a', 'Uživatelé').should('be.visible').click()
   
  })

  //8
  it('User Creation', () => {
    //unique user email to avoid conflicts with existing users
    const UserEmail = 'newuser@example.cz' + timestamp
    const UserPassword = 'password123'

    // Create a new user with MEMBER and TRAINER roles
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    
    // Verify the new user appears in the list with correct roles
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');
  })


  //9
  it('User Duplicity Creation', () => {
    //unique user email to avoid conflicts with existing users
    const UserEmail = 'duplicit@example.cz' + timestamp
    const UserPassword = 'password123'

    // Handle potential conflict errors from the server
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('already exists') || err.message.includes('409')) {
        return false; 
      }
    });

    // Create initial user
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');

    // Attempt to create a duplicate user
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');

    // Ensure the record is not created twice
    cy.url().should('include', '/users')
    cy.get('table').filter(`:contains("${UserEmail}")`).should('have.length', 1);

  })

  //10
   it('New user can log in', () => {
    //unique user email to avoid conflicts with existing users
    const UserEmail = 'testlogin@example.cz' + timestamp
    const UserPassword = 'password123'

   // Create a new user with MEMBER and TRAINER roles
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');
   
    // Log out admin to test new user login
    cy.contains('button', 'Odhlásit se').click()
    
    //login with the newly created user 
    cy.get('#login-email').should('be.visible').type(UserEmail)
    cy.get('#login-password').should('be.visible').type(UserPassword)
    cy.contains('button', 'Přihlásit se').click()
    cy.url().should('not.include', '/login')

   // Verify successful login and role display
    cy.get('#root div.small').should('have.text', 'Role: trenér');
  })
 

   //11  
   it('Connect Members', () => {

    const today = new Date().toLocaleDateString('en-CA');
    const name = 'Tomas'
    const surname = 'Suda'
    //unique email to avoid conflicts with existing members
    const email = `tomassuda@gmail.com` + timestamp

   // Create a new member and assign them to a team
    cy.contains('a', 'Členové').should('be.visible').click()
    cy.contains('Přidat nového člena').click()
    
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
    
    cy.get('section.champ-panel table input[type="date"]').first().type(today)
    cy.contains('button', '+').click()
    
    cy.get('#root td:nth-child(5) div.d-flex button.btn-outline-primary').click();
    cy.get('#root a.active').click();

    cy.get('table').should('contain', name).and('contain', surname);

    cy.contains('a', 'Uživatelé').should('be.visible').click()

    // Create a new user and assign them to the created member
    const UserEmail = 'newlink@example.cz' + timestamp
    const UserPassword = 'password123'

    // 2. Create user and link them to members
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

   // Verify the user is linked to the correct member and roles
    cy.contains('tr', UserEmail).within(() => {
       cy.get('td').should('contain', 'Tomas Suda (3)').and('contain', 'Jana Nováková (1)');
       cy.get('.fw-semibold').should('have.length.at.least', 2);
    });


    cy.contains('tr', UserEmail).find('td').eq(4).should('have.text', '2');
    })

    //12
    it("Block User", () => {
    //unique user email to avoid conflicts with existing users
    const UserEmail = 'usertobeblocked@example.cz' + timestamp
    const UserPassword = 'password123'
  
    // Handle potential conflict errors from the server
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Account is blocked') || err.message.includes('409')) {
        return false; 
      }
    });

    // Create a new user with MEMBER and TRAINER roles
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

    // Change user status to BLOCKED
    cy.get(`input[value="${UserEmail}"]`) .closest('tr').within(() => {                   
          cy.get('select[aria-label^="status-"]')
            .should('be.visible')
            .select('LOCKED');
          cy.contains('button', 'Potvrdit změny').click();
        });

    // Verify the user status is updated to BLOCKED
    cy.contains('tr', UserEmail).should('contain', 'Blokovaný');
    cy.contains('button', 'Odhlásit se').click()
    
   // Attempt to log in with the blocked user
    cy.get('#login-email').should('be.visible').type(UserEmail)
    cy.get('#login-password').should('be.visible').type(UserPassword)
    cy.contains('button', 'Přihlásit se').click()

    })


 //13
  it('Delete User', () => {
    //unique user email to avoid conflicts with existing users
    const UserEmail = 'usertobedeleted@example.cz' + timestamp
    const UserPassword = 'password123'

    // Handle potential conflict errors from the server
   cy.on('window:confirm', (text) => {
      expect(text).to.contains('Smazat uživatele'); 
      expect(text).to.contains(UserEmail);
      return true; 
    });

    // Create a new user with MEMBER and TRAINER roles
    cy.get('#new-user-email').type(UserEmail)
    cy.get('#new-user-password').type(UserPassword)
    cy.contains('label', 'TRAINER').find('input[type="checkbox"]').check();
    cy.contains('label', 'MEMBER').find('input[type="checkbox"]').check();
    cy.contains('button', 'Vytvořit uživatele').click()
    cy.contains(UserEmail).should('be.visible')
    cy.contains('tr', UserEmail).should('contain', 'MEMBER').and('contain', 'TRAINER');
    
    // Delete the user
    cy.contains('tr', UserEmail).within(() => {
      cy.contains('button', 'Smazat').click();
    });
    cy.contains(UserEmail).should('not.exist');
  })
})