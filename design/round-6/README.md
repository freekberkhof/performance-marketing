# Performance Plus · ontwerpronde 6

Optie **01 / In beweging** en **03 / Terug naar het veld**, verfijnd op de feedback van 23 oktober 2026. Beide opties blijven bestaan. Elke pagina opent nu met een fotografische introductie. Daarna volgt Kaylees dynamische apppresentatie, nu met vijf stappen.

| Bestand | Inhoud |
| --- | --- |
| index.html | Beide richtingen vergelijken |
| light.html | Licht grijsgroen, inkt, fris groen, strength.jpg als redactionele opening |
| dark.html | Grafiet, leisteen, gedempt blauw, basketball.jpg paginabreed |
| styles.css | Gedeelde componenten, twee stijlen en responsieve varianten |
| app.js | App-scroll (5 stappen), voorbeeld 'En meer', mobiel menu en contactvenster |
| assets/ | Origineel logo, vier originele appschermen en drie sfeerbeelden (ongewijzigd) |

Statische HTML/CSS/JS, geen build en geen externe afhankelijkheden. Alle paden zijn relatief. Deploy deze zes bestanden en assets/ (14 bestanden). BUILD.md en build-result.json zijn procesbestanden en worden niet gedeployed.

## Gewijzigde scope

- **Eerst de foto, dan de app.** Onder het menu staat nu een fotografische hero met de enige H1, de positionering voor fysiotherapiepraktijken (revalidatie én prestatie) en twee acties: *Ontdek de app* (naar #app) en *Plan een demo* (bestaand contactvenster). Licht: strength.jpg in een redactionele compositie. Donker: basketball.jpg paginabreed met grote kapitalen. Het merklogo en 'naar boven' wijzen naar #top. De eerste appkop is weer een H2. De oude introductie- en processectie tussen foto en dossier is vervallen, dus er staat niets tussen hero en app.
- **Afbeeldingen laden.** De heroafbeelding wordt geladen met preload, `fetchpriority="high"` en eager loading. Alle vier appschermen laden lazy, omdat ze nu onder de vouw staan.
- **App-stap 05 · En meer…** De bestaande story gaat van 4 naar 5 stappen: teksten, lagen, asides, stapknoppen, voortgang en teller. `N` volgt nu het aantal lagen. Het spoor is 520svh, 104svh per stap (was 105svh). De eerste vier stappen, JPEG's, FADE 0.06 en easing `cubicBezier(0.32, 0.72, 0, 1)` zijn ongewijzigd. Laag 5 is een nagebouwd voorbeeld in hetzelfde telefoonframe en het donkere app-palet, gemarkeerd met 'Demo'. Het voorbeeld toont rustig na elkaar:
  1. *Ademhaling*: Box 4-4-4-4 met 4-7-8 als keuze, een ademcirkel met fase en tel, en start/pauze/reset als weergave.
  2. *Eigen training*: kracht/hardlopen/cardio, een hardlooplog (32:00 · 5,4 km · 5:56 /km) en een eerdere krachttraining met 'Herhaal'. De tekst zegt dat dit los staat van het programma.
  3. *Rusttimer*: 1:30 met aftellende ring. In de app is de tijd instelbaar.
  4. *Je fysio*: gekoppelde fysiotherapeut ('Lotte Verbeek', voorbeeldnaam) met een WhatsApp-regel zonder link of nummer.
- **Beweging in 'En meer'.** Eén interval van 1 s, alleen als stap 5 actief is, de laag in beeld is (IntersectionObserver), het tabblad zichtbaar is en de bezoeker niet heeft gepauzeerd. Bij reduced motion speelt niets automatisch af. Onder de tekst staan vier keuzeknoppen (aria-pressed) en 'Pauzeer voorbeeld' / 'Speel voorbeeld af'. Handmatig kiezen pauzeert het voorbeeld. Observer en listeners worden één keer aangemaakt, en er draait nooit meer dan één interval.
- **Revalidatie én prestatie** (#traject) direct na de app. Er staan twee fases naast elkaar binnen dezelfde begeleiding: tijdens de revalidatie (faseprogramma, sessiefeedback, dagelijkse check-in) en daarna (prestatiegericht programma, eigen training, contact met de eigen fysio). Licht gebruikt daylight.jpg, donker is typografisch. Er staan geen percentages, logo's of succesclaims in.
- **Dossier Frans Broekhof**: de ringen zijn terug in plaats van kale cijfers, de sessiegrafiek is terug, en de prognose staat er ongewijzigd na.
- **Automatische verslaglegging** met de zichtbare tekst 'Concept in ontwikkeling', bij de kop en op het papier. Het verslag scheidt *Aangeleverd door de cliënt* en *Door de fysiotherapeut*. Het deel van de fysiotherapeut bestaat uit lege invulregels; er zijn geen verzonnen onderzoeksbevindingen.
- FAQ bijgewerkt met de bevestigde extra functies en een eerlijke uitleg van het verslagconcept. Contactvenster en links zijn behouden. Mailconcept vermeldt nu 'ronde 6'.

## Exacte voorbeeldgegevens

Fictieve meetperiode **24 augustus – 18 oktober 2026**. Sessies op dinsdag en vrijdag van 25 augustus t/m 16 oktober (16 sessies). Sessie 7 valt op 15 september, sessie 14 op 9 oktober.

```
pijnTijdens = [5,5,4.5,4.5,4,4,null,3.5,3.5,3,3,3,2.5,2.5,2.5,2]
pijnNa      = [6,6,5.5,5,5,4.5,null,4.5,4,4,3.5,4,3.5,3,3,3]
rpe         = [5,5.5,5.5,6,6,6.5,null,6.5,7,7,7,7.5,7,7.5,7.5,7.5]
motivatie   = [6,6.5,6,6.5,7,7,null,7,7.5,7,7.5,8,7.5,8,8,8]
```

- Sessie 7 heeft geen check-in. In de grafiek is dat een onderbreking van alle vier lijnen, nooit een nul. Het bijschrift zegt dat in gewone tekst.
- Ringen gebruiken één cirkel (`r = 52`, `pathLength = 100`), dus de dash is direct de fractie zonder dubbele afronding:
  - Sessies 16/16 → **100**, teal.
  - RPE laatste 4 (7 / 7,5 / 7,5 / 7,5) = 7,375 → toont **7,4**, ring **73,75** (0,7375), blauw.
  - Motivatie laatste 4 (7,5 / 8 / 8 / 8) = 7,875 → toont **7,9**, ring **78,75** (0,7875), goud.
  - De SVG's zijn decoratief (`aria-hidden`); waarde, label en toelichting staan als tekst in de `dl`. Onder de ringen staat: zelf ingevulde scores, geen risicoscore.
- Sessiegrafiek: statische SVG, desktop 760×318 en een aparte mobiele compositie 360×330. Beide hebben `<title>` en een `<desc>` met alle waarden. Legenda: Pijn tijdens (stippel, ruit), Pijn na (doorgetrokken, cirkel), Ervaren inspanning (streep, vierkant), Motivatie (streep-punt, driehoek). Kleuren volgen de app.

### Voorbeeldscenario (ongewijzigd uit ronde 5)

De prognose-SVG's zijn byte-voor-byte overgenomen uit ronde 5. Weekgemiddelden pijn na: **6 / 5,25 / 4,75 / 4,5 / 4 / 3,75 / 3,25 / 3**. Week 4 gebruikt alleen de ingevulde 4,5. De regressiehelling over week 5–8 is **−0,35 per week**, vanaf de laatste meting 3,0. Week 9–12: **2,65 / 2,3 / 1,95 / 1,6**. De illustratieve halve bandbreedtes zijn **0,4 / 0,7 / 1,0 / 1,3**, dus week 12 = **0,3–2,9**. Dit is geen statistisch betrouwbaarheidsinterval en geen gevalideerde medische voorspelling. Het scenario is niet in het verslag opgenomen.

## Bronnen voor de getoonde functies

Door Codex onderzocht en in BUILD.md vastgelegd. Claude heeft deze repositories in deze ronde niet zelf geopend.

- Cliëntapp, worktree `app-restyle-001-20260928/app-overdracht`, branch `app-totaal-20261006/overdracht`, commit `96dbe8a`: plus-menu (check-in, ademhaling, eigen trainingen), `breathing.ts` (Box 4-4-4-4 en 4-7-8, start/pauze/reset, niets opgeslagen), `own-workout-fields.ts` en `own-workouts.ts` (kracht, hardlopen, cardio, herhalen als nieuwe invoer, geschiedenis in Progressie), `rest-timer.ts` (instelbare rusttimer) en `fysio.tsx` (gekoppelde therapeut, WhatsApp-contact). Smart Fysio is intern en wordt bewust niet getoond.
- Backend `performance-admin`, origin/main `38bccdc`: ondersteuning voor eigen trainingen, plus `ClientMeController` met therapeutnaam en `whatsapp_number`. Er is **geen** automatische verslaggenerator of KNGF-audit gevonden. Verslaglegging staat daarom als concept op de pagina.
- KNGF, *Fysiotherapeutische dossiervoering 2019, verantwoording en toelichting, versie 1.1* (A.2/A.3 hergebruik en inbreng van de patiënt; B.1–B.5 dossieropbouw): <https://www.kngf.nl/app/uploads/2024/09/fysiotherapeutische-dossiervoering-2019-verantwoording-en-toelichting-versie-1.1.pdf>. Op de pagina staat letterlijk: "Opgebouwd met de KNGF-richtlijn als uitgangspunt." Er staat nergens dat iets aan KNGF voldoet of erdoor gecertificeerd is.

## Beperkingen van dit prototype

- Scherm 05 is code-built en geen schermafbeelding uit de app. De knoppen in dat telefoonbeeld zijn weergave, geen bediening. Er is geen account, login of opslag, en er wordt geen bericht verstuurd.
- De zichtbare testnaam in de originele appafbeeldingen is niet weggewerkt.
- Automatische verslaglegging bestaat nog niet als werkende functie of EPD-koppeling. Op de pagina staat het als 'Concept in ontwikkeling'.
- De tekst in het telefoonvoorbeeld schaalt met `cqw`-eenheden (container queries). Hele oude browsers vallen terug op de basisstijl.
- Er is geen browser-, schermlezer- of fysieke iOS/Android-test gedaan door de bouwer.

## Herkomst en controle

Claude Code heeft deze ronde gebouwd in `design/round-6`, zonder subagents, zonder commit of push en zonder externe diensten. Codex heeft de implementatie daarna afzonderlijk in Chromium beoordeeld en de onderstaande gerichte correcties uitgevoerd. De ontwerpbranch en de bestaande private Sites-preview bevatten dezelfde gecontroleerde bestanden.

Codex-review en correcties:

- Drie selecties in `app.js` hersteld van één element naar een collectie (`layers`, `panels`, `picks`). De broncontrole van de bouwer vond deze runtimefout niet; alle vijf appstappen en de extra functies zijn daarna werkend getest.
- Het ademhalingsvoorbeeld toont nu een volledige Box-cyclus van 16 seconden voordat het wisselt. De andere voorbeelden blijven 8 seconden staan. De tekst bij stap 5 is verkort en richt zich op gebruikswaarde.
- De donkere hero-kop op mobiel verkleind zodat het woord 'behandelkamer' volledig binnen beeld past.
- Beide stijlen visueel gecontroleerd op desktop (1348 px) en in mobiele frames met 375 px inhoudsbreedte: foto-intro vóór de app, metriekringen, sessiegrafiek, prognose en verslagsectie. Geen horizontale overloop gevonden in de gecontroleerde tekst- en componentbreedtes.
- Desktop: vijfde appstap, handmatige functiekeuze, pauzeren/afspelen, stoppen bij verlaten van stap 5 en toetsenbord-End getest. Mobiel: vijfde appstap, teller 5 van 5, menu en sluiten na navigatie getest.
- Contact: lege invoer afgewezen, fictieve geldige invoer levert alleen een e-mailconcept, Escape sluit het venster. Geen e-mail verzonden.
- Alle vier gegevensreeksen in beide responsive sessiegrafieken numeriek gecontroleerd, inclusief de onderbreking bij sessie 7. Ringfracties gecontroleerd; beide prognose-SVG's zijn ongewijzigd ten opzichte van ronde 5.
- JavaScript-syntax, unieke IDs, alle interne bestanden/ankers/ARIA-verwijzingen, vijf gesynchroniseerde story-elementen en alle acht ongewijzigde afbeeldingen gecontroleerd.
- Reduced motion en tabbladzichtbaarheid zijn in de bron beoordeeld; geen fysieke iOS-/Android- of schermlezertest uitgevoerd.

Door de bouwer uitgevoerd:

- `node --check app.js`: syntax in orde.
- Statische controle op index.html, light.html en dark.html:
  - unieke IDs;
  - elk `#anker` bestaat;
  - alle `aria-controls` / `aria-labelledby` / `aria-describedby`-doelen bestaan;
  - alle lokale `src`/`href`-bestanden bestaan;
  - precies één H1 per pagina;
  - 5 stappen, lagen, teksten, asides en dims per pagina;
  - de KNGF-zin is aanwezig;
  - geen 'voldoet aan', 'gecertificeerd' of 'KGF';
  - sectievolgorde top › app › traject › praktijkportaal › verslag › oorsprong › faq › contact.
- SHA-256 van alle 8 afbeeldingen is gelijk aan ronde 5.
- De prognose-SVG's zijn identiek aan ronde 5.
- app.js draait zonder fouten op een pagina zonder story-, menu- of contactelementen (rooktest met een minimale DOM-stub in Node). index.html laadt app.js niet.
