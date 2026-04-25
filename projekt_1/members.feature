Feature: Member Management

  As a committee member,administrator
  I want to manage club members
  So that I can keep track of members in the club

  Background:
     Given I am logged in as "committee@example.cz" with password "committee"
     And I navigate to the "Členové" page
     
     # Matrix col.: 1
    Scenario: Create a new member and assign them to a team
        When I start creating a new member
        And I fill in the member details:
        | Jméno | Příjmení   | Primární e-mail  | Datum narození  |
        | Tomas | Suda  | tomassuda@gmail.com   | 2005-01-01      |
        And I submit the new member form
        And I assign the member to a team:
        | Team Name | From  |
        | Muz A     | today |
        And I confirm the team assignment
        And I navigate back to the "Členové" page
        Then I should see "Tomas Suda" in the members list
    
     # Matrix col.: 2
    Scenario: Search for existing member by name
        Given the following members exist in the system:
        | Jméno      | Příjmení     |
        | Tomáš      | Suda         |
        | Tomáš      | Novák        |
        | Jana       | Nováková     |
        When I enter "Tomáš" into "Jméno" search box
        Then I should see "Tomáš Suda" in the results
        And I should see "Tomáš Novák" in the results
        And I should not see "Jana Nováková"
    
     # Matrix col.: 3
    Scenario: Filter members by status and team
        Given the following members exist:
        | Jméno | Příjmení  | Stav člena     | Týmy    |
        | Tomáš | Suda      | Aktivní         | A muži  |
        | Tomáš | Novák     | Neaktivní       | A muži  |
        | Jana  | Nováková  | Aktivní         | B muži  |
        When I select "Activní" from the "Stav" filter
        And I select "A muži" from the "Týmy" filter
        Then I should see "Tomáš Suda" in the results
        And I should not see "Petr Novák"
        And I should not see "Jana Nováková"

