# Ronde 3 — bouwresultaat

Datum: 23 oktober 2026 · Bouwer: Claude Code (Opus 5.5) · Status: gebouwd en lokaal gecontroleerd. Dit is geen onafhankelijke review.

## Geschreven en gewijzigd (alleen in `design/round-3`)

| Bestand | Wat |
|---|---|
| `styles.css` | Nieuw. Eén stylesheet voor de hub en drie thema's (`theme-light`, `theme-warm`, `theme-dark`), responsive van 375 tot 1440 px. Alleen systeemlettertypen, geen externe bronnen. |
| `app.js` | Nieuw. Bouwt de header (navigatie, conceptwisselaar, mobiel menu, skiplink), de footer en twee dialogen (app-rondleiding en contact). Regelt de functietabs, de doelgroeptabs, de rondleidingen in de pagina en de demolabels. |
| `index.html` | Vergelijkingskenmerken (opbouw, kleur, letter) toegevoegd aan de drie conceptkaarten; `aria-label` op de decoratieve pijl vervangen door `aria-hidden`. |
| `light.html`, `warm.html`, `dark.html` | `id="vragen"` op de FAQ-sectie (navigatieanker). Op `warm.html` en `dark.html` kregen de stapgroepen `role="group"`. |

`assets/`, de `.b64`-bestanden en `build-result.json` zijn niet aangeraakt (die horen bij de coördinator). Er is niets gecommit, gepusht of gedeployed, en `main` en de root-app zijn niet gewijzigd.

## Opgeleverde onderdelen

- **Drie aparte layouts.**
  - Licht: grote gecentreerde kop, brede foto met overlappende telefoon, functietabs met podium, editoriale split en een foto-CTA.
  - Warm: editoriale split met boogvormige foto, serif met cursieve accenten, salie en crème, doelgroeptabs en een stappenkaart.
  - Donker: sportfoto over de volle breedte in grafiet en lei, genummerde rijen, een app-module als band en een afsluitend paneel.
- **Header.** Ankers naar De app, Voor praktijken en Vragen; een conceptwisselaar 01/02/03/Alle met `aria-current`; een knop Kennismaken. Onder 1080 px is er een mobiel menu met `aria-expanded`. Escape sluit het menu en zet de focus terug op de menuknop. Klik buiten het menu of op een link sluit het ook, en de Tab-toets blijft binnen het open menu.
- **App-rondleiding** als native `<dialog>`:
  - 3 schermen (app-02, app-03, app-04);
  - knoppen Vorige en Volgende, staptekens met `aria-current="step"` en navigatie met de pijltjestoetsen;
  - Escape, de sluitknop of een klik op de achtergrond sluit het venster, en de focus gaat terug naar de knop waarmee het werd geopend.
- **Contactvenster:**
  - formulier met validatie: foutmeldingen via `aria-invalid` en `aria-describedby`, en de focus springt naar het eerste foute veld;
  - maakt een gecodeerde `mailto:info@passionforhealth.nl` met `encodeURIComponent` voor onderwerp en tekst, plus een voorbeeld van het bericht;
  - er wordt niets verstuurd of opgeslagen.
- **Functietabs (licht) en doelgroeptabs (warm).** Volgen het ARIA-tabspatroon met de pijltjestoetsen en Home/End. Het tabpaneel werkt `aria-labelledby` bij.
- **Rondleidingen in de pagina (warm en donker).** Met pijlknoppen, teller en staptekens.
- **Demolabel.** Een klein label "DEMOGEGEVENS" staat op elk app-scherm, ook op de minitelefoons in de hub. In de footer en de rondleiding staat ook een vermelding.
- **Copy.** Geen verzonnen statistieken of testimonials. De nieuwe tekst is in het Nederlands.

## Controles (lokaal uitgevoerd, Chrome headless via CDP)

- `node --check app.js` geeft OK.
- **Overloop.** 4 pagina's × 7 breedtes (375, 414, 768, 900, 1024, 1280, 1440). Tijdens de meting stond `overflow-x: clip` uit. Er was geen horizontale overloop, geen element buiten beeld en geen kapotte afbeelding.
- **Interactie** op licht, warm en donker, bij 1280 en 375 px:
  - menu openen en sluiten met Escape, waarna de focus terug is op de menuknop;
  - rondleiding openen en bladeren met de pijltjestoetsen, 1→2→3 met wisselend beeld;
  - Escape sluit en zet de focus terug;
  - contactformulier: een lege verzending geeft een fout met focus op Naam, een geldige verzending geeft een gecodeerde mailto en een zichtbaar resultaat, en Escape zet de focus terug;
  - functietabs (pijl, End, doorlopen) en doelgroeptab (pijl) werken;
  - de rondleiding in de pagina gaat vooruit en loopt achteruit rond.
- Er waren geen JavaScript-fouten in de console.
- **Tijdens het controleren hersteld:**
  - het resultaatblok van het contactvenster was zichtbaar ondanks `hidden`, opgelost met een globale `[hidden]`-regel;
  - het witte P+-logo was onzichtbaar op een witte achtergrond in het donkere thema en op de hubkaart;
  - de uitsnede van de krachtfoto sneed de sporter af.
- Screenshots zijn alleen visueel beoordeeld voor desktop (1440) en mobiel (375).

## Herstelronde na REVIEW.md (Codex: CHANGES)

| Punt | Status |
|---|---|
| 1. Wit logo onzichtbaar (donker thema, donkere hubkaart, footer) | Was al opgelost en staat nog in het bestand. `.theme-dark .brand-icon` en `.concept-card-dark .mini-brand img` hebben een donkere achtergrond (`#26323a`); de footer gebruikt dezelfde `.brand-icon`. Het logobestand is niet gewijzigd. |
| 2. `hidden` overschreven door `.contact-result` | Was al opgelost en staat nog in het bestand: `[hidden] { display: none !important; }`. |
| 3. Hero van het lichte concept te hoog | Aangepast: h1 `clamp(2.7rem, 6.3vw, 6.4rem)`, `.light-hero` padding-top `clamp(32px, 3.4vw, 45px)`, gap 24px, marge tot de foto `clamp(32px, 3vw, 42px)`. |
| 4. Intro van de hub te hoog | Aangepast: h1 `clamp(2.6rem, 4.8vw, 4.6rem)`, `.hub-main` padding-top 40px, `.hub-heading` margin-bottom 40px. De typografie op de conceptpagina's zelf is niet verkleind. |

Opnieuw gecontroleerd: `node --check app.js` geeft OK. Op verzoek is de browsersuite niet opnieuw gedraaid; de hoogte boven de vouw is bij punt 3 en 4 dus niet in een browser gemeten. De coördinator test de eindbestanden onafhankelijk.

## Open en niet getest

- Echte iOS/Android-apparaten, Safari/Firefox en schermlezers zijn niet getest. Alleen Chromium headless is gebruikt.
- Of `mailto:` daadwerkelijk een e-mailprogramma opent hangt af van het apparaat en is niet getest.
- Een FAQ-knop in een gesloten `<details>` kan geen focus krijgen. Dat is alleen in de test opgevallen; voor gebruikers is zo'n knop pas klikbaar als het item open is, en dan werkt het focusherstel wel.
- Onafhankelijke review (Codex) moet nog plaatsvinden.
