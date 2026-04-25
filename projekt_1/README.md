# ITS Projekt 1

- **Autor:** Tomáš Šuda (xsudato00)
- **Datum:** 2.4.2026

## Matice pokrytí artefaktů

Čísla testů jednoznačně identifikují scénář v souborech `.feature`.

| Stránka | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |17|18|19|20|21|22|23|
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Můj účet stránka | | | | | | |  | | | | | | | | |  | | |x |x |x | x|x|
| Členové stránka | x | x | x |  |  |  |  |  |  |  |  |  |  |  x|  |  | | | x|x |x | x| x|
| Týmy stránka| | | | x| x | x | x |  | | | | | | | |  | | |x |x | x|x |x | x|
| Uživatelé stránka | | | | | | | |x | x | x | x| x|x | | |  | | |x |x | x| x|x|
| Platby stránka| | | | | | | | | | |  |  |  |x  | x |  | x| x| x| x| x|x |x|
| Operace plateb stránka | | | | | | | | | | | | |  |  |  | x| x|x | x| x| x| x|x|
| E-mailový log stránka|  | | | | | | | | | | | | | | |  | | |x |x |x | x|x|
| Role stránka|  | | | | | | | | | | | | | | |  | | |x |x |x | x|x|

## Matice pokrytí aktivit


| Activity | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |17|18|19|20|21|22|23|
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Vytváření | x | | | x | x | |  |x |x | | | | |x | |  x| | | | | | ||
| Přiřazení do týmu | x |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | | | | | | |
| Vyhledávání| |x | | |  |  |  |  | | | | | | | |  | | | | | | | | |
| Hromadná akce| | | | |  |  |  |  | | | | | | x| |  | | | | | | | | |
| Filtrace | | | x| | | | | |  |  | | | | |x |  | | | | | |||
| Odstraňování| |  | | | |x | | | | |  |  |x  | |  |  | |x | || | ||
| Modifikace| |  | | | | | x| | | |  |  x| x | |  |  | | | || | ||
| Ověření duplicity| |  | | | x| | | |x | |  |  |  | |  |  | | | || | ||
| Propojení| |  | | | | | | | | | x |  |  | |  |  | | | || | ||
| Párování plateb| |  | | | | | | | | |  |  |  | |  |  | x| | || | ||
| Zrušení párování| |  | | | | | | | | |  |  |  | |  |  | |x | || | ||
| Navigace mezi sekcemi| |  | | | | | | | | |  |  |  | x|  |  |x |x | || | ||
| Zablokování| |  | | | | | | | | |  |  x|  | |  |  | | | || | ||
| Odhlásit se| |  | | | | | | | |x |  |  x|  | |  |  | | | || | ||
| Přihlásit se| |  | | | | | | | |x |  |  x|  | |  |  | | |x |x| x| x|x|
| Ověření zůstatku| |  | | | | | | | | |  |  |  | |  |  x| x| x| || | ||
|Kontrola oprávnění| |  | | | | | | | | |  |  |  | |  |  | | |x | x|x|x | x|x|
| Ověření seznamu| x| x | x | x| x|x |x |x | x|x |  x| x | x |x |  x| x | x|x | x|x|x | x|x|


## Matice Feature-Test


| Feature file | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |17|18|19|20|21|22|23|
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  members.feature |x |x | x| | | |  | | | | | | | | |  | | | | | | ||
|teams.feature| | | | x| x| x| x| | | |  |  |  | |  |  | | | || | ||
|  users.feature | | | | | | | | x| x|x |x |x |x  |  |  | | | | | | | ||
|  payments.feature| | | | |  |  |  |  | | | | | |x |x |  | | | | | | | | |
|  payment_operations.feature |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |x  |x |x | | | | | |
|  roles.feature | | | | | | | | |  |  | | | | | |  | | | x| x|x |x|x|



