import type { Metadata } from "next";

export const siteConfig = {
  name: "Perform+",
  tagline: "Van revalidatie naar prestatie",
  description:
    "Perform+ is software voor fysiotherapiepraktijken. Bouw trajecten in fases op, je cliënt traint in de app en jij ziet na elke sessie pijn en belasting terug.",
  url: "https://performplus.nl",
  email: "info@performplus.nl",
  locale: "nl_NL",
  /** Dark page ground, matches `--page` in app/globals.css. */
  themeColor: "#151515",
  company: {
    legalName: "PassionForHealth B.V.",
    tradeName: "Fysiotherapie Passion For Health",
    kvk: "88144763",
    address: {
      streetAddress: "Van Zeggelenplein 5",
      postalCode: "2032 KA",
      addressLocality: "Haarlem",
      addressCountry: "NL",
    },
  },
  keywords: [
    "fysiotherapie software",
    "praktijksoftware fysiotherapie",
    "revalidatie app",
    "oefenprogramma app",
    "trainingsschema fysiotherapie",
    "sportrevalidatie",
    "cliënt app fysiotherapie",
    "check-in na training",
  ],
} as const;

export const ogImage = {
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.tagline.toLowerCase()}`,
} as const;

/*
 * Social images come from the file conventions app/opengraph-image.tsx and
 * app/twitter-image.tsx, and icons from app/favicon.ico, app/icon.png and
 * app/apple-icon.png. Next injects those tags itself, so they are not
 * repeated here.
 */
const openGraphBase = {
  type: "website",
  locale: siteConfig.locale,
  siteName: siteConfig.name,
} as const;

const twitterBase = {
  card: "summary_large_image",
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.company.legalName, url: siteConfig.url }],
  creator: siteConfig.company.legalName,
  publisher: siteConfig.company.legalName,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    ...openGraphBase,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    ...twitterBase,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

/**
 * Per-page metadata. Next replaces `openGraph` and `twitter` as a whole
 * when a page sets them (the root opengraph-image is then dropped too), so
 * the shared fields and the generated social image are set again here.
 */
export function createMetadata({
  title,
  absoluteTitle = false,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  /** Use `title` as-is, without the "| Perform+" template. */
  absoluteTitle?: boolean;
  description?: string;
  path?: string;
  /** Optional override; defaults to the generated opengraph-image. */
  image?: { url: string; width: number; height: number; alt: string };
  noIndex?: boolean;
}): Metadata {
  const socialTitle = title
    ? absoluteTitle
      ? title
      : `${title} | ${siteConfig.name}`
    : siteConfig.name;

  return {
    ...(title && { title: absoluteTitle ? { absolute: title } : title }),
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      ...openGraphBase,
      title: socialTitle,
      description,
      url: path,
      images: [image ?? { url: "/opengraph-image", ...ogImage }],
    },
    twitter: {
      ...twitterBase,
      title: socialTitle,
      description,
      images: [image ?? { url: "/twitter-image", ...ogImage }],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
