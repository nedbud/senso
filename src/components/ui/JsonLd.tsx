import { SITE } from "@/lib/site";

/**
 * Structured data. The site had none at all, which meant Google had no
 * machine-readable statement of what this business is, where it is, when it
 * is open, or what anything costs — despite every one of those facts being
 * available. Price in particular can surface directly in search results.
 */

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const CLINIC_ID = `${SITE.url}/#clinic`;

export function ClinicJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": CLINIC_ID,
        name: SITE.name,
        alternateName: SITE.nameBn,
        medicalSpecialty: "Otolaryngologic",
        url: SITE.url,
        telephone: SITE.phones[0],
        email: SITE.email,
        knowsLanguage: ["bn", "en"],
        currenciesAccepted: "BDT",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.line,
          addressLocality: SITE.address.city,
          postalCode: SITE.address.postcode,
          addressCountry: SITE.address.country,
        },
        areaServed: { "@type": "Country", name: "Bangladesh" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Saturday", "Sunday", "Monday",
              "Tuesday", "Wednesday", "Thursday",
            ],
            opens: "10:00",
            closes: "20:00",
          },
        ],
        availableService: [
          { "@type": "MedicalTest", name: "Pure Tone Audiometry (PTA)" },
          { "@type": "MedicalTest", name: "Tympanometry" },
          { "@type": "MedicalTest", name: "Speech Audiometry / SRT" },
          { "@type": "MedicalTest", name: "Otoacoustic Emissions (OAE)" },
          { "@type": "MedicalTest", name: "BERA / ABR" },
          { "@type": "Service", name: "Hearing aid fitting and verification" },
          { "@type": "Service", name: "Ear mould making" },
          { "@type": "Service", name: "Hearing aid repair and servicing" },
        ],
      }}
    />
  );
}

export function ProductJsonLd({
  name,
  image,
  description,
  price,
  brand,
  url,
}: {
  name: string;
  image?: string;
  description?: string;
  price: string;
  brand?: string;
  url: string;
}) {
  const value = Math.round(parseFloat(price || "0"));
  if (!value) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        image: image || undefined,
        description: description || undefined,
        brand: { "@type": "Brand", name: brand || "ReSound" },
        category: "Hearing aid",
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "BDT",
          price: String(value),
          availability: "https://schema.org/InStock",
          seller: { "@id": CLINIC_ID },
        },
      }}
    />
  );
}

export function ProductRangeJsonLd({
  low,
  high,
  count,
}: {
  low: number;
  high: number;
  count: number;
}) {
  if (!count) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "ReSound hearing aids in Bangladesh",
        brand: { "@type": "Brand", name: "ReSound" },
        category: "Hearing aid",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "BDT",
          lowPrice: String(low),
          highPrice: String(high),
          offerCount: String(count),
          seller: { "@id": CLINIC_ID },
        },
      }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  if (!items.length) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((i) => ({
          "@type": "Question",
          name: i.question,
          acceptedAnswer: { "@type": "Answer", text: i.answer },
        })),
      }}
    />
  );
}
