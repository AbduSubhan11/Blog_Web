"use client";
import { Spotlight } from "../../../components/ui/spotlight";
import { StickyScroll } from "../../../components/ui/sticky-scroll-reveal";
import Link from "next/link";
import { FocusCards } from "@/components/ui/focus-cards";

const cardsImages = [
  { src: "/images/about/business-team.jpg", title: "Collaborative Ideation" },
  { src: "/images/about/ai-research.jpg", title: "AI Research & Trends" },
  { src: "/images/about/content-writing.jpg", title: "Content Creation" },
  { src: "/images/about/publishing.jpg", title: "Blog Publishing " },
  { src: "/images/about/feedback.jpg", title: "Community Feedback" },
  { src: "/images/about/trending.avif", title: "Continuous Improvement" },
];

export default function AboutUsPage() {
  return (
    <section className="bg-[#141414] text-white min-h-screen py-16 font-sans">
      <div className="2xl:max-w-[1400px] w-[90%] mx-auto space-y-10">
        {/* Hero */}
        <Spotlight
          className="-top-[35%] md:top-0 -left-[50%] md:left-0 right-0 h-full w-full opacity-65"
          fill="white"
        />
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            About Our Team
          </h1>
          <p className="text-[#807f7f] text-lg md:text-xl mx-auto w-[95%] max-w-2xl">
            We&apos;re a passionate group of developers, researchers, and AI
            enthusiasts dedicated to making artificial intelligence accessible
            and understandable for everyone.
          </p>
        </div>

        {/* Our Story Section */}
        <StickyScroll
          content={[
            {
              title: "Our Story",
              description:
                "Born from late night coding sessions and endless discussions about the future of AI, our blog started as a simple idea: what if we could bridge the gap between cutting-edge AI research and practical implementation? We noticed that while AI was advancing rapidly, there was a disconnect between academic breakthroughs and real-world applications. Our team came together with diverse backgrounds in machine learning, software engineering, and technical writing to create a platform where complex AI concepts become accessible insights.",
            },
            {
              title: "Who We Are",
              description:
                "We're developers who've shipped AI products, researchers who've published papers, and writers who believe that the best ideas are the ones that can be shared clearly. Our team spans different time zones, backgrounds, and expertise areas, but we're united by a common belief: AI's true potential is unlocked when more people can understand, build with, and contribute to its development.\n\nFrom our lead engineers who architect scalable AI systems to our content creators who translate complex algorithms into engaging stories, every team member brings a unique perspective to our mission of democratizing AI knowledge.",
            },
          ]}
          contentClassName=""
          backgroundImages={[
            "/images/about/1st-section.jpg",
            "/images/about/2nd-section.jpg",
          ]}
        />

        {/* OUR STORIEs FOR MOBILES */}

        <div className="md:hidden flex flex-col pt-5 ">
          {[
            {
              title: "Our Story",
              description:
                "Born from late night coding sessions and endless discussions about the future of AI, our blog started as a simple idea: what if we could bridge the gap between cutting-edge AI research and practical implementation? We noticed that while AI was advancing rapidly, there was a disconnect between academic breakthroughs and real-world applications. Our team came together with diverse backgrounds in machine learning, software engineering, and technical writing to create a platform where complex AI concepts become accessible insights.",
            },
            {
              title: "Who We Are",
              description:
                "We're developers who've shipped AI products, researchers who've published papers, and writers who believe that the best ideas are the ones that can be shared clearly. Our team spans different time zones, backgrounds, and expertise areas, but we're united by a common belief: AI's true potential is unlocked when more people can understand, build with, and contribute to its development.\n\nFrom our lead engineers who architect scalable AI systems to our content creators who translate complex algorithms into engaging stories, every team member brings a unique perspective to our mission of democratizing AI knowledge.",
            },
          ].map((item, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-xl font-bold text-yellow-500 mb-4">
                {item.title}
              </h2>
              <p className="text-[#807f7f] text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className=" p-8 mt-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-yellow-500">300+</div>
              <div className="text-[#807f7f]">Resources Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-yellow-500">8K+</div>
              <div className="text-[#807f7f]">Community Readers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-yellow-500">1K+</div>
              <div className="text-[#807f7f]">Active Users</div>
            </div>
          </div>
        </div>

        {/* METHODOLOGY */}
        <div className="space-y-12 pb-0 md:pb-10  py-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
              Our Methodology
            </h2>
            <p className="text-[#807f7f] text-lg max-w-3xl mx-auto">
              How we ensure every piece of content delivers maximum value to our
              community
            </p>
          </div>
          <FocusCards cards={cardsImages} />
        </div>
      </div>

      {/* Join Our Mission */}
      <div className="bg-[#191919] mt-20 py-10 md:py-16">
        <div className="bg-[#191919] text-center 2xl:max-w-[1400px] w-[90%] mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-yellow-500">
            Join Our Mission
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We&apos;re always looking for passionate writers, developers, and AI
            enthusiasts to join our team. Whether you want to contribute
            articles, share your projects, or help us build better tools for the
            community, there&apos;s a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-yellow-500 text-[#141414] font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-500"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
