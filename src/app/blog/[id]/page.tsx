"use client";
import TextToSpeechButton from "@/components/text-to-speech-button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Blog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category?: string[];
  tags?: string[];
  like: string[];
  userId: {
    _id: string;
    name: string;
    email: string;
    profilePicture?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [blogs, setBlogs] = useState<Blog>();
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userBlogs = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        toast.error("Failed to fetch blog.");
      }
    };

    userBlogs();
  }, [params.id]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed to newsletter!");
    setEmail("");
  };

  return (
    <section className="bg-[#141414] text-white min-h-screen py-16 font-sans overflow-hidden">
      <div className="2xl:max-w-[1400px] w-[90%] mx-auto relative ">
        {/* Header */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center mb-2">
            <Image
              src={blogs?.userId.profilePicture || "/default-avatar.png"}
              alt={blogs?.userId.name || ""}
              width={30}
              height={30}
              priority
              className="rounded-full inline-block mr-2"
            />
            <div>
              <p className="text-sm "> {blogs?.userId.name}</p>
              <span className="text-xs text-gray-400">
                {blogs?.createdAt
                  ? new Date(blogs.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            {blogs?.title
              ? blogs.title[0].toUpperCase() + blogs.title.slice(1)
              : ""}
          </h2>
        </div>

        <div className="flex lg:flex-row flex-col gap-12">
          {/* Left */}
          <div className="lg:w-[60%]">
            {/* Image */}
            <div className="mb-10 ">
              <Image
                src={blogs?.image || ""}
                alt={blogs?.title || ""}
                width={2000}
                height={2000}
                className=" rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
              {blogs?.description
                ? blogs?.description[0].toUpperCase() +
                  blogs.description.slice(1)
                : ""}
            </div>

            <TextToSpeechButton text={blogs?.description || ""} />
          </div>

          {/* Right */}
          <div className="lg:w-[35%] sticky top-3">
            {/* Categories */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {blogs?.category?.map((cat, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-[#191919] hover:border-none border-e border-s border-gray-200 text-sm rounded-full hover:bg-yellow-500 hover:text-black transition-colors"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-[#191919] p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for the latest blog posts and
                updates.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex md:flex-row flex-col gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-gray-800 pt-6 text-sm text-gray-500">
          <p>
            Want to contribute your thoughts or write for us?{" "}
            <Link
              href={"/create"}
              className="text-yellow-500 underline cursor-pointer"
            >
              Create a blog post.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
