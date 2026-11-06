/**
 * FAQ content. Kept out of the "use client" FAQ component so the home
 * page can reuse it verbatim for the FAQPage structured data.
 */
export type QA = { question: string; answer: string };

export const FAQS: readonly QA[] = [
  {
    question: "Wat is Perform+?",
    answer:
      "Perform+ bestaat uit twee delen: een praktijkportaal waarin je trajecten, fases en oefenprogramma's opbouwt, en een app waarin je cliënt die sessies uitvoert, oefeningen afvinkt en check-ins invult. Jij ziet in het portaal terug wat je cliënt in de app doet.",
  },
  {
    question: "Voor wie is het bedoeld?",
    answer:
      "Voor fysiotherapiepraktijken die cliënten begeleiden van klacht naar doel. De praktijk neemt Perform+ af. Behandelaars en praktijkbeheerders werken in het portaal, en cliënten krijgen van de praktijk een uitnodiging voor de app. Zonder uitnodiging kun je geen account aanmaken.",
  },
  {
    question: "Hoe zit het met revalidatie versus performance?",
    answer:
      "Beide vallen onder hetzelfde traject. Een traject bestaat uit fases, en per fase wijs je een programma toe uit je bibliotheek. Dat programma kan uit de categorie revalidatie of performance komen. Je cliënt blijft in hetzelfde dossier.",
  },
  {
    question: "Wat vult een cliënt in na een sessie?",
    answer:
      "Een korte check-in: pijn tijdens en na de training, RPE (hoe zwaar het voelde), motivatie en eventueel een notitie voor jou. Daarnaast vult je cliënt elke dag een check-in in over slaap, stress, pijn en spierpijn. De app berekent daaruit een herstelscore.",
  },
  {
    question: "Krijg ik een melding als het misgaat?",
    answer:
      "Ja. Je krijgt in het portaal een melding van elke afgeronde sessie en ingevulde check-in. Geeft je cliënt een pijnscore van 7 of hoger, dan staat die melding bovenaan, met locatie en score. De app is geen spoedkanaal. Voor spoed gelden de afspraken van je praktijk.",
  },
  {
    question: "Geeft de app trainingsadvies aan mijn cliënt?",
    answer:
      "Nee. De herstelscore is een signaal voor jou, en jij beslist of je cliënt traint. De app stuurt je cliënt geen adviezen. Meldingen komen alleen bij jou in het portaal binnen.",
  },
  {
    question: "Waar staan de gegevens?",
    answer:
      "Bij een gecertificeerde host binnen de EU. De opzet volgt NEN 7510, 7512 en 7513. Het systeem legt elke inzage in dossiers en programma's vast in een auditlog die niemand achteraf kan wijzigen of verwijderen. Gezondheidswaarden komen niet in die logs.",
  },
  {
    question: "Moet ik mijn bestaande schema's opnieuw invoeren?",
    answer:
      "Je bouwt je oefeningen en templates één keer op in je eigen praktijkbibliotheek; daarna wijs je ze met twee klikken toe. Heeft je praktijk veel bestaande schema's, dan helpen we met overzetten. Dat bespreken we in de demo.",
  },
  {
    question: "Is dit een afgerond product?",
    answer:
      "Perform+ draait als pilotversie, en dat staat in de app. We verbeteren het op basis van gebruik en feedback van de praktijken die meedraaien, en bepalen samen met hen welke functies er volgen.",
  },
];
