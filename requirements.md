1. Projekta mērķis
Izstrādāt pilnvērtīgu To-Do Planner tipa sistēmu ar lietotāju autentifikāciju, uzdevumu pārvaldību un iespēju vairākiem lietotājiem strādāt pie viena projekta.

2. Obligātās prasības

2.1. Lietotāju reģistrācija un pieslēgšanās
    Lietotājs var izveidot jaunu kontu. | IR

    Reģistrācijas laikā jānorāda vismaz vārds, e-pasts un parole. | IR

    E-pastam jābūt unikālam. | IR

    Parole nedrīkst tikt glabāta datubāzē atklātā veidā. | IR 

    Lietotājs var pieslēgties un izrakstīties. | IR

    Neautorizēts lietotājs nedrīkst piekļūt aizsargātām sistēmas daļām. | datubāze ir atklāta un viegli pieejama ierakstot URL /backend/my.db taka

2.2. Personīgie uzdevumi
    Izveidot uzdevumu. | IR

    Rediģēt uzdevumu. | IR

    Dzēst uzdevumu. | IR

    Atzīmēt uzdevumu kā pabeigtu / nepabeigtu. | IR

    Norādīt uzdevuma nosaukumu un aprakstu. | IR

    Norādīt termiņu. | IR

    Norādīt prioritāti: Low, Medium vai High. | IR

    Apskatīt savus aktīvos un pabeigtos uzdevumus. | IR

2.3. Dashboard
    Pēc pieslēgšanās lietotājam jābūt pieejamam pārskatāmam dashboard. | ir

    Jābūt redzamiem aktuālajiem uzdevumiem. | ir

    Jābūt iespējai atdalīt pabeigtos un nepabeigtos uzdevumus. | ir

    Jābūt iespējai filtrēt vai kārtot uzdevumus pēc vismaz viena kritērija (piemēram, prioritātes vai termiņa). | ir

2.4. Kopīgie projekti un sadarbība
    Lietotājs var izveidot projektu. | IR

    Projekta īpašnieks var uzaicināt citus reģistrētus lietotājus. | IR

    Uzaicinātais lietotājs var pieņemt vai noraidīt uzaicinājumu. | IR

    Projektam var būt vairāki dalībnieki. | IR

    Projektā var izveidot kopīgus uzdevumus. | IR

    Kopīgam uzdevumam var piešķirt konkrētu projekta dalībnieku. | na

    Projekta dalībnieki var redzēt projektā esošos uzdevumus atbilstoši savām tiesībām. | na

3. Drošība
    Paroles nedrīkst glabāt atklātā veidā. | ir

    Jāvalidē lietotāja ievaddati. 

    Lietotājs nedrīkst piekļūt cita lietotāja privātajiem datiem vai uzdevumiem bez atbilstošām tiesībām. | ir iespejams viegli lejupieladet db caur url

5. Lietotāja interfeiss
    Interfeisam jābūt pārskatāmam un saprotamam.

    Lietotājam jāspēj intuitīvi atrast galvenās funkcijas.

    Formām jābūt ar saprotamu validāciju un kļūdu paziņojumiem.

    Lietotnei jābūt izmantojamai gan datorā, gan mobilā ierīcē (responsive dizains).


4. Minimālais lietotāja scenārijs

1. Lietotājs reģistrē kontu.

2. Lietotājs pieslēdzas sistēmai.

3. Lietotājs izveido personīgo uzdevumu.

4. Lietotājs rediģē un pēc tam pabeidz uzdevumu.

5. Lietotājs izveido kopīgu projektu.

6. Lietotājs uzaicina citu lietotāju.

7. Otrs lietotājs pieņem uzaicinājumu.

8. Projekta dalībnieki izveido un sadala uzdevumus.

9. Dalībnieki var redzēt uzdevumu statusus un veikt atļautās izmaiņas.


