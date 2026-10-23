import { LogoMark } from "@/components/logo";
import {
  Bell,
  ChevronRight,
  LayoutGrid,
  LibraryBig,
  Mail,
  MessageCircle,
  PanelLeft,
  Pencil,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

type NavItem = { label: string; icon: LucideIcon; active?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Cliënten", icon: Users, active: true },
  { label: "Trainingstemplates", icon: LibraryBig },
  { label: "Team", icon: Users },
  { label: "Meldingen", icon: Bell },
];

type Ring = {
  label: string;
  value: string;
  sub: string;
  fraction: number;
  color: string;
};

/** Metric colours mirror the app: voortgang teal, belasting blauw. */
const RINGS: Ring[] = [
  {
    label: "Voortgang",
    value: "19%",
    sub: "6 van 32 sessies",
    fraction: 0.19,
    color: "#65d8ce",
  },
  {
    label: "Belasting",
    value: "7.5",
    sub: "Gem. RPE",
    fraction: 0.75,
    color: "#8dcaf2",
  },
  {
    label: "Motivatie",
    value: "6.0",
    sub: "Gem. score",
    fraction: 0.6,
    color: "#4caf8f",
  },
];

const DETAILS: [string, string][] = [
  ["Sport", "Tennis"],
  ["Klacht", "VKB rechts"],
  ["Doel", "Terug op de baan"],
  ["Plan", "Fase 2"],
  ["Behandelaar", "Freek Berkhof"],
  ["Gestart", "09-05-2026"],
];

function Sidebar(): ReactNode {
  return (
    <aside className="border-border/60 bg-muted/20 hidden w-[216px] shrink-0 flex-col border-r lg:flex">
      <div className="border-border/60 flex h-[66px] items-center gap-2.5 border-b px-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171b24]">
          <LogoMark className="h-4 w-4 bg-white" />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[13px] font-semibold tracking-tight">
            PFH Performance
          </span>
          <span className="text-muted-foreground truncate text-[11px]">
            Passion For Health
          </span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => (
          <span
            key={item.label}
            className={`flex items-center gap-2.5 rounded-full px-3 py-2 text-[13px] transition-colors ${
              item.active
                ? "text-foreground bg-[#65d8ce]/12 font-medium"
                : "text-muted-foreground"
            }`}
          >
            <item.icon
              className="h-[15px] w-[15px] shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            {item.label}
          </span>
        ))}
      </nav>

      <div className="border-border/60 flex items-center gap-2.5 border-t p-3">
        <span className="bg-foreground text-background grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold">
          KV
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[12px] font-medium">Kaylee V.</span>
          <span className="text-muted-foreground truncate text-[11px]">
            Therapeut + admin
          </span>
        </span>
      </div>
    </aside>
  );
}

function Topbar(): ReactNode {
  return (
    <div className="border-border/60 flex h-[66px] shrink-0 items-center gap-3 border-b px-4 sm:px-5">
      <PanelLeft
        className="text-muted-foreground h-4 w-4 shrink-0"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span className="bg-border h-5 w-px" aria-hidden="true" />
      <span className="truncate text-sm font-medium tracking-tight">
        Frans Broekhof
      </span>
    </div>
  );
}

function Breadcrumb(): ReactNode {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-5">
      <span className="text-muted-foreground flex items-center gap-1 text-[13px]">
        Cliënten
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-foreground font-medium">Frans Broekhof</span>
      </span>

      <div className="flex items-center gap-3">
        <span className="border-border/60 flex items-center gap-2 rounded-full border px-3 py-1.5">
          <span className="text-muted-foreground text-[11px]">VKB rechts</span>
          <span className="bg-foreground text-background rounded-full px-2 py-0.5 text-[10px] font-semibold">
            Actief
          </span>
        </span>
        <span className="text-muted-foreground hidden text-[11px] font-medium sm:inline">
          Traject afronden
        </span>
      </div>
    </div>
  );
}

