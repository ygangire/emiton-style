import Link from "next/link";

function SocialIcon({ type }: { type: "facebook" | "instagram" | "whatsapp" | "tiktok" }) {
  const commonClassName = "h-4 w-4";

  switch (type) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={commonClassName}>
          <path d="M13.5 22v-9h3l.4-3h-3.4V3.9c0-.9.2-1.5 1.5-1.5h1.6V.1C17 .1 15.8 0 14.4 0c-2.4 0-4 1.5-4 4.2v2.3H7v3h3.4v9h3.1Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={commonClassName}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={commonClassName}>
          <path d="M19.11 4.89A8.96 8.96 0 0 0 4.89 19.11L3.5 20.5l1.43-1.4a8.96 8.96 0 0 0 13.18-13.21ZM12 19.5a7.5 7.5 0 0 1-4.06-1.16l-.29-.18-2.84.78.78-2.84-.19-.3A7.5 7.5 0 1 1 12 19.5Zm4.07-5.63c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.58.71-.71.86-.13.15-.26.17-.48.06-.22-.11-.92-.34-1.76-1.08-.65-.58-1.08-1.29-1.21-1.51-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.69-1.64-.18-.43-.36-.37-.5-.37h-.43c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.83s.79 2.12.9 2.27c.11.15 1.55 2.37 3.76 3.32.52.22.93.35 1.25.45.53.17 1.01.15 1.39.09.42-.06 1.3-.53 1.49-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={commonClassName}>
          <path d="M14.6 2h2.7a5.4 5.4 0 0 0 5.4 5.4v2.8a8.2 8.2 0 0 1-5.4-1.9v7.2a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .8.1v2.9a2.4 2.4 0 1 0 1.6 2.3V2h1.2Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] py-14 text-[#F5F1EA]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.8fr_0.9fr]">
          <div className="space-y-4">
            <div className="text-2xl font-semibold tracking-tight text-[#F5F1EA]">
              Emiton Style
            </div>
            <p className="max-w-sm text-[#F5F1EA]/70">
              Simple. Strong. Intentional.
            </p>
          </div>

          <div className="grid gap-3">
            <p className="text-sm uppercase tracking-[4px] text-[#F5F1EA]/60">
              Navigation
            </p>
            <Link href="/shop" className="text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]">
              Shop
            </Link>
            <Link href="/about" className="text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]">
              About
            </Link>
            <Link href="/contact" className="text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]">
              Contact
            </Link>
          </div>

          <div className="grid gap-3">
            <p className="text-sm uppercase tracking-[4px] text-[#F5F1EA]/60">
              Contact
            </p>
            <div className="space-y-2">
              <p className="text-sm text-[#F5F1EA]/60">Phone</p>
              <a
                href="tel:+263780034482"
                className="text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]"
              >
                +263 780 034 482
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[#F5F1EA]/60">Email</p>
              <a
                href="mailto:amitonstyle@gmail.com"
                className="text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]"
              >
                amitonstyle@gmail.com
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            <p className="text-sm uppercase tracking-[4px] text-[#F5F1EA]/60">
              Connect
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61591595128178"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]"
            >
              <SocialIcon type="facebook" />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]"
            >
              <SocialIcon type="instagram" />
              <span>Instagram</span>
            </a>
            <a
              href="https://wa.me/263780034482"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]"
            >
              <SocialIcon type="whatsapp" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F5F1EA]/80 transition duration-300 hover:translate-x-1 hover:text-[#C89B3C]"
            >
              <SocialIcon type="tiktok" />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-[#C89B3C]/20 pt-6 text-center text-sm text-[#F5F1EA]/70">
          © {new Date().getFullYear()} Emiton Style. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
