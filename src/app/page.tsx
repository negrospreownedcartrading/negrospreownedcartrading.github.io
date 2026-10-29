import Contact from "@/components/Contact";
import Garage from "@/components/Garage";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SoldShowcase from "@/components/SoldShowcase";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Garage />
        <SoldShowcase />
        <Testimonials />
        <WhyUs />
        <Contact />
      </main>
    </>
  );
}
