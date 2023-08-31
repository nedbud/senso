import Hero from "@/components/About/heroSection";
import History from "@/components/About/historySection";
import Mission from "@/components/About/missionSection";
import { Providers } from "@/redux/provider";

export default function About() {
  return (
    <Providers>
      <div>
        <Hero />
        <Mission />
        {/* <History /> */}
      </div>
    </Providers>
  );
}
