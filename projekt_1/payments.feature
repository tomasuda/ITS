Feature: Payment Management

    As an administrator, committee member
    I want to see payments
    So that I can keep track of payments in the club
    Background:
        Given I am logged in as "committee@example.cz" with password "committee"
        And I navigate to the "Platby" page

    # Matrix col.: 14
    Scenario: Create expected payments for multiple members
        Given the following members exist:
            | Jméno | Příjmení  | Stav člena     | Týmy    |
            | Tomáš | Suda      | Active         | A muži  |
            | Tomáš | Novák     | Inactive       | A muži  |
            | Jana  | Nováková  | Active         | B muži  |
        And I am on the "Členové" page
        When I select the checkbox for "Tomáš Suda"
        And I select the checkbox for "Tomáš Novák"
        And I start creating an expected payment
        And I fill in the payment details:
        | Název platby   | Částka | Datum  |
        | Membership Fee | 100    | today  |
        And I confirm the creation of expected payments
        Then I should see a success message "Úspěšně vytvořeno: 2"
        And I navigate to the "Platby" page
        And I should see "Membership Fee" in the payments list

    # Matrix col.: 15
    Scenario: Find payment with Filters
        Given the following payments exist:
            | Člen          | Platba         | Častka   | Vyrovnání         |
            | Jana Nováková | Membership Fee | 100      | Neuhrazeno        |
            | Tomáš Novák   | Training Fee   | 200      | Částečně uhrazeno |
            | Tomáš Suda    | Training Fee   | 200      | Uhrazeno          |
        When I apply the filter "Název platby" with value "Training Fee"
        And I apply the filter "Vyrovnání" with value "Uhrazeno"
        Then I shoud see only one payment in the list with:
            | Člen        | Platba       | Častka | Vyrovnání |
            | Tomáš Suda  | Training Fee | 200    | Uhrazeno  |