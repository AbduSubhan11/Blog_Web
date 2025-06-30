"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    id: 1,
    category: "Getting Started",
    question: "How do I create my first blog post?",
    answer:
      "Creating your first blog post is simple! Click on the 'Create Blog' button, choose a compelling title, select a relevant category, add your content using our rich text editor, upload a featured image, and hit publish. Your blog will be live instantly and visible to all readers.",
  },
  {
    id: 2,
    category: "Content Management",
    question: "Can I edit or delete my published blogs?",
    answer:
      "You have full control over your content. Visit 'My Blogs' section to see all your published posts. Each blog has edit and delete options. You can update content, change images, modify categories, or completely remove posts anytime.",
  },
  {
    id: 3,
    category: "Community",
    question: "How does the like system work?",
    answer:
      "Our engagement system is designed to foster community interaction. Readers can like your blogs with a single click, and the like count is displayed publicly.",
  },
  {
    id: 4,
    category: "Technical",
    question: "What image formats are supported for blog posts?",
    answer:
      "We support all major image formats including JPEG, PNG, JPG. For optimal performance. Our system automatically optimizes images for different screen sizes to ensure fast loading times.",
  },
  {
    id: 5,
    category: "Categories",
    question: "How do I choose the right category for my blog?",
    answer:
      "Categories help readers discover your content easily. We offer specialized categories like 'Artificial Intelligence', 'Web Development', 'AI Ethics', and more. Choose the category that best matches your blog's primary topic. You can always change it later when editing your post.",
  },
  {
    id: 6,
    category: "Account",
    question: "Is my account information secure?",
    answer:
      "Security is our top priority. We use industry-standard encryption, secure authentication tokens, and follow best practices for data protection. Your personal information is never shared with third parties, and you have full control over your account settings.",
  },
  {
    id: 7,
    category: "Publishing",
    question: "How long does it take for my blog to appear after publishing?",
    answer:
      "Your blog appears instantly after publishing! Our real-time system ensures that your content is immediately available to readers. The blog will also appear in category filters and search results right away, maximizing your content's visibility.",
  },
  {
    id: 8,
    category: "Content Guidelines",
    question: "Are there any content restrictions or guidelines?",
    answer:
      "We encourage creative and informative content while maintaining a respectful community. Please avoid spam, plagiarized content, or inappropriate material. Focus on providing value to readers through original insights, tutorials, or thought-provoking discussions in AI and related fields.",
  },
];

export default function FAQsSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* HEADER */}
      <section className="bg-[#191919] text-white py-16 ">
        <div className="2xl:max-w-[1400px] w-[90%] mx-auto text-left flex items-center justify-between">
          <div>
            <span className="bg-[#2a2a2a] text-sm text-gray-300 px-3 py-1 rounded-md mb-4 inline-block">
              Got Questions? We&apos;ve Got Answers
            </span>
            <h2 className="text-3xl md:text-[40px] font-semibold mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 md:text-lg max-w-2xl ">
              Everything you need to know about creating, managing, and sharing
              your blog content on our platform.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 md:mt-0 inline-flex items-center group gap-2 bg-[#1d1d1d] hover:bg-yellow-500 hover:text-[#141414] text-gray-200 px-5 py-3 rounded-md text-sm transition-all duration-500 border border-neutral-700"
          >
            Contact Us
            <ArrowUpRight className="w-4 h-4 group-hover:text-[#141414] text-yellow-400" />
          </Link>
        </div>
      </section>

      <div className="2xl:max-w-[1400px] w-[90%] mx-auto py-12">
        {/* FAQ ITEMS */}
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-[#1d1d1d] border border-neutral-700 rounded-lg overflow-hidden hover:border-neutral-600 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-3 md:px-6 md:py-5 py-2 text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center w-[90%]">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mt-1">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className="text-yellow-500">
                  {openFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === faq.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-3 md:px-6 pb-5">
                  <div className="">
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
}
