import { BadgeCheck, Compass, Sparkles, type LucideIcon } from "lucide-react";

const highlights: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Quality First",
    description:
      "We carefully select clothing from trusted manufacturers and established brands to ensure exceptional quality and lasting value.",
    icon: BadgeCheck,
  },
  {
    title: "Timeless Style",
    description:
      "Our collections focus on clean design, versatility, and elegance that goes beyond changing trends.",
    icon: Sparkles,
  },
  {
    title: "Our Vision",
    description:
      "Today we curate exceptional fashion. Tomorrow we will build our own label rooted in purpose, craftsmanship, and confidence.",
    icon: Compass,
  },
];

export default function WhyAmitonStyle() {
  return (
    <section className="bg-[#F8F5F0] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[6px] text-[#C89B3C]">
            Why Amiton Style
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#111111] md:text-5xl">
            Why Amiton Style
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Thoughtfully curated fashion that balances timeless style, quality,
            and confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[2rem] border border-[#E9E2DA] bg-white p-8 shadow-[0_18px_45px_rgba(17,17,17,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(17,17,17,0.08)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E9] text-[#C89B3C]">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
