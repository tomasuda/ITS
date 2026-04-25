Feature: Role Management

    As a system administrator
    I want to control access based on user roles
    So that users can only access allowed features

    Background:
        Given the following users exist:
        | Role            | e-mail                 |  Password   |                                                                
        | ADMIN           | admin@example.cz       |   admin     |                                                          
        | COMMITTEE       | committee@example.cz   |   committee |                                                             
        | TRAINER         | trainer@example.cz     |   trainer   |                                                             
        | MEMBER          | member@example.cz      |   member    |  
        | PLAYER          | player@example.cz      |   player    |  
        And I am in Login page

    # Matrix col.: 19
    Scenario: Member permission
        When I log in with "member@example.cz"  E-mail and "member" Password
        Then I should see "Můj účet" page
        And I should not see "Členové" page
        And I should not see "Týmy" page
        And I should not see "Uživatelé" page
        And I should not see "Platby" page
        And I should not see "Operace plateb" page
        And I should not see "E-mailový log" page
        And I should not see "Role" page
    
    # Matrix col.: 20
    Scenario: Player permission
        When I log in with "player@example.cz"  E-mail and "player" Password
        Then I should see "Můj účet" page
        And I should not see "Členové" page
        And I should not see "Týmy" page
        And I should not see "Uživatelé" page
        And I should not see "Platby" page
        And I should not see "Operace plateb" page
        And I should not see "E-mailový log" page
        And I should not see "Role" page

    # Matrix col.: 21
    Scenario: Committee permission
        When I log in with "committee@example.cz"  E-mail and "committee" Password
        Then I should see "Členové" page
        And I should see "Týmy" page
        And I should see "Platby" page
        And I should not see "Můj účet" page
        And I should not see "Uživatelé" page
        And I should not see "Operace plateb" page
        And I should not see "E-mailový log" page
        And I should not see "Role" page
   
    # Matrix col.: 22
    Scenario: Trainer permission
        When I log in with "trainer@example.cz"  E-mail and "trainer" Password
        Then I should see "Členové" page
        And I should see "Týmy" page
        And I should see "Platby" page
        And I should not see "Můj účet" page
        And I should not see "Uživatelé" page
        And I should not see "Operace plateb" page
        And I should not see "E-mailový log" page
        And I should not see "Role" page
    
    # Matrix col.: 23
    Scenario: Admin permission
        When I log in with "admin@example.cz"  E-mail and "admin" Password
       Then I should see "Můj účet" page
        And I should  see "Členové" page
        And I should  see "Týmy" page
        And I should  see "Uživatelé" page
        And I should  see "Platby" page
        And I should  see "Operace plateb" page
        And I should  see "E-mailový log" page
        And I should  see "Role" page