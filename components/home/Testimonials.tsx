import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Beautiful quality and excellent service.",
    name: "Aisha M.",
  },
  {
    quote: "I love how timeless every piece feels.",
    name: "Tendai R.",
  },
  {
    quote: "Affordable elegance without compromise.",
    name: "Nadia K.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#FEF9F5] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[6px] text-[#C89B3C]">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#111111] md:text-5xl">
            What Our Customers Say
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Confidence begins with what you wear.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-[2rem] border border-[#F0E4D8] bg-white p-8 shadow-[0_18px_45px_rgba(17,17,17,0.05)]"
            >
              <div className="flex gap-1 text-[#C89B3C]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>

              <p className="mt-6 text-lg leading-8 text-[#111111]">
                “{item.quote}”
              </p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[4px] text-[#6B4F3A]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
