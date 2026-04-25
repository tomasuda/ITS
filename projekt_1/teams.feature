Feature: Team Management

    As a committee member
    I want to manage teams
    So that I can keep track of teams in the club


    Background:
        Given I am logged in as "committee@example.cz" with password "committee"
        And I navigate to the "Týmy" page
    
    # Matrix col.: 4
    Scenario: Team creation
        When I create a new team with:
        | Název týmu | Poznámka |
        | test team  | test     |

        Then I should see "test team" with note "test"
   
    # Matrix col.: 5
    Scenario: Duplicity Team creation
        Given a team with name "test team" already exists in the system
        When I attempt to create a new team with:
        | Název týmu | Poznámka |
        | test team  | test     | 
        Then the new team should not be added to the list
        And the form should not be cleared
   
    # Matrix col.: 6
    Scenario: Team deletion
        Given a team with name "test team" already exists in system
        When I delete the team "test team"
        And I confirm the deletion 
        Then I should not see "test team" in the list
    
    # Matrix col.: 7
    Scenario: Team modification
        Given a team with name "test team" already exists in system
        When I modify name of  "test team" to "new test team"
        Then I should see "new test team" in the team list
        And I should not see "test team" in the team list
