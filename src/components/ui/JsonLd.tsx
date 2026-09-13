import { SITE } from "@/lib/site";
import type { Clinic } from "@/routes/clinic";
import { say, type Test } from "@/routes/details";

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

/** Schema.org day names, indexed the way JavaScript indexes weekdays. */
const DAY_OF_WEEK = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
] as const;

const atHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

/**
 * One specification per distinct span, with the days that share it grouped.
 *
 * Built from the clinic's own hours rather than written out, because hours
 * that disagree with the visible page are worse than no structured data at
 * all: Google reads the mismatch as a reason to trust neither.
 */
function openingHours(hours: Clinic["hours"]) {
  const spans = new Map<string, { opens: string; closes: string; days: string[] }>();

  for (let day = 0; day < 7; day++) {
    const span = hours[day];
    if (!span || span.length < 2) continue;

    const key = `${span[0]}-${span[1]}`;
    const existing = spans.get(key);
    if (existing) {
      existing.days.push(DAY_OF_WEEK[day]);
      continue;
    }
    spans.set(key, {
      opens: atHour(span[0]),
      closes: atHour(span[1]),
      days: [DAY_OF_WEEK[day]],
    });
  }

  return Array.from(spans.values()).map((span) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: span.days,
    opens: span.opens,
    closes: span.closes,
  }));
}

export function ClinicJsonLd({ clinic, tests }: { clinic: Clinic; tests: Test[] }) {
  // The address, phones and hours here are the same ones the footer prints.
  // Structured data that disagrees with the visible page is worse than none:
  // Google treats the mismatch as a reason to trust neither.
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": CLINIC_ID,
        name: clinic.name,
        alternateName: clinic.nameBn,
        medicalSpecialty: "Otolaryngologic",
        url: clinic.url,
        // The profiles that are the same business. This is what lets Google
        // treat the site, the Facebook page and the channel as one entity.
        sameAs: [clinic.social.facebook, clinic.social.youtube],
        telephone: clinic.phones[0],
        email: clinic.email,
        knowsLanguage: ["bn", "en"],
        currenciesAccepted: "BDT",
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.address.line,
          addressLocality: clinic.address.city,
          postalCode: clinic.address.postcode,
          addressCountry: clinic.address.country,
        },
        areaServed: { "@type": "Country", name: "Bangladesh" },
        openingHoursSpecification: openingHours(clinic.hours),
        geo: {
          "@type": "GeoCoordinates",
          latitude: clinic.address.geo.lat,
          longitude: clinic.address.geo.lng,
        },
        hasMap: clinic.address.mapsUrl,
        paymentAccepted: "Cash, Credit Card, Debit Card, bKash, Bangla QR",
        // English names, whatever the page's language: this is read by a
        // crawler, not by a visitor.
        availableService: [
          ...tests.map((test) => ({
            "@type": "MedicalTest",
            name: say(test.name, "en"),
            offers: {
              "@type": "Offer",
              priceCurrency: "BDT",
              price: String(test.fee),
            },
          })),
          {
            "@type": "MedicalTest",
            name: "Full hearing assessment",
            offers: {
              "@type": "Offer",
              priceCurrency: "BDT",
              price: String(clinic.testPackage.fee),
            },
          },
          { "@type": "Service", name: "Hearing aid fitting and verification" },
          { "@type": "Service", name: "Ear mould making" },
          {
            "@type": "Service",
            name: `${clinic.dealer.brand} hearing aid repair and servicing`,
          },
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
