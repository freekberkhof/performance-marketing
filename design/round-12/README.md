# Performance Plus · ontwerpronde 12

25 oktober 2026. Alleen `dark.html` is verder uitgewerkt op basis van Kaylees feedback. De bestaande openbare testlinks blijven bruikbaar.

- White-labelsectie, praktijkvoorbeelden, footerlink en FAQ-verwijzing verwijderd uit de zwarte versie. De app wordt niet aangeboden als aanpasbare praktijkapp.
- Kleinere koppen in normale hoofdletters, minder herhaalde bovenlabels en geen marketingpills. De app-interface houdt haar eigen ringen en bediening.
- Fotografische opening, compacter appverhaal met rustige zijinformatie, een foto naast Rehab/Performance en een open opmaak voor onderbouwing en contact.
- Alleen de zwarte pagina laadt `dark.css`. `light.html`, `index.html`, `styles.css`, `app.js` en alle bestaande assets blijven byte voor byte gelijk aan ronde 11.
- De vijf appstappen, plusmenu, sessiegegevens, grafieken, richtlijnbronnen en contactformulier blijven behouden. Geen nieuwe medische of App Store-claims.
- De hieronder beschreven white-labelconcepten gelden uitsluitend nog voor de ongewijzigde lichte versie en zijn geen beschikbare productfunctie.

## Controle ronde 12

- Browsercontrole desktop en mobiele schermbreedtes 320, 375 en 412 px: geen horizontale pagina-overloop. Fotografie, tekst, portaal en verslag visueel beoordeeld.
- Alle vijf appstappen doorlopen; plusmenu geopend en Eigen training bereikbaar. Mobiel menu sluit na sectiekeuze.
- Contactformulier valideert verplichte velden en maakt een mailto naar info@performanceplus.nl. Geen bericht verstuurd.
- Vier SVG-grafieken, meetwaarden en ringen gelijk aan ronde 11; lichte HTML, vergelijking, gedeelde CSS/JS en alle elf assets exact ongewijzigd.
- Unieke IDs, interne links, ARIA-verwijzingen en lokale assets gecontroleerd; één H1. JavaScript-syntax en whitespacecontrole geslaagd.
- Geen websitefouten in de bekeken browserconsole; alleen meldingen van de browserextensie. Dit is browser-QA, geen test op een fysieke Android of iPhone.

## Eerdere uitvoering en bronverantwoording

### Ontwerpronde 11

Optie **01 / In beweging** en **03 / Terug naar het veld**, aangepast op 25 oktober 2026. Beide concepten behouden hun fotografische opening, de vijf appstappen van Kaylee, subtiele beweging en het compacte cliëntdossier. Geen telefoon-inzoom.

Statische HTML/CSS/JS zonder build of externe runtime-afhankelijkheden. Distributie: zes tekstbestanden en elf lokale assets, 17 bestanden. De Site en `design/round-11` op de aparte ontwerpbranch bevatten identieke bestanden.

## Verwerkt uit de opdracht

- LaptopFreek verbonden vóór implementatie; oorspronkelijke marketingbron en huidige appbron gelezen.
- White-label balk blijft als laatste sectie na Contact en vóór de footer.
- Op mobiel is elke kaart even breed als de beschikbare kolom, zonder negatieve marge. De telefoon staat exact in het midden, ook op de eerste en laatste kaart.
- Zes stijlen: FysioHolland, FysioCompany, Fysio Physics, Warm zand, Diepgroen en Kobaltblauw. De drie nieuwe kleurconcepten hebben een eigen palet, knoppen, ringen, hoeken en een neutraal woordmerk. Warm zand gebruikt ook een serif voor de begroeting.
- Alle zes tonen dezelfde appflow met 7,5 / 67% / 8,0, dagelijkse check-in, programma, fysio en plusje. Geen automatische carousel; pijlen, swipen, toetsenbord en scrollbar blijven beschikbaar.
- Lange prognosevoetnoot en herhaalde fictie-/demo-uitleg verwijderd. De compacte grafiek heet Trendvoorbeeld, met een kort bijschrift over de doortrekking van week 5–8. Alle meetwaarden en SVG-geometrie zijn gelijk gebleven.
- Alle marketingteksten herzien: concrete cliënt- en praktijkfuncties, rehab én performance, eigen regie, contact met de fysio en verslaglegging. De bestaande kop Jouw praktijk / Jouw uitstraling, echte appbeelden en meetwaarden blijven herkenbaar.
- Oefenbibliotheek en hergebruik, fases vrijgeven, sessiefeedback, dagelijkse check-ins, meldingen bij hoge pijnscores, WhatsApp, eigen training, rusttimer, ademhaling en licht/donker opgenomen.
- `info@performanceplus.nl` in alle zichtbare contactlinks, mailto-links en de JavaScript-mailgenerator.
- Compacte onderbouwing bij de werkwijze: KNGF, Aspetar en onderzoek naar persoonlijke oefenapps, met links en een uitklapbare toelichting.

