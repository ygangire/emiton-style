import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import WhyAmitonStyle from "@/components/home/WhyAmitonStyle";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyAmitonStyle />
      <FeaturedCollections />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </>
  );
}