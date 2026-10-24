# Performance Plus · ontwerpronde 7

Optie **01 / In beweging** en **03 / Terug naar het veld**, verfijnd op de feedback van 24 oktober 2026. De twee richtingen en de foto-intro blijven behouden. Deze ronde past de aangeleverde Mercury-stijlreferentie selectief toe: rustigere oppervlakken, subtiele randen, zachtere typografie en afgeronde bediening, met het eigen groene/blauwe PFH-palet.

Statische HTML/CSS/JS, geen build of externe afhankelijkheden. Deploy `index.html`, `light.html`, `dark.html`, `styles.css`, `app.js`, `README.md` en de acht bestaande bestanden in `assets/` (14 bestanden totaal). Tijdelijke controles horen niet in de distributie.

## Wat is veranderd

- **Eerst de foto, daarna de telefoon in.** De nieuwe tweede scène staat op `#app`. Op een scherm vanaf 1100 × 700 px zoomt en draait de telefoon met de scrollbeweging, waarna hij overvloeit in Kaylees vijf appschermen op `#appschermen`. De scènes overlappen voor een overgang zonder leeg vlak. Scroll blijft volledig native; er is ook een directe link naar de appschermen.
- **Mobiel en reduced motion.** De extra inzoom vervalt. Een compacte tekstintro leidt naar de bestaande handmatige apppresentatie met tabs, pijlen en vegen. De inzoom gebruikt één requestAnimationFrame per scrollupdate, alleen wanneer de scène in beeld is.
- **Stap 05 is het plusmenu.** Het plusje in de telefoon is een echte lokale knop. Het opent de drie in de appcode bevestigde ingangen: eigen training, dagelijkse check-in en ademhaling. De demo bevat terug- en sluitknoppen, Escape, aria-expanded en focusmanagement. Contact met de fysio blijft elders op de pagina zichtbaar; het wordt niet als plusmenu-item gepresenteerd.
- **Rustig automatisch voorbeeld.** De demo opent het menu en laat de drie ingangen zien. Handmatige bediening of toetsenbordfocus pauzeert de reeks. Afspelen stopt buiten stap 5, buiten beeld, bij hover met een muis, in een verborgen tabblad en bij reduced motion. De ademhalingscyclus heeft vier fasen van vier seconden. Er is geen opslag of backendverbinding.
- **Compacter cliëntdossier.** Eén fictieve cliënt, kleinere ringen voor uitvoering, inspanning en motivatie, en twee statische grafieken naast elkaar. Links staat het sessieverloop; rechts de voorbeeldprognose met bandbreedte. Op mobiel staan de grafieken onder elkaar. De cijfers, ontbrekende check-in en illustratieve status zijn behouden.
- **Bestaande inhoud.** Revalidatie én performance, eigen regie, contact met de fysio en het verslagconcept blijven staan. Automatische verslaglegging blijft zichtbaar als *Concept in ontwikkeling*. Er wordt geen onbevestigde KNGF-conformiteit of certificering geclaimd.

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

- De door de gebruiker aangeleverde Mercury-markdown is een stijlreferentie met CSS-tokens, geen werkende inzoomimplementatie. De overgang is specifiek voor deze website gemaakt.
- Deze ronde is `app-overdracht/src/components/client/plus-menu.tsx` opnieuw gelezen in de werkmap `app-restyle-001-20260928`: eigen training, dagelijkse check-in en ademhaling zijn de bevestigde menu-ingangen. Smart Fysio is intern/soon en wordt niet getoond.
- Het eerdere functieonderzoek gebruikte cliëntappcommit `96dbe8a` en backendcommit `38bccdc`: eigen trainingen, ademhaling, rusttimer en contact met de gekoppelde therapeut. Er werd geen automatische verslaggenerator of KNGF-audit gevonden.
- KNGF, *Fysiotherapeutische dossiervoering 2019, verantwoording en toelichting, versie 1.1*: <https://www.kngf.nl/app/uploads/2024/09/fysiotherapeutische-dossiervoering-2019-verantwoording-en-toelichting-versie-1.1.pdf>. De website zegt: “Opgebouwd met de KNGF-richtlijn als uitgangspunt.”
- De eerste vier appschermen zijn originele afbeeldingen, inclusief de bestaande testnaam. Het plusmenu is een nagebouwde demonstratie met fictieve waarden. Het verslag is een concept, geen werkende generator of EPD-koppeling.

## Uitgevoerde controle

Deze ronde is door Codex geïmplementeerd en in Chromium gecontroleerd, zonder afzonderlijke bouwer of subagents.

- Beide foto-openingen, de desktop-inzoom en de overgang naar de app bekeken. Een leeg moment in de overgang is verholpen met overlappende scènes.
- Plusmenu op desktop getest: openen, eigen training, terug, dagelijkse check-in, terug, ademhaling, sluiten met Escape en pauzeren. De automatische reeks naar eigen training is ook zichtbaar gecontroleerd.
- Beide versies bekeken in mobiele frames met 375 px inhoudsbreedte: vijfde appstap, plusmenu, navigatiemenu, kleinere ringen en gestapelde grafieken. De bodybreedte en scrollbreedte zijn beide 375 px.
- Desktopdossier: maximaal 1180 px breed; bij de gecontroleerde viewport 693 px hoog. De grafieken staan naast elkaar, met de gegevens in één samenhangend blok.
- Contactvenster: lege invoer wordt afgewezen, fictieve geldige invoer levert een e-mailconcept op, Escape sluit het venster. Geen e-mail verzonden.
- JavaScript-syntax, één H1 per pagina, unieke IDs, interne links en ARIA-verwijzingen, vijf gesynchroniseerde appstappen en alle acht ongewijzigde afbeeldingen gecontroleerd.
- Alle vier grafiekgeometrieën per variant numeriek gecontroleerd tegen de voorbeeldreeksen, inclusief de onderbreking bij sessie 7, de regressiehelling, bandbreedte en ringfracties.
- Reduced motion en tabbladzichtbaarheid in de bron beoordeeld; geen fysieke iOS/Android-, schermlezer- of medische validatietest uitgevoerd.
