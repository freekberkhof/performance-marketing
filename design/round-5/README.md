# Performance Plus · ontwerpronde 5

Optie **01 / In beweging** en **03 / Terug naar het veld**, verfijnd op de feedback van 23 oktober 2026. Beide websites beginnen met Kaylees dynamische apppresentatie. De rest vertelt het productverhaal met minder bediening en meer ruimte.

| Bestand | Inhoud |
| --- | --- |
| index.html | Beide richtingen vergelijken |
| light.html | Licht grijsgroen, inkt, groen accent en trainingsfotografie |
| dark.html | Grafiet, leisteen, gedempt blauw en sportfotografie |
| styles.css | Gedeelde componenten, twee stijlen en responsieve varianten |
| app.js | App-scroll, mobiel menu en contactvenster |
| assets/ | Origineel logo, vier originele appschermen en drie sfeerbeelden |

Statische HTML/CSS/JS, geen build of externe afhankelijkheden. Alle paden zijn relatief. Deploy deze zes bestanden en assets/.

## Aangepast op de feedback

- Beide pagina's openen direct met de vier appschermen. Daarna volgen fotografie, de werkwijze, één cliëntdossier en een conceptverslag.
- Alleen **Frans Broekhof**, een fictief voorbeeld uit de eerdere bron. Cliëntzoeker, statusfilters, viercliëntentabel en dossier-tabs zijn verwijderd.
- Drie rustige kerncijfers: uitgevoerde sessies, ervaren inspanning en motivatie. Op mobiel staan deze in leesbare rijen.
- Eén vaste grafiek met het gemeten pijnverloop, een voorbeeldscenario en bandbreedte. De twaalfwekentabel, serieknoppen, periodekeuze en cliëntkeuze zijn verwijderd.
- De statuskaart met labels is vervangen door gewone tekst over één ontbrekende check-in. Deze is niet als nulwaarde meegerekend.
- Het verslag is één leesbaar document uit dezelfde gegevens. Geen bronselectie, editor, genereerknop of goedkeuringssimulatie meer.
- Licht behoudt open vlakken en trainingsfotografie. Donker behoudt grote nummering, krachtige koppen en een paginabrede sportfoto. Geen AI-branding of decoratieve glows.

## Kaylees appflow behouden

De port van components/app-showcase.tsx uit ronde 4 is behouden: vier segmenten, FADE 0.06, easing cubicBezier(0.32, 0.72, 0, 1), sheets van 103% naar 0, vorige scherm naar schaal 0.93 en dimming 0.42. Tekst, bijschrift, stapknoppen en voortgang volgen de scrollpositie.

Vastgezette weergave vanaf 1100 × 700 px zonder reduced motion; anders handmatige tabs, pijlen en vegen zonder verplicht lang scrollspoor. De sticky stage houdt nu rekening met de navigatiebalk. De eerste staptitel is de H1, de overige stappen zijn H2. Schermteksten, vier JPEG's en logo zijn behouden. De zichtbare testnaam in de originele appafbeelding is niet weggewerkt.

## Exacte voorbeeldgegevens

Fictieve meetperiode: **24 augustus t/m 18 oktober 2026**, twee sessies per week.

- 16/16 sessies uitgevoerd; 15 sessie-check-ins; 41/56 dagelijkse check-ins.
- Laatste vier RPE-scores 7 / 7,5 / 7,5 / 7,5 → gemiddeld **7,4** afgerond.
- Laatste vier motivatiescores 7,5 / 8 / 8 / 8 → gemiddeld **7,9** afgerond.
- Pijn na de sessie per week: **6 / 5,25 / 4,75 / 4,5 / 4 / 3,75 / 3,25 / 3**.
- Week 4 bevat één ontbrekende sessie-check-in. Het weekgemiddelde gebruikt alleen de ingevulde waarde 4,5.
- De cliëntnotitie bij sessie 14 dateert van **9 oktober 2026**.

