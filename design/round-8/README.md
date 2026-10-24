# Performance Plus · ontwerpronde 8

Optie **01 / In beweging** en **03 / Terug naar het veld**, aangepast op 24 oktober 2026: de telefoon-inzoom is verwijderd. De rest van ronde 7 blijft behouden. Tekst, ringen en grafieken krijgen nu rustige beweging.

Statische HTML/CSS/JS, geen build of externe afhankelijkheden. Distributie: `index.html`, `light.html`, `dark.html`, `styles.css`, `app.js`, `README.md` en de acht bestaande bestanden in `assets/`. De bestaande private Site en de ontwerpbranch bevatten dezelfde 14 bestanden.

## Wat is veranderd

- **Direct van foto naar app.** De complete extra scène, de inzoomcode en bijbehorende CSS zijn verwijderd. `#app` verwijst weer naar de vijf appschermen. Het bestaande anker `#appschermen` blijft op het story-spoor beschikbaar.
- **Tekst schuift in en uit.** Koppen, toelichtingen en enkele inhoudsblokken bewegen met de normale scrollpositie: maximaal 32 px horizontaal en 26 px verticaal bij binnenkomst. Ze zijn in het leesgebied volledig zichtbaar en verdwijnen pas bij het verlaten van de bovenrand. Op mobiel is de horizontale beweging kleiner. De apppresentatie behoudt haar eigen bestaande beweging.
- **Ringen lopen vol.** De drie metriekringen tekenen na elkaar op wanneer de rij in beeld komt. De teksten blijven meteen de juiste waarden tonen: 16/16, 7,4 en 7,9.
- **Grafieken bouwen op.** De meetlijnen worden van links naar rechts zichtbaar, gevolgd door de prognose en de bandbreedte. De cijfers, kleuren, lijnstijlen, ontbrekende check-in en coördinaten zijn ongewijzigd. Aslabels en legenda blijven staan. Resultaten animeren één keer per paginabezoek en blijven daarna compleet zichtbaar.
- **Toegankelijkheid en belasting.** Eén requestAnimationFrame voor de actieve tekstblokken; IntersectionObserver bepaalt wat in beeld is. Geen permanente animatielus of scrollblokkering. Toetsenbordfocus maakt een blok direct volledig zichtbaar. Bij `prefers-reduced-motion` is alle inhoud direct leesbaar, zonder de nieuwe animaties. Zonder JavaScript blijft de HTML volledig bruikbaar.
- **Behouden.** De twee stijlen, de foto-openingen, Kaylees appflow, het plusmenu met drie bevestigde ingangen, het compacte cliëntdossier, revalidatie én performance en het verslagconcept zijn behouden.

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

## Uitgevoerde controle in deze ronde

- JavaScript-syntax en documentstructuur gecontroleerd: één H1, unieke IDs, geldige interne bestanden, ankers en ARIA-verwijzingen. Vijf gesynchroniseerde appstappen per variant.
- Alle vier SVG-grafieken per variant zijn identiek aan ronde 7 na het verwijderen van de nieuwe animatiewrapper. Geen wijzigingen aan meetreeksen, geometrie, ringen of voorbeeldprognose. Alle acht afbeeldingen zijn ongewijzigd.
- Chromium desktop: foto direct naar app, geen inzoomscène; tekstposities bij binnenkomst en vertrek gemeten; ringen en grafieken gecontroleerd vóór en na de opbouw. Eindfracties 100 / 73,75 / 78,75, grafieken volledig zichtbaar. De vijfde appstap blijft bereikbaar.
- Beide mobiele varianten bij 375 px inhoudsbreedte gecontroleerd: menu, ankers, handmatige appmodus, ringen en gestapelde grafieken. Bodybreedte en scrollbreedte zijn beide 375 px.
- Reduced-motion-JavaScriptpad gecontroleerd met een tijdelijke fixture die de mediaquery simuleert: geen page-motion, handmatige appweergave, alle teksten zichtbaar en alle grafieken direct volledig getekend. De CSS-mediaquery is in de bron beoordeeld. Geen wijziging aan browser- of systeemvoorkeuren.
- Tijdelijke testpagina's verwijderd vóór publicatie. Geen fysieke iOS-/Android-, schermlezer- of medische validatietest uitgevoerd. Het contactvenster is ongewijzigd ten opzichte van de in ronde 7 geteste versie.
