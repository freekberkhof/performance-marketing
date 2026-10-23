# Performance Plus · ontwerpronde 4

Twee volledig uitgewerkte websitepreviews op basis van Kaylees huidige site, plus een vergelijkingspagina.
Statisch, geen build, geen externe scripts of fonts, alleen relatieve URL's.

| Bestand | Inhoud |
| --- | --- |
| `index.html` | Vergelijkingspagina voor beide opties |
| `light.html` | Optie 01 · **In beweging** (licht grijsgroen, inkt, ingetogen groen) |
| `dark.html` | Optie 03 · **Terug naar het veld** (grafiet, leisteen, gedempt blauw) |
| `styles.css` | Gedeelde componenten + twee sets themavariabelen + per optie een eigen compositie |
| `app.js` | Alle interactie (vanilla JS, geen afhankelijkheden) |
| `assets/` | Beelden (zie hieronder) |

**Deploylijst:** de bestanden hierboven plus `assets/`. `BUILD.md` en `build-result.json` horen bij het bouwproces en gaan niet mee in de deploy.

## Bronfideliteit (Kaylees code, origin/main)

- **App-scroll** (`components/app-showcase.tsx`) is geport naar plain JS (`initAppStory` in `app.js`). Dezelfde vensterlogica:
  - 4 segmenten, `FADE 0.06`;
  - elk scherm schuift als sheet omhoog (103% → 0) met Kaylees easing `cubicBezier(0.32, 0.72, 0, 1)`;
  - het vorige scherm schaalt naar 0.93 en dimt tot 0.42, met overgang van de hoekradius;
  - tekst en aside driften mee (36/70 px), 4-delige voortgang, scrollspoor van 420svh met sticky stage;
  - de vier staptitels, -teksten en asides zijn letterlijk overgenomen (decimalen met komma).

  Toegevoegd:
  - klikbare stapknoppen (ook pijltjestoetsen, Home en End) die naar het bijbehorende scherm scrollen;
  - rAF draait alleen zolang de sectie in beeld is (IntersectionObserver); scrollen blijft native.

  De vastgezette versie verschijnt alleen vanaf 1100 × 700 px en zonder reduced motion. Anders is er een compacte handmatige modus met tabs, vorige/volgende-knoppen en vegen, zonder lange verplichte scroll. Zonder JS blijven alle vier de teksten leesbaar en blijft het eerste scherm zichtbaar.
- **Praktijkportaal** (`components/window-mockup.tsx`) behoudt de hiërarchie: cliëntkop met fase en behandelaar, de tabs, de drie ringen (Voortgang/Belasting/Motivatie), "Aandacht nodig", "Herstel & check-ins" en de cliëntgegevens. Uitgebreid tot een werkende demo:
  - zoeken;
  - statusfilter in een linkerrail;
  - een echte `<table>`;
  - rij → detail in dezelfde sectie;
  - tabs Overzicht/Sessies/Verslag;
  - een SVG-grafiek met 3 reeksen (pijn na, RPE, motivatie), met reeksknoppen en een periode van 4/8 weken.
- **Terminologie en inhoud** komen uit `hero/features/value-prop/case-study/faq.tsx`:
  - fases en programma's, voltooide sessies;
  - check-ins (slaap/stress/pijn), RPE en motivatie;
  - meldingen naar de praktijk, voorrang bij pijn ≥ 7, "geen spoedkanaal";
  - pilotversie, toegang alleen op uitnodiging, "gebouwd in de praktijk van PFH Performance".

  Kaylees fictieve namen (Frans Broekhof, Sanne Bos, Youssef El Amrani, Lotte Vermeer) zijn hergebruikt.
- **Bewust weggelaten:** NEN 7510/7512/7513 en hostingclaims van de huidige site (niet-onderbouwde certificeringsclaims), het motief met afgesneden hoeken en corner-plus, de ASCII-achtergrond en elke vorm van AI-branding.

## Bewuste beperkingen

- **Alle cliëntgegevens zijn fictief** (`CLIENTS` in `app.js`, periode 24-08 t/m 18-10-2026). Zichtbaar gelabeld als "Interactieve demo · fictieve cliëntgegevens".
- **Voorbeeldscenario** (`#verwachting`) is gelabeld als "Voorbeeldscenario · ontwerpconcept".
  - Rekenvoorbeeld: een lineaire trend door de weekgemiddelden van week 3–6, doorgetrokken van week 6 tot week 12, met een band die per week 0,3 breder wordt.
  - Toont gemeten tegenover scenario en het verschil voor week 7–8.
  - Geen hersteldatum, geen behandeladvies. Tekst: "Illustratieve doorkijk; geen medische voorspelling. De behandelaar beoordeelt het vervolg."
- **Verslagworkflow** (`#verslag`) is gelabeld als "Conceptworkflow".
  - Het concept wordt opgebouwd uit de fixturewaarden van de geselecteerde cliënt, alleen uit de gekozen bronnen, en is bewerkbaar.
  - "Controleer en markeer" markeert alleen in deze demo: er wordt niets opgeslagen en niets naar een dossier geschreven.
  - Geen AI-branding, geen claim over tijdwinst, geen spraaktranscriptie. Stap 05 "Overnemen in je dossier" staat zichtbaar gemarkeerd als buiten de demo.
