"use client";
import "./globals.css";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#141414] text-white px-6">
      <h1 className="text-9xl font-bold text-yellow-500">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-400 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 bg-yellow-500 text-[#141414] px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
