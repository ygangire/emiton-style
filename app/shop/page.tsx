"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const collections = [
  {
    id: "ladies",
    title: "Ladies Collection",
    description: "Elegant pieces designed for confidence, softness, and timeless polish.",
    link: "/shop/ladies",
    accent: "Ladies",
  },
  {
    id: "men",
    title: "Men's Collection",
    description: "Refined staples for a sharp, modern wardrobe with lasting presence.",
    link: "/shop/men",
    accent: "Men",
  },
  {
    id: "kids",
    title: "Kids Collection",
    description: "Comfortable, stylish essentials made for everyday movement and play.",
    link: "/shop/kids",
    accent: "Kids",
  },
];

export default function ShopPage() {

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] pt-20">
        <section className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
          <div className="flex flex-col items-center text-center">
            <p className="uppercase tracking-[8px] text-[#C89B3C] text-sm font-semibold">
              Shop
            </p>
            <h1 className="mt-6 text-4xl sm:text-5xl font-semibold leading-tight text-[#111111]">
              Curated essentials for modern dressing.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              A refined preview of the full ecommerce experience to come,
              featuring timeless pieces and elevated everyday fashion.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.link}
                className="block rounded-[2rem] border border-[#F1E7D6] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
                  <div className="flex items-center justify-between text-sm uppercase tracking-[4px] text-gray-500">
                    <span>{collection.accent}</span>
                    <span className="text-[#C89B3C]">Explore</span>
                  </div>

                  <div className="mt-10 h-48 rounded-[1.5rem] bg-[#F8F5F0]" />

                  <h2 className="mt-8 text-2xl font-semibold text-[#111111]">
                    {collection.title}
                  </h2>
                  <p className="mt-3 text-gray-600">{collection.description}</p>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[4px] text-[#C89B3C]">
                      View Collection
                    </span>
                    <span className="text-xl font-semibold text-[#111111]">→</span>
                  </div>
                </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
