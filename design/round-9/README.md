# Performance Plus · ontwerpronde 9

Optie **01 / In beweging** en **03 / Terug naar het veld**, aangepast op 24 oktober 2026. Nieuw: white-label ontwerpvoorbeelden, direct na de bestaande apppresentatie. Beide bestaande websiteontwerpen en hun rustige scrollbeweging blijven behouden.

Statische HTML/CSS/JS zonder build of externe runtime-afhankelijkheden. Distributie: zes tekstbestanden en elf lokale assets, 17 bestanden totaal. De private Site en `design/round-9` in de aparte ontwerpbranch bevatten dezelfde bestanden.

## White label

- `#eigen-merk`: drie gelijke appoverzichten naast elkaar, met de eigen kleuren, logo's, knoppen, hoekvormen en vlakken van FysioHolland, FysioCompany en Fysio Physics als visuele inspiratie. De derde mockup toont een donkere toepassing van de oranje/antraciete huisstijl.
- Alle drie tonen hetzelfde fictieve programma, check-in, ringen (7,5 / 67% / 8,0), contact met de fysio en de tabbalk met het plusje. Deze illustratieve dagwaarden staan los van de historische meetreeks in het cliëntdossier.
- Op smallere schermen staan de voorbeelden in een horizontaal veegbare, met het toetsenbord bereikbare galerij. Geen automatisch wisselende merken of extra dashboardbediening.
- De koppen gebruiken de bestaande tekstbeweging; logo's, cijfers en uitleg blijven rustig staan. De nieuwe sectie werkt ook zonder JavaScript.
- De praktijknamen zijn uitsluitend **huisstijlvoorbeelden**, geen klantcases, aanbevelingen of samenwerkingen. Dit staat direct in de sectie. Alle cliëntgegevens zijn fictief.
- **Implementatiestatus:** dit is een werkend visueel themaconcept voor de marketingwebsite. In de gecontroleerde cliëntapp zijn PFH-logo en merkteksten nog vast ingesteld (`brand-logo.tsx`, taalbestanden); het thema ondersteunt kleuren maar er is geen configureerbare praktijkbranding aangetoond. Deze ronde implementeert geen white-label beheer of provisioning in de echte app/backend.

## Huisstijlbronnen

Op 24 oktober 2026 gelezen op de officiële websites. De organisaties zijn gekozen als Nederlandse praktijkorganisaties met meerdere vestigingen; er worden geen aantallen of klantrelaties geclaimd.

- FysioHolland: <https://www.fysioholland.nl/>. Logo: <https://www.fysioholland.nl/media/ma3nkw5u/logo.svg>. Hoofdstylesheet: <https://www.fysioholland.nl/assets/css/main.css>. Herkenningskleuren #00a8e4 / #ffdd00 / bijna zwart.
- FysioCompany: <https://www.fysiocompany.nl/>. Logo: <https://www.fysiocompany.nl/wp-content/themes/vizien_v2.4/images/logo.svg>. Hoofdstylesheet: <https://www.fysiocompany.nl/wp-content/themes/vizien_v2.4/style.css>. Kleurtokens #003d66 / #39a642.
- Fysio Physics: <https://fysiophysics.nl/>. Logo: <https://fysiophysics.nl/wp-content/uploads/2023/12/FP-logo-svg11.svg>. Globale kleuren: <https://fysiophysics.nl/wp-content/uploads/elementor/css/post-6.css>. Kleurtokens #ea661c / #292929.
- De drie officiële SVG-logo's zijn ongewijzigd lokaal opgeslagen als `assets/brand-fysioholland.svg`, `assets/brand-fysiocompany.svg` en `assets/brand-fysiophysics.svg`. De UI is eigen HTML/CSS/SVG met lokale systeemfonts; geen exacte reproductie van hun websites of bestaande apps.

## Behouden uit ronde 8

Fotografische opening, vijf appstappen met het werkende plusmenu, revalidatie én performance, één compact cliëntdossier, ringen en grafieken die opbouwen, verslagconcept en contactvenster. Geen telefoon-inzoom. De bestaande meetreeksen, prognose, acht afbeeldingen en medische formuleringen zijn ongewijzigd.

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
  - De SVG's zijn decoratief (`aria-hidden`); waarde, label en toelichting staan als tekst in de `dl`. De voetnoot benoemt zelf ingevulde scores en fictieve gegevens.