- **Contact** opent een dialoog met verplichte velden naam, e-mail en praktijk.
  - Bouwt een `mailto:`-concept aan info@passionforhealth.nl en toont een voorbeeld.
  - Alleen een klik op de knop opent je eigen e-mailprogramma; de pagina verstuurt zelf niets.
  - Escape, achtergrond en sluitknop werken; de focus blijft in de dialoog en keert daarna terug.
  - Zonder JS gaan de links rechtstreeks naar `mailto:`/`#contact`.
- **RPE** staat er als ervaren inspanning, expliciet "geen risicoscore".
- **Appschermen:** de 4 originele JPEG's zijn byte-identiek aan `public/app/01–04.jpg` (SHA-256 gecontroleerd). Ze bevatten demogegevens, waaronder de zichtbare testnaam "Testttt…" uit de echte app. Die is bewust niet weggewerkt.

## Mobbin-patronen (aangepast, niet gekopieerd; geen screenshots of merken gebruikt)

- **Bevel, productsectie:** groot centraal productbeeld met royale fotoschaal. Gebruikt in de hero van 01 (brede foto + overlappende echte telefoon) en in de gecentreerde telefoon van de app-scroll. Het pastelverloop is niet overgenomen.
- **Bevel, metriekensectie:** beknopte, leesbare losse metrieken. Gebruikt voor de portaalkaart in de hero, de ringen en de tegels van de dagelijkse check-in.
- **Intercom, rapportdetails:** linkerrail als filternavigatie → details. Gebruikt voor de statusfilterrail in het portaal en voor bronkolom → editor in de verslagworkflow.
- **Midday, klanten:** compact appframe, zoeken boven de tabel, selectie → details, ingetogen dichtheid. Gebruikt voor de portaaltabel met het dossier eronder in hetzelfde frame.

## Beelden

`strength.jpg`, `basketball.jpg`, `daylight.jpg`: gegenereerde fotovervangers uit ronde 3, geen echte cliënten. `logo-mark.png`: origineel wit logo van Performance Plus, altijd op een donkere achtergrond. `app-01.jpg` komt uit `public/app/01.jpg`; `app-02..04.jpg` komen uit ronde 3 (identiek aan `public/app`). Totale omvang van de assets ca. 1,1 MB, zonder duplicaten. Het herobeeld laadt direct, alles onder de vouw laadt lazy.

## Validatie (bouwer, lokaal)

- `node --check app.js`: OK.
- Audit van ankers, bestanden en `aria-controls`/`aria-labelledby` over alle drie de pagina's: geen ontbrekende verwijzingen, geen externe URL's, één `h1` per pagina, elke `<img>` heeft een `alt`.
- Headless Chrome (lokaal, via CDP), zonder consolefouten:
  - 1440 × 900: vastgezette app-scroll halverwege en stap 4 via de knop;
  - portaal: zoeken op "volley" → 1 resultaat, filter, rij openen → focus op de detailkop, reeks- en periodeknoppen wijzigen de samenvatting, tab Sessies, deeplink naar Verslag;
  - verslag opbouwen en markeren;
  - scenario per cliënt;
  - contact: leeg versturen geeft een foutmelding, geldig versturen geeft het mailto-voorbeeld, Escape sluit en de focus keert terug;
  - 375 px voor beide pagina's: `scrollWidth` = 375 (geen horizontale overflow), mobiel menu, handmatige app-tabs;
  - reduced motion: handmatige modus, geen spoor van 420svh;
  - JS uitgeschakeld: inhoud en eerste scherm zichtbaar.
- Dit is een zelfcontrole, geen onafhankelijke review. Codex controleert dezelfde versie apart.

## Codex-controle en afronding

Claude Code bouwde de twee ontwerpen. Codex controleerde de bron en de werkende pagina's apart in Chromium. Na de sessielimiet van Claude zijn de gerichte correcties door Codex uitgevoerd en opnieuw gecontroleerd: mobiele kop/FAQ, datums binnen de meetperiode, afronding van nulwaarden, verslagmarkering na bronwijziging en precieze conceptlabels. Die correcties zijn dus geen tweede onafhankelijke review van eigen code.

Gecontroleerd: desktop 1348 px; mobiele iframe-inhoud 375 px zonder horizontale pagina-overloop; appstappen/pinned scroll; mobiel menu; cliënt zoeken en selecteren; 4/8-wekenfilter en grafiekreeksen; sessietabel; scenario aan/uit en cliëntkoppeling; verslag opbouwen, bewerken en markeren; vervallen markering na bronwijziging en lege tekst; contactvalidatie, e-mailconcept en Escape. Geen e-mail verstuurd. Alle lokale links, ankers en assets aanwezig; `node --check app.js` geslaagd. Appschermen en logo zijn bytegelijk aan de bron. Geen fysieke iOS-/Android-test uitgevoerd.
