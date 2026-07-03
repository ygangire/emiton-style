import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const products = [
  { name: "Satin Wrap Dress", price: "$129" },
  { name: "Tailored Blazer", price: "$149" },
  { name: "Silk Blouse", price: "$89" },
  { name: "Wide-Leg Trousers", price: "$112" },
];

export default function LadiesCollectionPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] pt-20">
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="uppercase tracking-[8px] text-[#C89B3C] text-sm font-semibold">
              Shop / Ladies
            </p>
            <h1 className="mt-6 text-4xl sm:text-5xl font-semibold leading-tight text-[#111111]">
              Ladies Collection
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover refined womenswear designed with quiet strength, modern polish, and lasting elegance.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <div key={product.name} className="rounded-[2rem] border border-[#F1E7D6] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                <div className="h-56 rounded-[1.5rem] bg-[#F8F5F0]" />
                <h2 className="mt-8 text-2xl font-semibold text-[#111111]">{product.name}</h2>
                <p className="mt-4 text-gray-600">A wardrobe essential with a luxurious yet effortless finish.</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xl font-semibold text-[#111111]">{product.price}</span>
                  <button className="rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#C89B3C]">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/shop" className="inline-flex rounded-full border border-[#C89B3C] px-8 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#C89B3C] hover:text-white">
              Back to Shop
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
