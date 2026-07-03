import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E9E2DA] bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.85fr_0.85fr]">
          <div className="space-y-4">
            <div className="text-2xl font-semibold tracking-tight text-[#111111]">
              Emiton Style
            </div>
            <p className="max-w-sm text-gray-600">
              Simple. Strong. Intentional.
            </p>
          </div>

          <div className="grid gap-3">
            <p className="text-sm uppercase tracking-[4px] text-gray-500">
              Navigation
            </p>
            <Link href="/shop" className="text-gray-700 transition hover:text-[#C89B3C]">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 transition hover:text-[#C89B3C]">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 transition hover:text-[#C89B3C]">
              Contact
            </Link>
          </div>

          <div className="grid gap-3">
            <p className="text-sm uppercase tracking-[4px] text-gray-500">
              Connect
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61591595128178"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 transition hover:text-[#C89B3C]"
            >
              Facebook
            </a>
            <a
              href="https://wa.me/263780034482"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 transition hover:text-[#C89B3C]"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E9E2DA] pt-6 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Emiton Style. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
