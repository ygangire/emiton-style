import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    title: "Ladies Collection",
    image: "/images/ladies.jpg",
    link: "/shop/ladies",
  },
  {
    title: "Men's Collection",
    image: "/images/men.jpg",
    link: "/shop/men",
  },
  {
    title: "Children's Collection",
    image: "/images/kids.jpg",
    link: "/shop/kids",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="bg-[#6B4F3A] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-[#D9C5B0] text-sm">
            Discover Our Collections
          </p>

          <h2 className="text-5xl font-bold mt-4 text-[#F5E7DB]">
            Fashion for Everyone
          </h2>

          <p className="mt-6 text-[#E7D9C9] max-w-2xl mx-auto">
            From elegant ladies&apos; wear to stylish men&apos;s outfits and comfortable
            children&apos;s clothing, Emiton Style has something for every member
            of the family.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {collections.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl overflow-hidden border border-[#805F4F] bg-[#F3E7DE] shadow-lg transition duration-500 hover:shadow-2xl"
            >
              <div className="relative h-[420px] bg-[#E7D9CB] overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain hover:scale-105 transition duration-500"
                />

              </div>

              <div className="p-8">

                  <h3 className="text-2xl font-bold text-[#442E21]">
                    {item.title}
                  </h3>

                  <Link
                    href={item.link}
                    className="inline-block mt-6 text-[#855F45] font-semibold hover:text-[#3C281E] transition"
                  >
                    View Collection →
                  </Link>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
