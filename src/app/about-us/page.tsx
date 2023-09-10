import Hero from "@/components/About/heroSection";
import History from "@/components/About/historySection";
import Mission from "@/components/About/missionSection";
import { getCompanyAbout } from "@/routes/company";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Senso hearing centre is the best hearing centre in Bangladesh. Senso Hearing Centre, Dhaka is one of the largest and reputed Hearing centre in Bangladesh. We pride our self at this side for 15 years. We assure your best hearing healthcare. We offer good price range of hearing aids in Bangladesh.",
  keywords: [
    "hearing",
    "aids aid",
    "aids hearing",
    "which hearing aids",
    "about hearing aids",
    "aids for hearing",
    "where to get hearing aids what is hearing aids",
    "what is a hearing aids hearing aids hearing aids",
    "for hearing aids",
    "hearing aids",
    "what are hearing aids",
    "aid hearing",
    "which hearing aid",
    "the hearing aid",
    "what is hearing aid",
    "hearing aid in",
    "hearing aid",
    "what is an hearing aid",
    "what is a hearing aid",
    "a hearing aid",
    "compare prices",
    "hearing loss",
    "hearing impaired",
    "hearing devices",
    "hearingaids",
    "hearing aid devices hearingaid",
    "resound",
    "hearing device",
    "re sound",
    "hearing aid device",
    "test hearing",
    "where can i get a hearing test how to test hearing",
  ],
  verification: {
    google: "D7V9ovCzKzcomUagIaPLjeDIrdnGWmw01YTBshq8gYY",
  },
  openGraph: {
    title: "About us || Senso Hearing Centre",
    description:
      "Senso hearing centre is the best hearing centre in Bangladesh. Senso Hearing Centre, Dhaka is one of the largest and reputed Hearing centre in Bangladesh. We pride our self at this side for 15 years. We assure your best hearing healthcare. We offer good price range of hearing aids in Bangladesh.",
    url: "https://sensohearingdhaka.com/hearing-aids",
    siteName:
      "Senso Hearing Centre || Best Hearing centre in Dhaka, Bangladesh",
    images: [
      {
        url: "https://sensohearingdhaka.com/assets/Images/temp/Business_Excellence_award_2019.jpeg",
        width: 800,
        height: 600,
        alt: "senso hearing centre is the best hearing centre in Bangladesh. Getting Business Excellence award in 2019",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
  },
  manifest: "./manifest.webmanifest",
  category: "Hearing Aids Shop",
};

export default async function About() {
  const companyAboutData = getCompanyAbout();
  const about = await Promise.resolve(companyAboutData);

  return (
    <div>
      <Hero about={about.data} />
      <Mission />
      {/* <History /> */}
    </div>
  );
}