### Voorbeeldscenario

De statische SVG is exact uit bovenstaande gegevens opgebouwd. Mobiel krijgt een aparte compositie met dezelfde data en leesbare assen. Beide SVG's bevatten een toegankelijke beschrijving van alle waarden.

De regressiehelling van week 5–8 is **−0,35 per week**. Het scenario begint bij de laatste gemeten waarde (week 8: 3,0). Week 9–12: **2,65 / 2,3 / 1,95 / 1,6**. Illustratieve halve bandbreedtes: **0,4 / 0,7 / 1,0 / 1,3**. Week 12 toont dus **0,3–2,9**.

Dit is geen statistisch betrouwbaarheidsinterval of gevalideerde medische voorspelling. Dit staat onder het dossier. Geen hersteldatum of behandeladvies.

### Verslag en contact

Het verslag toont een mogelijke werkwijze, geen werkende dossierintegratie. De gegevens komen uit dezelfde casus; de prognose wordt niet als feit in het verslag opgenomen. Beoordeling en vervolg zijn voor de behandelaar.

Contact valideert naam, e-mail en praktijk en toont een e-mailconcept aan info@passionforhealth.nl. De bezoeker opent zelf een mailprogramma. De website verstuurt of bewaart niets. Escape, achtergrondklik, focusherstel en toetsenbordbediening zijn behouden.

## Beelden en Mobbin-inspiratie

- logo-mark.png: origineel wit Performance Plus-logo op donkere achtergrond.
- app-01.jpg t/m app-04.jpg: ongewijzigde appafbeeldingen, identiek aan ronde 4 en de bron public/app/.
- strength.jpg, basketball.jpg, daylight.jpg: eerder gemaakte sfeerbeelden uit ronde 3. Geen echte cliënten, ook vermeld in de footer. Deze ronde had geen extra beelden nodig.

De eerdere Mobbin-referenties blijven de basis. Op de nieuwe feedback is vooral de hoeveelheid UI teruggebracht:

- [Bevel · productpresentatie](https://mobbin.com/sites/sections/256292c7-6a06-4cba-a654-637e54ebdd06): centraal productbeeld, ruimte en fotografie.
- [Bevel · metrieken](https://mobbin.com/sites/sections/d64a4c9c-42e0-4cb3-aa18-cafe96e31fe3): beknopte gegevens, duidelijke hiërarchie.
- [Intercom · rapportdetails](https://mobbin.com/flows/694f7015-1c29-4b5a-887d-75bb8032fae3) en [Midday · klanten](https://mobbin.com/flows/362a6d23-6cee-45c1-b62b-7bc80466fdb3): eerdere inspiratie. De uitgebreide zoek-, filter- en selectielaag is nu verwijderd.

Geen Mobbin-screenshots of merken gebruikt.

## Bouw en controle

Claude Code bouwde ronde 4; Codex beoordeelde die afzonderlijk. Bij de start van ronde 5 is Claude opnieuw gecontroleerd: de accountlimiet liep nog tot 19:10 op 23 oktober. Deze verfijning is daarom door **Codex zelf uitgevoerd en zelf gecontroleerd**, zoals aan de gebruiker gemeld. Dit is geen onafhankelijke tweede review. Geen extra credits aangeschaft en geen subagents ingezet.

Gecontroleerd in Chromium: beide stijlen op desktop; beide op 375 px inhoudsbreedte; de prognoses; appstappen in scroll- en handmatige modus; mobiel menu; contactvalidatie, e-mailconcept en Escape. Geen e-mail verzonden. JavaScript-syntax, lokale links, ankers, afbeeldingen en unieke IDs gecontroleerd. Dossier, SVG's en verslag gebruiken consistente gegevens. Geen fysieke iOS-/Android-test uitgevoerd.

Alleen de ontwerpbranch en de bestaande private Sites-preview worden bijgewerkt. Productiecode op main blijft ongewijzigd.
