import { Navbar } from "@/components/navbar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { Hero } from "@/components/sections/hero";
import { Patrimonio360 } from "@/components/sections/patrimonio360";
import { Services } from "@/components/sections/services";
import { Innovation } from "@/components/sections/innovation";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Properties } from "@/components/sections/properties";
import { Finder } from "@/components/sections/finder";
import { Testimonials } from "@/components/sections/testimonials";
import { Trust } from "@/components/sections/trust";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Patrimonio360 />
        <Services />
        <Innovation />
        <Stats />
        <Process />
        <Properties />
        <Finder />
        <Testimonials />
        <Trust />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
