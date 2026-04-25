Feature: Users Management

    As an administrator
    I want to manage user accounts and roles
    So that I can keep track of users in the club

    Background:
        Given I am logged in as "admin@example.cz" with password "admin"
        And I navigate to the "Uživatelé" page
    
    # Matrix col.: 8
    Scenario: Users Creation
       When I create a new user with:
        |E-mail             |Dočasné heslo|
        |tomassuda@gmail.com|heslo        |
        And I assign roles:
        | MEMBER  |
        | TRAINER |
       Then I should see "tomassuda@gmail.com" with roles "MEMBER, TRAINER" in the users list

    # Matrix col.: 9
    Scenario: User Duplicity Creation
        Given a user "tomassuda@gmail.com" with password "heslo" exists
        When I create a new user with:
        |E-mail             |Dočasné heslo|
        |tomassuda@gmail.com|heslo        |
        And I assign roles:
        | MEMBER  |
        | TRAINER |
        Then the user should not be added to the list
        And the form should remain filled

    # Matrix col.: 10
    Scenario:New user can log in
        Given a user "tomassuda@gmail.com" with password "heslo" exists
        When I log out from the admin account
        And I log in with email "tomassuda@gmail.com" and password "heslo"
        Then I should be successfully logged in
        And I should see the "Trainer" dashboard

    # Matrix col.: 11
    Scenario: Connect Members
        Given the following members exist in the system:
        | Jméno | Příjmení   |
        | Tomáš | Suda       |
        | Tomáš | Novák      |
        | Jana  | Nováková   |
        And the following user exists in the system:
        | E-mail           | Role           |
        | novaks@gmail.com | MEMBER, TRAINER|
        When I link members to user "novaks@gmail.com":
        | Tomáš Novák   |
        | Jana Nováková |
        Then I should see "Tomáš Novák" and "Jana Nováková" linked to "novaks@gmail.com"
        And "Tomáš Novák" should be marked as the default member

    # Matrix col.: 12
    Scenario: Blocked User
       Given the following user exists in the system:
        | E-mail                | Role           |
        | tobevlocked@gmail.com | MEMBER, TRAINER|
        When I block the user "tobevlocked@gmail.com"
        And I log out
        And I log in as "tobevlocked@gmail.com" with password "heslo"
        Then I should see an error message 'Error: {"detail":"Account is blocked"}'  

    # Matrix col.: 13
    Scenario: Delete User
        Given the following user exists:
        | E-mail                | Role            |
        | tobedeleted@gmail.com | MEMBER, TRAINER |
        When I delete the user "tobedeleted@gmail.com"
        And I confirm the deletion in the browser popup
        Then I should not see "tobedeleted@gmail.com" in the users list


    