import Navbar from "@/components/layout/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] pt-24 text-[#1A1A1A]">
        <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-center px-6 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <p className="uppercase tracking-[8px] text-[#C89B3C] text-sm font-semibold">
                About Amiton Style
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#111111]">
                Curating quality, with a label in time.
              </h1>

              <p className="max-w-xl text-lg leading-9 text-[#4B4B4B]">
                Amiton Style curates exceptional clothing from trusted manufacturers and established brands, bringing considered design and craftsmanship to your wardrobe today.
              </p>

              <div className="mt-10 max-w-xl space-y-5 border-l-2 border-[#C89B3C] pl-6 text-lg leading-9 text-[#4B4B4B]">
                <p>
                  We believe style should be simple, confident, and timeless. Our selections prioritise authenticity, responsible production, and lasting value.
                </p>
                <p className="font-semibold text-[#111111]">
                  While we currently source and sell top brands, we are developing our own label that will reflect the same clarity, craft, and purpose.
                </p>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-[#E6DACD] bg-[#FEF9F5] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="space-y-8">
                <div>
                  <p className="text-xl font-semibold text-[#111111]">
                    Purpose-driven design.
                  </p>
                  <p className="mt-4 text-[#4B4B4B] leading-8">
                    At the heart of Amiton Style is a commitment to purpose. We create for people who value authenticity over trends and meaning over noise.
                  </p>
                </div>

                <div>
                  <p className="text-xl font-semibold text-[#111111]">
                    Modern simplicity, lasting elegance.
                  </p>
                  <p className="mt-4 text-[#4B4B4B] leading-8">
                    Each design is shaped by a balance of modern simplicity and lasting elegance, created to help you show up as your best self every day.
                  </p>
                </div>

                <div className="rounded-[1.75rem] bg-[#ffffff] p-8 text-center shadow-[0_12px_35px_rgba(0,0,0,0.05)]">
                  <p className="text-lg font-semibold uppercase tracking-[4px] text-[#C89B3C]">
                    Amiton Style.
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-[#111111]">
                    Simple. Strong. Intentional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