function Tabs(): ReactNode {
  const tabs = ["Overzicht", "Programma's", "Plan", "Sessies"];
  return (
    <div className="border-border/60 mt-3 flex shrink-0 items-center gap-6 border-b px-4 sm:px-5">
      {tabs.map((t, i) => (
        <span
          key={t}
          className={`-mb-px border-b-2 pb-2.5 text-[12px] font-medium ${
            i === 0
              ? "border-foreground text-foreground"
              : "text-muted-foreground border-transparent"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function RingCard({ ring }: { ring: Ring }): ReactNode {
  const size = 78;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="border-border/60 bg-muted/30 flex flex-col items-center rounded-xl border px-3 py-4">
      <span className="relative block" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={ring.color}
            strokeOpacity="0.2"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={ring.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${c * ring.fraction} ${c}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold tracking-tight tabular-nums">
          {ring.value}
        </span>
      </span>
      <span className="text-muted-foreground mt-3 text-[10px] font-semibold tracking-[0.12em] uppercase">
        {ring.label}
      </span>
      <span className="text-muted-foreground mt-1 text-[11px]">{ring.sub}</span>
    </div>
  );
}

function AttentionCard(): ReactNode {
  const flags: { label: string; detail: string; critical?: boolean }[] = [
    { label: "Hoge pijnscore", detail: "Pijn na sessie: 8", critical: true },
    { label: "Hoge RPE", detail: "RPE: 8", critical: true },
    { label: "Weinig check-ins", detail: "6 van 32 opgeslagen" },
  ];

  return (
    <div className="border-border/60 bg-muted/30 rounded-xl border p-4">
      <h3 className="text-[13px] font-semibold tracking-tight">
        Aandacht nodig
      </h3>
      <ul className="mt-3 flex flex-col gap-2.5">
        {flags.map((f) => (
          <li key={f.label} className="flex flex-wrap items-center gap-2.5">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                f.critical
                  ? "bg-[#e84a5f]/85 text-white"
                  : "border-border/60 text-muted-foreground border"
              }`}
            >
              {f.label}
            </span>
            <span className="text-muted-foreground text-[11px]">
              {f.detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckInCard(): ReactNode {
  const bars = [62, 48, 0, 71, 0, 55, 0, 0, 68, 74, 0, 81];

  return (
    <div className="border-border/60 bg-muted/30 flex min-h-0 flex-col rounded-xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.12em] uppercase">
            Herstel &amp; check-ins
          </p>
          <h3 className="mt-1 text-[13px] font-semibold tracking-tight">
            Dagelijkse check-in
          </h3>
        </div>
        <span className="border-border/60 text-muted-foreground shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium">
          Vandaag niet ingevuld
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1 rounded-full bg-white/[0.06] p-0.5">
        {["Dag", "Week", "Maand", "Jaar"].map((r, i) => (
          <span
            key={r}
            className={`flex-1 rounded-full py-1 text-center text-[11px] font-medium ${
              i === 0
                ? "bg-foreground text-background"
                : "text-muted-foreground"
            }`}
          >
            {r}
          </span>
        ))}
      </div>

      <div className="mt-4 flex min-h-0 flex-1 items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-[3px] ${h === 0 ? "bg-border" : ""}`}
            style={
              h === 0
                ? { height: "6%" }
                : { height: `${h}%`, background: "#65d8ce", opacity: 0.85 }
            }
          />
        ))}
      </div>
    </div>
  );
}

function ClientRail(): ReactNode {
  return (
    <div className="hidden w-[232px] shrink-0 flex-col gap-3 xl:flex">
      <div className="border-border/60 bg-muted/30 flex flex-col items-center rounded-xl border p-4">
        <span
          className="grid h-16 w-16 place-items-center rounded-full text-lg font-semibold text-[#07332e]"
          style={{ background: "#65d8ce" }}
        >
          FB
        </span>
        <p className="mt-3 text-[13px] font-semibold tracking-tight">
          Frans Broekhof
        </p>
        <p className="text-muted-foreground mt-0.5 truncate text-[11px]">
          f.broekhof@voorbeeld.nl
        </p>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="border-border/60 text-muted-foreground rounded-full border px-2.5 py-0.5 text-[10px] font-medium">
            Actief
          </span>
          <span className="border-border/60 text-muted-foreground rounded-full border px-2.5 py-0.5 text-[10px] font-medium">
            App actief
          </span>
        </div>

        <div className="mt-3 grid w-full grid-cols-2 gap-1.5">
          <span className="border-border/60 text-muted-foreground flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-[11px]">
            <MessageCircle className="h-3 w-3" aria-hidden="true" />
            WhatsApp
          </span>
          <span className="border-border/60 text-muted-foreground flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-[11px]">
            <Mail className="h-3 w-3" aria-hidden="true" />
            E-mail
          </span>
        </div>
        <span className="border-border/60 text-muted-foreground mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-lg border py-1.5 text-[11px]">
          <Pencil className="h-3 w-3" aria-hidden="true" />
          Bewerken
        </span>
      </div>

      <dl className="border-border/60 bg-muted/30 divide-border/50 flex flex-col divide-y rounded-xl border px-4">
        {DETAILS.map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between gap-3 py-2.5"
          >
            <dt className="text-muted-foreground text-[11px]">{k}</dt>
            <dd className="truncate text-[11px] font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function WindowMockup(): ReactNode {
  return (
    <div className="border-border/60 bg-background mx-auto max-w-[1100px] overflow-hidden rounded-2xl border shadow-2xl shadow-black/[0.08]">
      <div className="border-border/60 relative flex h-7 items-center border-b px-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-muted-foreground pointer-events-none absolute inset-x-0 text-center text-xs font-normal">
          Performance Plus · praktijkportaal
        </span>
      </div>

      <div className="flex h-[600px]">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <Breadcrumb />
          <Tabs />

          <main className="flex min-h-0 flex-1 gap-3 p-3 sm:p-4">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
              <div className="grid shrink-0 grid-cols-3 gap-3">
                {RINGS.map((ring) => (
                  <RingCard key={ring.label} ring={ring} />
                ))}
              </div>
              <AttentionCard />
              <CheckInCard />
            </div>

            <ClientRail />
          </main>
        </section>
      </div>
    </div>
  );
}
