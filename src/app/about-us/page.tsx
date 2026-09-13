import type { Metadata } from "next";
import { getCompanyAbout } from "@/routes/company";
import Hero from "@/components/About/heroSection";
import History from "@/components/About/historySection";
import Mission from "@/components/About/missionSection";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "আমরা কারা — সেনসো হিয়ারিং সেন্টার",
  description:
    "সেনসো হিয়ারিং সেন্টার, পান্থপথ, ঢাকা। ডেনমার্কের ReSound (GN)-এর বাংলাদেশ পরিবেশক — Tabassum International C/O Senso Hearing Centre.",
  alternates: { canonical: "/about-us" },
};

export default async function AboutUs() {
  const about = await getCompanyAbout();
  return (
    <>
      <Hero about={about} />
      <Mission />
      <History />
    </>
  );
}
