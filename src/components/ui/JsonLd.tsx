import { SITE, TESTS, TEST_PACKAGE } from "@/lib/site";

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
        // The profiles that are the same business. This is what lets Google
        // treat the site, the Facebook page and the channel as one entity.
        sameAs: [SITE.social.facebook, SITE.social.youtube],
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
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.address.geo.lat,
          longitude: SITE.address.geo.lng,
        },
        hasMap: SITE.address.mapsUrl,
        paymentAccepted: "Cash, Credit Card, Debit Card, bKash, Bangla QR",
        availableService: [
          {
            "@type": "MedicalTest",
            name: "Pure Tone Audiometry (PTA)",
            offers: { "@type": "Offer", priceCurrency: "BDT", price: String(TESTS[0].fee) },
          },
          {
            "@type": "MedicalTest",
            name: "Tympanometry",
            offers: { "@type": "Offer", priceCurrency: "BDT", price: String(TESTS[1].fee) },
          },
          {
            "@type": "MedicalTest",
            name: "Speech Reception Threshold (SRT)",
            offers: { "@type": "Offer", priceCurrency: "BDT", price: String(TESTS[2].fee) },
          },
          {
            "@type": "MedicalTest",
            name: "Full hearing assessment (PTA, tympanometry and speech)",
            offers: { "@type": "Offer", priceCurrency: "BDT", price: String(TEST_PACKAGE.fee) },
          },
          { "@type": "Service", name: "Hearing aid fitting and verification" },
          { "@type": "Service", name: "Ear mould making" },
          { "@type": "Service", name: "ReSound hearing aid repair and servicing" },
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

/**
 * Breadcrumbs. Google renders these in place of the raw URL in the result,
 * which on a 109-page catalogue is the difference between a result that
 * reads "sensohearingdhaka.com › hearing-aids › resound-nexia-461" and one
 * that reads as a path a person understands.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  if (!items.length) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
