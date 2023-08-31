"use client";

import Hero from "@/components/Home/heroSection";
import BestProducts from "@/components/Home/bestProductsSection";
import Service from "@/components/Home/serviceSection";
import Partners from "@/components/Home/partnerSection";
import FAQ from "@/components/Home/faqSection";
import Contact from "@/components/Home/contactSection";
import Script from "next/script";
import { useGetDetailsQuery } from "@/redux/features/company/company.api";

export default function Home() {
  const { data: response, isLoading: loading } = useGetDetailsQuery("");
  const company = response?.data;

  return (
    <div>
      {process.env.NODE_ENV === "production" ? (
        <div className="container">
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM}`}
          />
          <Script id="google-analytics">
            {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
        
                  gtag('config', ${process.env.NEXT_PUBLIC_GTM});
                `}
          </Script>
        </div>
      ) : null}
      <Hero cover={company?.cover} loading={loading} />
      <BestProducts />
      <Service />
      <Partners />
      <FAQ />
      <Contact />
    </div>
  );
}
