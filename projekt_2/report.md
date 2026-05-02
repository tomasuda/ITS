# ITS Projekt 2

- **Autor:** Tomáš Šuda (xsudato00)
- **Dátum:** 2. 5. 2026
- **Kontext:** Automatizované testovanie systému Champ v prostredí Cypress.

---

## Úpravy testov oproti pôvodným scenárom

## Úpravy testov oproti pôvodným scenárom

Oproti povodnym testovacim  scernartom som nevykonal ziadne zmeny v logike, poctu ani prevedeni testov. Vsetky testy su implementovane presne podla zadania a pokryvaju vsetky scenare, ktore boli specifikovane v BDD scenaroch. Zmeny, ktore som vykonal, su cisto technickeho charakteru a sluzia k zabezpeceniu bezproblemoveho behu testov v prostredi Cypress: 

*   **Zabezpečenie unikátnosti dát:** Pri vytváraní platieb a používateľov som implementoval dynamické generovanie dát pomocou časovej pečiatky (`timestamp`). Tým sa predchádza kolíziám v databáze pri opakovanom spustení testov bez nutnosti manuálneho premazávania záznamov.

---

## Mapovacia tabuľka testov

Tabuľka mapuje logické BDD scenáre na ich technickú implementáciu v zdrojovom kóde.

| Scenario file| Line | Cypress file | Line |
| :--- | :--- | :--- | :--- | :--- |
| **members.feature** | 12 | members.cy.js | 20 |
| **members.feature** | 26 | members.cy.js | 50 |
| **members.feature** | 38 | members.cy.js | 57 |
| **teams.feature** | 13 | teams.cy.js | 21 |
| **teams.feature** | 21 | teams.cy.js | 35 |
| **teams.feature** | 30 | teams.cy.js | 57 |
| **teams.feature** | 37 | teams.cy.js | 78 |
| **users.feature** | 12 | users.cy.js | 22 |
| **users.feature** | 22 | users.cy.js | 41 |
| **users.feature** | 34 | users.cy.js | 78 |
| **users.feature** | 42 | users.cy.js | 107 |
| **users.feature** | 58 | users.cy.js | 175 |
| **users.feature** | 68 | users.cy.js | 221 |
| **payments.feature** | 11 | payments.cy.js | 43 |
| **payments.feature** | 30 | payments.cy.js | 75 |
| **payment_operations.feature** | 12 | payment_operations.cy.js | 19 |
| **payment_operations.feature** | 22 | payment_operations.cy.js | 39 |
| **payment_operations.feature** | 45 | payment_operations.cy.js | 109 |
| **roles.feature** | 18 | roles.cy.js | 87 |
| **roles.feature** | 30 | roles.cy.js | 104 |
| **roles.feature** | 42 | roles.cy.js | 122 |
| **roles.feature** | 54 | roles.cy.js | 140 |
| **roles.feature** | 66 | roles.cy.js | 158 |



---