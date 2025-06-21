"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Profile } from "./profile";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const route = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "My Blogs", href: "/my-blogs" },
    { name: "All Blogs", href: "/all-blogs" },
    { name: "Create", href: "/create" },
  ];

  return (
    <nav className="bg-[#191919] sticky top-0 z-50 ">
      <div className="2xl:max-w-[1400px] w-[90%] mx-auto ">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-white flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="mr-2 rounded-full" 
                />
                FutureTech
              </span>
            </Link>
          </div>

          {/* Desktop Links */}

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[#807f7f] hover:text-white transition ${
                  route === link.href
                    ? "px-3 py-1 rounded-lg border border-neutral-700 text-white bg-[#141414] "
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/contact"
              className="bg-yellow-500 text-[#141414]  py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Contact Us
            </Link>

            {/* LOGIN BUTTON*/}

            {!localStorage.getItem("token") &&
              !localStorage.getItem("user") && (
                <Link
                  href="/login"
                  className="bg-yellow-500 text-[#141414]  py-2 px-4 rounded hover:bg-yellow-600 transition"
                >
                  Login
                </Link>
              )}

            {localStorage.getItem("token") &&
              localStorage.getItem("user") && (
                <div className="relative">
                  {/* PROFILE PAGE */}
                  <Profile />
                </div>
              )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden w-fit">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
        className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/login"
                className="block px-3 text-left py-2 rounded text-[#141414] bg-yellow-500 hover:bg-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