## Productcontrole en status

Op LaptopFreek gelezen:

- `performance-marketing`, oorspronkelijke `origin/main`: `components/value-prop.tsx`, `components/features.tsx`, `components/faq.tsx` en `lib/config.ts`.
- `app-restyle-001-20260928/app-overdracht`, commit `96dbe8a3376704944d878df17b9361d7f80047d8`: plusmenu, Nederlandse functielabels, README en backendoverdracht. De bron is React Native/Expo met Laravel-API; oudere platformherinneringen zijn niet als bewijs gebruikt.
- Eigen krachttraining (sets/herhalingen/gewicht), hardlopen (duur/afstand/tempo), cardio en herhalen; dagelijkse check-in, ademhaling, rusttimer en fysio/WhatsApp komen uit de appbron. Smart Fysio blijft buiten de marketingweergave.
- Automatische verslaglegging is **in ontwikkeling**. Er is geen werkende verslaggenerator, EPD-koppeling of KNGF-audit vastgesteld. De website toont een conceptverslag en zegt dat de richtlijn het uitgangspunt vormt; geen certificering of volledige complianceclaim.
- White label is een visueel concept. De huidige app heeft vaste PFH-merkteksten; deze ronde bouwt geen praktijkbranding-beheer in de echte app/backend.
- De genoemde praktijkmerken zijn huisstijlvoorbeelden, geen klanten of partners. De drie nieuwe paletten gebruiken Jouw praktijk.
- Geen wijziging aan de echte cliëntapp, backend, main of Site-toegang. Geen cliëntgegevens gelezen of berichten verstuurd.

## Onderbouwing

Gelezen op 25 oktober 2026, alleen officiële richtlijnbronnen en de onderzoekspublicatie.

1. KNGF, *Fysiotherapeutische dossiervoering 2019, verantwoording en toelichting*, versie 1.1. <https://www.kngf.nl/app/uploads/2024/09/fysiotherapeutische-dossiervoering-2019-verantwoording-en-toelichting-versie-1.1.pdf>. Gebruikt voor klinisch relevante registratie, behandelplan en evaluatie; geen productcertificering afgeleid.
2. Barbosa & Kotsifaki, Aspetar Sports Medicine Journal, 2023, toelichting op de *Aspetar clinical practice guideline* na VKB-reconstructie. <https://journal.aspetar.com/en/journals/volume-12-targeted-topic-rehabilitation-after-acl-injury/aspetar-clinical-practice-guideline>. Opbouw met criteria en aandacht voor hersteltijd; voor veel onderdelen lage zekerheid en aanvullende klinische expertise. Geen universeel tijdpad of herstelgarantie.
3. Davergne e.a., JMIR 2023, review en meta-analyse van apps met persoonlijke oefenvideo’s. <https://www.jmir.org/2023/1/e45207/>. Mogelijke voordelen voor functioneren en vertrouwen bij oefenen, lage bewijskracht; effect op therapietrouw onzeker. Geen direct bewijs voor Performance Plus.

## Huisstijlbronnen


Op 24 oktober 2026 gelezen op de officiële websites. De organisaties zijn gekozen als Nederlandse praktijkorganisaties met meerdere vestigingen; er worden geen aantallen of klantrelaties geclaimd.

