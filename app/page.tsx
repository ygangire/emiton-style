import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCollections />
    </>
  );
}