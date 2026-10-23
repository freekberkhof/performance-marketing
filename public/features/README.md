# Kaartfoto's

De drie kaarten in `components/features.tsx` verwachten hier:

- `01.jpg` — Eén traject, van klacht tot doel
- `02.jpg` — Je ziet wat er in de zaal gebeurt
- `03.jpg` — Compliance die je niet hoeft te regelen

Specificatie:

- Verhouding 4:3 (de kaart cropt met `object-cover`, dus iets afwijkend mag)
- Minimaal 1200 × 900 px
- Donkere, bijna monochrome gym-/sportfotografie in de stijl van de
  Performance Plus-shoot

De treatment (grayscale, contrast, donkerder in dark mode en een gradient
onderin) zit in `FeatureImage` in `components/features.tsx` — lever dus
gewoon de originele foto aan, niet een al bewerkte versie.