- FysioHolland: <https://www.fysioholland.nl/>. Logo: <https://www.fysioholland.nl/media/ma3nkw5u/logo.svg>. Hoofdstylesheet: <https://www.fysioholland.nl/assets/css/main.css>. Herkenningskleuren #00a8e4 / #ffdd00 / bijna zwart.
- FysioCompany: <https://www.fysiocompany.nl/>. Logo: <https://www.fysiocompany.nl/wp-content/themes/vizien_v2.4/images/logo.svg>. Hoofdstylesheet: <https://www.fysiocompany.nl/wp-content/themes/vizien_v2.4/style.css>. Kleurtokens #003d66 / #39a642.
- Fysio Physics: <https://fysiophysics.nl/>. Logo: <https://fysiophysics.nl/wp-content/uploads/2023/12/FP-logo-svg11.svg>. Globale kleuren: <https://fysiophysics.nl/wp-content/uploads/elementor/css/post-6.css>. Kleurtokens #ea661c / #292929.
- De drie officiële SVG-logo's zijn ongewijzigd lokaal opgeslagen als `assets/brand-fysioholland.svg`, `assets/brand-fysiocompany.svg` en `assets/brand-fysiophysics.svg`. De UI is eigen HTML/CSS/SVG met lokale systeemfonts; geen exacte reproductie van hun websites of bestaande apps.

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
  - De SVG's zijn decoratief (`aria-hidden`); waarde, label en toelichting staan als tekst in de `dl`. De dossierkop benoemt dat het om een voorbeeld gaat. De uitgebreide zichtbare voetnoot is op verzoek verwijderd.
- Sessiegrafiek: statische SVG, desktop 520×220 en een aparte mobiele compositie 360×224. Beide hebben `<title>` en een `<desc>` met alle waarden. Legenda: Pijn tijdens (stippel, ruit), Pijn na (doorgetrokken, cirkel), Ervaren inspanning (streep, vierkant), Motivatie (streep-punt, driehoek). Kleuren volgen de app.

### Voorbeeldscenario

De gegevens uit ronde 5 en 6 zijn behouden; de SVG-geometrie is aangepast aan het compactere formaat. Weekgemiddelden pijn na: **6 / 5,25 / 4,75 / 4,5 / 4 / 3,75 / 3,25 / 3**. Week 4 gebruikt alleen de ingevulde 4,5. De regressiehelling over week 5–8 is **−0,35 per week**, vanaf de laatste meting 3,0. Week 9–12: **2,65 / 2,3 / 1,95 / 1,6**. De illustratieve halve bandbreedtes zijn **0,4 / 0,7 / 1,0 / 1,3**, dus week 12 = **0,3–2,9**. Dit is geen statistisch betrouwbaarheidsinterval en geen gevalideerde medische voorspelling. Het scenario is niet in het verslag opgenomen.

## Controle in deze ronde

- HTML: één H1, unieke IDs, bestaande interne doelen en ARIA-verwijzingen, alle lokale beelden aanwezig.
- JavaScript-syntax en Git whitespacecontrole geslaagd.
- Alle vier SVG-grafieken per variant vergeleken met ronde 10: geometrie en meetwaarden ongewijzigd.
- Browserpreview desktop: beide openingen, nieuwe huisstijlen en onderbouwing visueel gecontroleerd.
- Mobiel: 375 px licht en 412 px donker; pagina blijft exact binnen die breedte. Telefoon op eerste, derde en laatste kaart: afwijking van het midden **0 px**. Eindposities 1755 en 1940 px; volgende pijl dan uitgeschakeld. Terugbladeren en Home/End werken.
- Desktopgalerij: zes kaarten, eindpositie 2096 px, correcte uitgeschakelde eindknop.
- Plusmenu: gepauzeerd, menu geopend en eigen training bereikbaar.
- Contactformulier: lege invoer geeft validatiefout; ingevulde demo levert een mailto aan **info@performanceplus.nl** op. Geen e-mail geopend of verstuurd.
- Animaties en reduced-motiongedrag blijven ongewijzigd. Nieuwe voorbeelden werken ook met native scroll zonder JS.
- Tijdelijke mobiele controlepagina verwijderd vóór packaging.
