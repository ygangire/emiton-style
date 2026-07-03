import Link from "next/link";

const products = [
  {
    name: "Silk Tailored Shirt",
    description: "Refined structure with a soft drape for effortless evenings.",
    price: "$120",
    accent: "from-[#C89B3C] to-[#8B5E2B]",
    badge: "Signature",
  },
  {
    name: "Linen Essential Set",
    description: "Lightweight layering designed for modern, polished dressing.",
    price: "$95",
    accent: "from-[#6B4F3A] to-[#3D2A1C]",
    badge: "New",
  },
  {
    name: "Velvet Evening Blazer",
    description: "A statement piece with luxurious texture and excellent fit.",
    price: "$160",
    accent: "from-[#111111] to-[#4A4A4A]",
    badge: "Limited",
  },
  {
    name: "Minimal Knit Dress",
    description: "Clean lines and elevated comfort for everyday elegance.",
    price: "$110",
    accent: "from-[#D3B08B] to-[#A77549]",
    badge: "Bestseller",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#F8F5F0] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[6px] text-[#C89B3C]">
              Featured Products
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#111111] md:text-5xl">
              Featured Products
            </h2>
          </div>
          <p className="text-lg text-gray-600">Our latest favourites.</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="overflow-hidden rounded-4xl border border-[#E9E2DA] bg-white shadow-[0_18px_45px_rgba(17,17,17,0.05)]"
            >
              <div className={`flex h-64 items-center justify-center bg-linear-to-br ${product.accent}`}>
                <div className="rounded-full border border-white/70 px-5 py-3 text-sm font-semibold uppercase tracking-[4px] text-white/90">
                  {product.badge}
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-xl font-semibold text-[#111111]">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#111111]">
                    {product.price}
                  </span>
                  <Link
                    href="/shop"
                    className="rounded-full bg-[#111111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#C89B3C]"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
