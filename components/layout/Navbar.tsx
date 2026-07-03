"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Emiton Style"
            width={75}
            height={75}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">

          <Link
            href="/"
            className="relative text-gray-800 hover:text-[#C89B3C] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C89B3C] after:transition-all hover:after:w-full"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="relative text-gray-800 hover:text-[#C89B3C] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C89B3C] after:transition-all hover:after:w-full"
          >
            About
          </Link>

          <Link
            href="/catalog"
            className="relative text-gray-800 hover:text-[#C89B3C] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C89B3C] after:transition-all hover:after:w-full"
          >
            Catalogue
          </Link>

          <Link
            href="/contact"
            className="relative text-gray-800 hover:text-[#C89B3C] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C89B3C] after:transition-all hover:after:w-full"
          >
            Contact
          </Link>

        </nav>

        {/* WhatsApp Button */}
        <div className="hidden lg:flex">

          <a
            href="https://wa.me/263780034482"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#C89B3C] text-white hover:bg-black transition duration-300"
          >
            WhatsApp Us
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-md">

          <div className="flex flex-col gap-6 p-6">

            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            <Link href="/catalog" onClick={() => setOpen(false)}>
              Catalogue
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            <a
              href="https://wa.me/263780034482"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C89B3C] text-white text-center py-3 rounded-full"
            >
              WhatsApp Us
            </a>

          </div>

        </div>
      )}

    </header>
  );
}