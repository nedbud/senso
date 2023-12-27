import Hero from "@/components/Home/heroSection";
import BestProducts from "@/components/Home/bestProductsSection";
import Service from "@/components/Home/serviceSection";
import Partners from "@/components/Home/partnerSection";
import FAQ from "@/components/Home/faqSection";
import Contact from "@/components/Home/contactSection";
import Script from "next/script";
import { getBestProducts } from "@/routes/product";
import { getCompanySettings } from "@/routes/company";

export default async function Home() {
  const bestProductsData = getBestProducts();
  const companyDetails = getCompanySettings();

  const [bestProducts, company] = await Promise.all([
    bestProductsData,
    companyDetails,
  ]);

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

          {/* Facebook Chat Plugin Code */}
          <div id="fb-root"></div>
          <div id="fb-customer-chat" className="fb-customerchat"></div>
          <Script id="facebook-chat-script">
            {`
              var chatbox = document.getElementById('fb-customer-chat');
              chatbox.setAttribute("page_id", "212954412245615");
              chatbox.setAttribute("attribution", "biz_inbox");
            `}
          </Script>
          <Script id="facebook-sdk-script">
            {`
              window.fbAsyncInit = function() {
                FB.init({
                  xfbml: true,
                  version: 'v18.0'
                });
              };

              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `}
          </Script>
        </div>
      ) : null}
      <div className="mt-20 lg:mt-16 h-full lg:h-[500px]">
        <Hero cover={company.data.cover} />
      </div>
      <section className="bg-[#CA0508] pt-8 px-5 lg:px-0 py-5 lg:pt-24 2xl:pt-64 lg:pb-14">
        <BestProducts products={bestProducts.data} />
      </section>
      <Service />
      <Partners />
      <FAQ />
      <Contact />
    </div>
  );
}