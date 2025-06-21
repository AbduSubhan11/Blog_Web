import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-white py-8">
      <div className="w-[90%] 2xl:max-w-[1400px] mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h3 className="text-xl font-bold">Blog</h3>
            <p className="mt-2 text-[#807f7f]">
              Sharing knowledge and insights since 2023.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/about" className="text-[#807f7f] hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#807f7f] hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <a href="#" className="text-[#807f7f] hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-[#807f7f] hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-[#807f7f]">
            &copy; {new Date().getFullYear()} FutureTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}