import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#F8F5F0] min-h-screen flex items-center pt-24">
      <div className="max-w-7xl mx-auto px-8 w-full">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}

          <div>

            <p className="uppercase tracking-[8px] text-[#C89B3C] font-semibold">
              Affordable Premium Fashion
            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight text-[#111111] tracking-tight">
              Crafted for
              <br />
              confidence.
            </h1>

            <div className="mt-6 space-y-3 text-lg md:text-xl text-gray-700 leading-8 max-w-xl">
              <p className="font-medium text-[#111111]">
                Designed for timeless elegance.
              </p>
              <p className="text-gray-600">
                Worn with purpose.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                href="/shop"
                className="px-8 py-4 rounded-full bg-[#C89B3C] text-white hover:bg-black transition"
              >
                Shop Collection
              </Link>

              <Link
                href="/about"
                className="px-8 py-4 rounded-full border border-black hover:bg-black hover:text-white transition"
              >
                Learn More
              </Link>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex justify-center">

            <div className="relative w-full max-w-lg aspect-[4/5]">

              <Image
                src="/images/hero.jpg"
                alt="Emiton Style"
                fill
                className="object-contain"
                priority
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}