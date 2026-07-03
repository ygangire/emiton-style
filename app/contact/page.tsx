import Navbar from "@/components/layout/Navbar";
import { MessageCircleMore, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] pt-24">
        <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center justify-center px-6 py-20 lg:py-28">
          <div className="w-full max-w-3xl rounded-[2rem] border border-[#F1E7D6] bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10">
            <p className="uppercase tracking-[8px] text-[#C89B3C] text-sm font-semibold">
              Contact Us
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl font-semibold leading-tight text-[#111111]">
              Let&apos;s stay connected.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              For enquiries, styling inspiration, or to place an order, reach out
              through any of the options below.
            </p>

            <div className="mx-auto mt-10 max-w-xl space-y-4">
              <a
                href="https://www.facebook.com/profile.php?id=61591595128178"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 rounded-2xl border border-[#F1E7D6] bg-[#F8F5F0] p-5 text-left transition hover:border-[#C89B3C] hover:bg-white"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C89B3C] text-white">
                  <MessageCircleMore size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[4px] text-gray-500">
                    Facebook
                  </p>
                  <p className="mt-1 font-medium text-[#111111]">
                    Visit our Facebook page
                  </p>
                </div>
              </a>

              <a
                href="tel:+263780034482"
                className="flex items-center justify-center gap-4 rounded-2xl border border-[#F1E7D6] bg-[#F8F5F0] p-5 text-left transition hover:border-[#C89B3C] hover:bg-white"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[4px] text-gray-500">
                    Phone
                  </p>
                  <p className="mt-1 font-medium text-[#111111]">
                    +263 780034482
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
