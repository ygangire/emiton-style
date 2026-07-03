import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    title: "Ladies Collection",
    image: "/images/ladies.jpg",
    link: "/catalog?category=ladies",
  },
  {
    title: "Men's Collection",
    image: "/images/men.jpg",
    link: "/catalog?category=men",
  },
  {
    title: "Children's Collection",
    image: "/images/kids.jpg",
    link: "/catalog?category=kids",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="bg-[#F8F5F0] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-[#C89B3C] text-sm">
            Discover Our Collections
          </p>

          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            Fashion for Everyone
          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            From elegant ladies' wear to stylish men's outfits and comfortable
            children's clothing, Emiton Style has something for every member
            of the family.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {collections.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
            >
              <div className="relative h-[420px] bg-[#F8F5F0] flex items-center justify-center p-6">

                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain transition duration-500 hover:scale-105"
                    />

                </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <Link
                  href={item.link}
                  className="inline-block mt-6 text-[#C89B3C] font-semibold hover:text-black transition"
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