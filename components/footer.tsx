import { CutButton } from "@/components/cut-button";
import { Logo } from "@/components/logo";
import { Instagram, Linkedin } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

type FooterLink = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Hoe het werkt", href: "#hoe-het-werkt" },
      { label: "Praktijkportaal", href: "#praktijkportaal" },
      { label: "Meldingen", href: "#meldingen" },
    ],
  },
  {
    title: "Praktijk",
    links: [
      { label: "Voor praktijken", href: "#praktijken" },
      { label: "Veiligheid en AVG", href: "#veiligheid" },
      { label: "Veelgestelde vragen", href: "#faq" },
      { label: "Support", href: "#support" },
    ],
  },
  {
    title: "Juridisch",
    links: [
      { label: "Privacyverklaring", href: "#privacy" },
      { label: "Algemene voorwaarden", href: "#voorwaarden" },
      { label: "Verwerkersovereenkomst", href: "#verwerkersovereenkomst" },
    ],
  },
];

function XIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "LinkedIn",
    href: "#linkedin",
    icon: (
      <Linkedin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
    ),
  },
  {
    label: "Instagram",
    href: "#instagram",
    icon: (
      <Instagram className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
    ),
  },
  {
    label: "X",
    href: "#x",
    icon: <XIcon className="h-3.5 w-3.5" />,
  },
];

const PANEL_CLIP =
  "polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)";

function Plus({ className }: { className: string }): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`text-foreground pointer-events-none absolute z-10 h-3.5 w-3.5 ${className}`}
    >
      <path
        d="M12 4v16M4 12h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FooterColumn({
  index,
  title,
  links,
  children,
}: {
  index: number;
  title: string;
  links: FooterLink[];
  children?: ReactNode;
}): ReactNode {
  const divided = index > 0;
  return (
    <div
      className={`relative md:px-8 ${divided ? "md:border-border md:border-l" : "md:pl-0"} ${
        index === 3 ? "md:pr-0" : ""
      }`}
    >
      {divided && (
        <>
          <Plus className="top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 md:block" />
          <Plus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 md:block" />
        </>
      )}

      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="focus-ring text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

export function Footer(): ReactNode {
  const clip = { clipPath: PANEL_CLIP } as CSSProperties;

  return (
    <footer className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-10">
      <div className="bg-border p-px" style={clip}>
        <div className="bg-background p-8 sm:p-10 lg:p-14" style={clip}>
          <Logo />

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-14 md:grid-cols-4 md:gap-x-0">
            {COLUMNS.map((col, i) => (
              <FooterColumn
                key={col.title}
                index={i}
                title={col.title}
                links={col.links}
              />
            ))}

            <FooterColumn
              index={3}
              title="Contact"
              links={[
                {
                  label: "info@performanceplus.nl",
                  href: "mailto:info@performanceplus.nl",
                },
              ]}
            >
              <div className="mt-6 flex flex-col items-start gap-2.5">
                <CutButton variant="solid" href="#demo">
                  Demo aanvragen
                </CutButton>
                <CutButton variant="outline" href="#inloggen">
                  Inloggen
                </CutButton>
              </div>
            </FooterColumn>
          </div>

          <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 pt-6 sm:flex-row sm:items-center md:mt-14">
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} PFH Performance. Performance Plus is
              een product van PFH Performance.
            </p>

            <div className="flex items-center gap-4">
              {SOCIALS.map((social, i) => (
                <div key={social.href} className="flex items-center gap-4">
                  {i > 0 && (
                    <span className="bg-border h-3.5 w-px" aria-hidden="true" />
                  )}
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="focus-ring text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {social.icon}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
