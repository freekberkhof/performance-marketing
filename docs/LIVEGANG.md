# Performance Plus website — overdracht aan Kaylee

29 oktober 2026. Zwarte website met privacy, contact en account verwijderen. De laatste goedgekeurde verhoudingen en teksten zijn behouden. Dit is een releasevoorstel op basis van `main`; er is niets naar de hoofdbranch gemerged of op het eigen domein gepubliceerd.

## Wat klaarstaat

- De website op `/`, inclusief de appflow, het plusmenu, grafieken en demoaanvraag per e-mail.
- `/privacy`: gegevens, doelen, rollen, bewaartermijnen, rechten en contact.
- `/contact`: hulp, praktijkdemo en `info@performanceplus.nl`.
- `/account-deletion`: uitleg over Instellingen → Account verwijderen en een verzoek per e-mail zonder de app opnieuw te installeren.
- Footerlinks op alle vier pagina’s, inclusief de backlink naar [Fysiotherapie Passion For Health](https://www.passionforhealth.nl/).
- Lokale lettertypen, afbeeldingen en scripts; geen nieuwe analytics of formulierenservice. De demoaanvraag en het verwijderverzoek openen het e-mailprogramma van de bezoeker. De website verstuurt zelf niets.

## In dit project

De goedgekeurde website staat in `public/website/`. `next.config.ts` geeft de vier vaste routes vóór de oorspronkelijke Next-pagina door aan die HTML-bestanden. Dit levert de volledige pagina op, zonder iframe of dubbele React/Lenis-animatie. De bestaande componenten blijven beschikbaar voor een latere omzetting naar React.

- Tekst en pagina-opbouw: `public/website/index.html`, `privacy.html`, `contact.html`, `account-deletion.html`.
- Vormgeving: `styles.css`, `dark.css` en voor de drie extra pagina’s `support.css`.
- Bediening en beweging: `app.js`.
- Afbeeldingen en lettertypen: `public/website/assets/`.
- Sitemap: `app/sitemap.ts`. Canonical- en deelmetadata verwijzen naar `https://performanceplus.nl`.

Er zijn geen nieuwe runtimepackages of omgevingsvariabelen nodig. Het project gebruikt de bestaande Next-server; kies niet voor `output: "export"`, want dan werken de rewrites niet. De lichte concepten en de eerdere white-labelvoorbeelden zijn niet opgenomen in deze release.

## Lokaal en live

```sh
npm ci
npm run typecheck
npm run build
node scripts/verify-website.mjs
npm run start
```

Op Windows PowerShell kan `npm.cmd` nodig zijn als het uitvoeren van `npm.ps1` niet is toegestaan.

1. Bekijk deze branch en de controles hieronder. Bevestig de nog openstaande punten rond gegevensverwerking en verwijderen.
2. Open [de vergelijking op GitHub](https://github.com/freekberkhof/performance-marketing/pull/new/release/performanceplus-website-20261029), maak de pull request aan en merge naar `main` wanneer de inhoud klopt. De releasebranch is gepusht; de gebruikte GitHub-koppeling had geen recht om de pull request te openen.
3. Laat de bestaande Next-hosting `npm run build` uitvoeren en via de normale productieflow publiceren. Koppel `performanceplus.nl` met HTTPS aan dat project.
4. Open na publicatie de vier pagina’s zonder ingelogde sessie, ook op een telefoon. Test het menu, de appstappen, het plusje en de footerlinks.
5. Controleer of een handmatig verzonden testmail op `info@performanceplus.nl` aankomt. Er is tijdens deze oplevering geen e-mail verstuurd.

Gebruik na livegang:

| Doel | URL |
| --- | --- |
| Website / marketing | https://performanceplus.nl |
| Privacybeleid | https://performanceplus.nl/privacy |
| Support / contact | https://performanceplus.nl/contact |
| Account verwijderen | https://performanceplus.nl/account-deletion |

Dit zijn de ingestelde productieroutes. De domeinkoppeling en bereikbaarheid op het eigen domein moeten bij livegang worden bevestigd. Voor de App Store en Google Play moeten ook de privacy-/Data safety-antwoorden overeenkomen met de werkelijk gepubliceerde app.

## Nog bevestigen voor productie

### Account verwijderen: toegang stoppen is nog geen gegevens wissen

De actuele backendbron in `performance-admin` is gecontroleerd op 29 oktober 2026:

- `ClientAccountDeletionController.php` neemt `current_password` en bevestiging aan via `POST /api/v1/client/account/deletion-request`.
- `AccountDeletionRequestService::request` deactiveert het account, trekt sessies en tokens in en maakt een verzoek voor de praktijk.
- `AccountDeletionRequestService::complete` houdt het account inactief, maakt het wachtwoord onbruikbaar en markeert het verzoek als afgehandeld. **Deze methode verwijdert geen persoonsgegevens of gekoppelde appgegevens.**

De website beschrijft daarom een verwijderverzoek en verdere afhandeling door de praktijk. Voor een werkend verwijderproces moet er daarnaast een aantoonbare afhandeling zijn die accountgegevens en niet meer noodzakelijke appgegevens echt verwijdert. Gegevens die verplicht bewaard moeten blijven moeten afzonderlijk worden onderbouwd. Een bewaarplicht voor het behandeldossier is geen algemene vrijstelling voor alle appdata.

Test met een apart testaccount: verzoek starten, opnieuw inloggen geblokkeerd, verzoek ontvangen, benodigde gegevens daadwerkelijk verwijderen of apart rechtmatig bewaren, bericht aan de gebruiker en controle van resterende kopieen/back-ups. Markeer een verzoek pas als afgerond nadat dit is uitgevoerd. In deze websitewijziging is de backend niet aangepast en zijn geen accounts verwijderd.

Kaylee geeft aan dat de knop onder Instellingen aanwezig is. De bekeken `performance-app/main` bevatte die knop nog niet. Controleer dus de exacte iOS-/Android-build die je indient en publiceer eerst de bijbehorende appbron. De website volgt de bevestigde backendvelden en die opgegeven menuplaats.

### Privacy en beheer

De verklaring sluit aan op de zichtbare productfuncties en de wettelijke uitgangspunten, maar de volgende bedrijfs-/hostinggegevens zijn niet volledig uit de broncode vast te stellen:

- Bevestig Fysiotherapie Passion For Health B.V. als juiste contactorganisatie en leg vast wie verwerkingsverantwoordelijke en verwerker zijn per praktijk.
- Vul de actuele hosting-, e-mail- en andere relevante leveranciers, opslaglanden, eventuele doorgiftewaarborgen en concrete log-/back-uptermijnen aan. De oudere appprivacy noemt nog Supabase/Vercel; die claims zijn niet overgenomen omdat ze niet zijn bevestigd voor de actuele Laravel-omgeving.
- Bevestig de rechtsgrond en eventuele toestemming voor gezondheidsgegevens bij Performance-gebruik buiten een behandelrelatie.
- Leg vast wie privacy- en verwijderverzoeken via `info@performanceplus.nl` ontvangt en binnen de toepasselijke termijn afhandelt.

De privacytekst is geen bevestiging dat deze organisatorische afspraken al bestaan. Laat de verantwoordelijke de tekst en deze punten controleren voordat je het eigen domein als definitief privacybeleid bij de appstores opgeeft.

## Validatie

Uitgevoerd op 29 oktober 2026:

- `npm run typecheck` en `npm run build`: geslaagd op de laptop.
- `node scripts/verify-website.mjs`: vier routes geven HTTP 200 met exact de bedoelde HTML, canonical en footerlinks. Alle 13 gebruikte lokale resources laden met de juiste bytes. Sitemap, robots en een ontbrekende pagina (404) gecontroleerd. De tijdelijke productieserver wordt daarna gestopt.
- Alle 19 websitebestanden op de laptop komen qua SHA-256 overeen met de voorbereide release.
- Browsercontrole van de nieuwe pagina’s op desktop en op 320, 375 en 412 px: geen horizontale overloop, mobiel menu en paginanavigatie werken.
- Interne links, unieke IDs, ARIA-doelen, lokale bestanden en JavaScript-syntax gecontroleerd. De vier bestaande datagrafieken en de appbediening zijn ongewijzigd.
- Geen fysieke iPhone-/Android-test, echte persoonsgegevens, verzonden e-mail of verwijderde accounts.

Terugdraaien kan door deze pull request te reverten en opnieuw te deployen. De oorspronkelijke Next-componenten zijn behouden.

## Bronnen bij de nieuwe pagina’s

Geraadpleegd op 29 oktober 2026. De productcode bepaalt de beschreven werking; onderstaande bronnen bepalen de randvoorwaarden. Er is geen App Store-goedkeuring vastgesteld.

- [Apple: account deletion](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion): in de app te starten; alleen deactiveren is niet voldoende; wettelijk noodzakelijke bewaring is een uitzondering.
- [Google Play: account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111): een route in de app en een publiek webadres om een verwijderverzoek te starten.
- [Autoriteit Persoonsgegevens: recht op informatie](https://autoriteitpersoonsgegevens.nl/nl/zelf-doen/privacyrechten/recht-op-informatie).
- [Autoriteit Persoonsgegevens: recht op vergetelheid](https://autoriteitpersoonsgegevens.nl/nl/zelf-doen/privacyrechten/recht-op-vergetelheid).
- [Rijksoverheid: medisch dossier bewaren](https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/rechten-van-patient-en-privacy/uw-medisch-dossier/bewaren-medisch-dossier).
- [Next.js: rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites).
