import { FAQS } from "@/lib/faq-data";
import { siteConfig } from "@/lib/metadata";

const { company, url } = siteConfig;
const orgId = `${url}/#organization`;

/**
 * JSON-LD for the home page. No offers or ratings: Perform+ runs as a free
 * pilot and has no public reviews.
 */
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: company.legalName,
      legalName: company.legalName,
      alternateName: company.tradeName,
      url,
      email: siteConfig.email,
      logo: {
        "@type": "ImageObject",
        url: `${url}/icon-512.png`,
        width: 512,
        height: 512,
      },
      address: {
        "@type": "PostalAddress",
        ...company.address,
      },
      identifier: {
        "@type": "PropertyValue",
        propertyID: "KvK",
        value: company.kvk,
      },
      brand: { "@type": "Brand", name: siteConfig.name },
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      name: siteConfig.name,
      url,
      inLanguage: "nl",
      publisher: { "@id": orgId },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${url}/#software`,
      name: siteConfig.name,
      description: siteConfig.description,
      url,
      applicationCategory: "HealthApplication",
      applicationSubCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      inLanguage: "nl",
      image: `${url}/opengraph-image`,
      publisher: { "@id": orgId },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}/#faq`,
      inLanguage: "nl",
      mainEntity: FAQS.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

/** Serialise for a <script type="application/ld+json"> tag. */
export function toJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
