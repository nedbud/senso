import Hero from "@/components/About/heroSection";
import History from "@/components/About/historySection";
import Mission from "@/components/About/missionSection";
import { getCompanyAbout } from "@/routes/company";

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