- Sessiegrafiek: statische SVG, desktop 520×220 en een aparte mobiele compositie 360×224. Beide hebben `<title>` en een `<desc>` met alle waarden. Legenda: Pijn tijdens (stippel, ruit), Pijn na (doorgetrokken, cirkel), Ervaren inspanning (streep, vierkant), Motivatie (streep-punt, driehoek). Kleuren volgen de app.

### Voorbeeldscenario

De gegevens uit ronde 5 en 6 zijn behouden; de SVG-geometrie is aangepast aan het compactere formaat. Weekgemiddelden pijn na: **6 / 5,25 / 4,75 / 4,5 / 4 / 3,75 / 3,25 / 3**. Week 4 gebruikt alleen de ingevulde 4,5. De regressiehelling over week 5–8 is **−0,35 per week**, vanaf de laatste meting 3,0. Week 9–12: **2,65 / 2,3 / 1,95 / 1,6**. De illustratieve halve bandbreedtes zijn **0,4 / 0,7 / 1,0 / 1,3**, dus week 12 = **0,3–2,9**. Dit is geen statistisch betrouwbaarheidsinterval en geen gevalideerde medische voorspelling. Het scenario is niet in het verslag opgenomen.

## Bronnen en grenzen

- De eerder aangeleverde Mercury-markdown blijft een selectieve stijlreferentie voor rustige vlakken en typografie. De telefoon-inzoom uit ronde 7 is op verzoek verwijderd.
- In ronde 7 is `app-overdracht/src/components/client/plus-menu.tsx` opnieuw gelezen in de werkmap `app-restyle-001-20260928`: eigen training, dagelijkse check-in en ademhaling zijn de bevestigde menu-ingangen. Smart Fysio is intern/soon en wordt niet getoond.
- Het eerdere functieonderzoek gebruikte cliëntappcommit `96dbe8a` en backendcommit `38bccdc`: eigen trainingen, ademhaling, rusttimer en contact met de gekoppelde therapeut. Er werd geen automatische verslaggenerator of KNGF-audit gevonden.
- KNGF, *Fysiotherapeutische dossiervoering 2019, verantwoording en toelichting, versie 1.1*: <https://www.kngf.nl/app/uploads/2024/09/fysiotherapeutische-dossiervoering-2019-verantwoording-en-toelichting-versie-1.1.pdf>. De website zegt: “Opgebouwd met de KNGF-richtlijn als uitgangspunt.”
- De eerste vier appschermen zijn originele afbeeldingen, inclusief de bestaande testnaam. Het plusmenu is een nagebouwde demonstratie met fictieve waarden. Het verslag is een concept, geen werkende generator of EPD-koppeling.

## Controle in deze ronde

- JavaScript-syntax; één H1, unieke IDs en geldige interne bestanden, ankers en ARIA-verwijzingen per pagina.
- Drie volledige logo's geladen. Desktop: drie gelijk uitgelijnde telefoons met dezelfde inhoud in beide stijlen. Mobiel: beide varianten bij 375 px, body en scrollbreedte beide 375 px; alleen de galerij schuift horizontaal. Met pijl-rechts bereikbaar en met CSS scroll-snap uitgelijnd.
- De nieuwe CTA opent het bestaande contactvenster; de appflow leidt via de nieuwe sectie verder naar het bestaande traject.
- Alle oorspronkelijke SVG-grafieken en de acht oorspronkelijke assets vergeleken en ongewijzigd. Bestaande appstappen en plusmenu behouden. Geen telefoon-inzoom teruggebracht.
- Nieuwe mockups zijn semantisch als beschrijvende illustratie gegroepeerd, geen niet-werkende formulierknoppen. De galerij heeft een naam en uitleg; de koppen volgen het bestaande reduced-motion-pad.
- Tijdelijke mobiele QA-pagina verwijderd vóór publicatie. Geen wijziging aan de echte cliëntapp, backend of toegang van de Site.
