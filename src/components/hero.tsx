"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ModelViewer from "./model-viewer";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { BackgroundBeams } from "./ui/background-beams";
import { FlipWords } from "./ui/flip-words";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Full Stack Developer",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.BpMp0ESMS5Sjcv4oHAdVjQHaLH&pid=Api&P=0&h=220",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Product Designer",
    image:
      "/images/Hero/men1.avif",
  },
  {
    id: 3,
    name: "Samuel Green",
    designation: "AI Researcher",
    image:
      "/images/Hero/men2.avif",
  },
  {
    id: 4,
    name: "Lisa Brown",
    designation: "Content Writer",
    image:
      "/images/Hero/men3.avif",
  },
];

export default function Hero() {
  return (
    <section className="relative bg-[#141414] text-white md:min-h-[90vh] flex overflow-hidden md:py-0 py-16 ">
      {/* BACKground */}
      <BackgroundBeams />

      {/* RIGHT SECTION */}
      <div className="absolute md:w-[50%] h-full z-20 right-0 md:block hidden">
        {/* GLB background */}
        <ModelViewer />
      </div>

      {/* LEFT SECTION */}
      <div className="relative z-10 w-[90%] 2xl:max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between ">
        {/* Left Section: Text Content */}
        <div className="lg:w-[60%] mb-12 lg:mb-0 space-y-6 xl:space-y-8 overflow-hidden">
          <h3 className="text-lg font-semibold text-[#807f7f] uppercase tracking-wide">
            Your Journey to Tomorrow Begins Here
          </h3>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl mt-4 font-semibold  flex flex-col">
            Discover the Future of
          <FlipWords
              words={[
                "Artificial Intelligence",
                "Agentic AI",
                "Humanoid Robotics",
              ]}
              className="text-white relative right-2"
            />
          </h1>
          <p className="text-[#807f7f] lg:w-[80%] xl:w-[70%] leading-5">
            Welcome to the epicenter of AI innovation. FutureTech AI News is
            your passport to a world where machines think, learn, and reshape
            the future. Join us on this visionary expedition into the heart of
            AI.
          </p>

          <div className="flex md:flex-row flex-col md:items-center md:space-y-0 space-y-4 md:space-x-8">
            <div className="flex items-center gap-2">
              <AnimatedTooltip items={people} />
            </div>
            <p className="text-[#807f7f]">
              Over 1000+ articles on emerging tech trends & breakthroughs.
            </p>
          </div>
          <div className="flex space-x-6">
            <div>
              <p className="text-3xl font-bold text-yellow-500">300+</p>
              <p className="text-[#807f7f]">Resources Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-500">8K+</p>
              <p className="text-[#807f7f]">Total Downloads</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-500">1K+</p>
              <p className="text-[#807f7f]">Active Users</p>
            </div>
          </div>
          <Link
            href="/all-blogs"
            className="inline-flex items-center bg-yellow-500 text-[#141414] font-semibold py-2 xl:py-3 xl:px-6 px-4 rounded-lg hover:bg-yellow-600 transition"
          >
            Explore Blogs
            <ChevronRight className="mt-[2px]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
