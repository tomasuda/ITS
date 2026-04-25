Feature: Payment Operation Management

    As an administrator
    I want to manage payment operations
    So that I can keep clubs finances up to date

    Background:
        Given I am logged in as "administrator@example.cz" with password "admin"
        And I navigate to the "Operace plateb" page
   
    # Matrix col.: 16
    Scenario: Creating Manual Payment

        When I create a new manual payment with:
          | Částka | Datum    | Důvod  | Poznámka     |
          | 100    | today    | CASH   | test payment |
        Then I should see the new transaction in "Nespárované transakce":
          | Částka    | Otevřeno    | Datum  | Poznámka     | Zdroj         |
          | 100.00Kč  | 100.00Kč    | today  | test payment | MANUAL_ADMIN  |
    
    # Matrix col.: 17
    Scenario: Pairing Manual Payment

        Given the following unpaired transactions exist:
        | Částka    | Otevřeno    | Datum  | Poznámka     | Zdroj         |
        | 200.00Kč  | 200.00Kč    | today  | test payment | MANUAL_ADMIN  |
        And the following expected payments exist:
        | Člen          | Platba         | Částka   | Vyrovnání         |
        | Jana Nováková | Membership Fee | 100      | Neuhrazeno        |
        When I manually pair a transaction with expected payment:
         | Transakce    | Očekávaná platba              | Přiřazená částka |     
         | 200.00Kč/VS- | Jana Nováková/ Membership Fee | 100              |
        Then I should see the payment in "Spárované platby":
        | Člen          | 	Typ platby         | Datum   | Částka   |
        | Jana Nováková | Membership Fee       | today   | 100.00Kč |
        And I should see the remaining transaction in "Nespárované transakce":
        | Částka    | Otevřeno    | Datum  | Poznámka     | Zdroj         |
        | 200.00Kč  | 100.00Kč    | today  | test payment | MANUAL_ADMIN  |
        And I navigate to the "Platby" page
        Then I should see:
        | Člen          | Platba         | Částka   | Datum |Vyrovnání   |Otevřeno|
        | Jana Nováková | Membership Fee | 100.00Kč | today | Uhrazeno   | 0.00Kč |
    
    # Matrix col.: 18
    Scenario: Delete paired payment
        
        Given the following paired payments exist:
        | Člen          | 	Typ platby         | Datum   | Částka   |
        | Jana Nováková | Membership Fee       | today   | 100.00Kč |
        When I remove the pairing for "Membership Fee" of "Jana Nováková"
        Then I should not see the payment in "Spárované platby":
        | Člen          | 	Typ platby         | Datum   | Částka   |
        | Jana Nováková | Membership Fee       | today   | 100.00Kč |
        And I navigate to the "Platby" page
        Then I should see:
        | Člen          | Platba         | Částka   | Datum |Vyrovnání     |Otevřeno |
        | Jana Nováková | Membership Fee | 100.00Kč | today | Neuhrazeno   |100.00Kč |