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

  return (
    <section className="bg-[#141414] text-white min-h-screen py-16 font-sans">
      <div className="2xl:max-w-[1400px] w-[90%] mx-auto">
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

        {/* Image */}
        <div className="mb-10">
          <Image
            src={blogs?.image || ""}
            alt={blogs?.title || ""}
            width={2000}
            height={2000}
            className=" w-[100%] object-cover  "
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          {blogs?.description
            ? blogs?.description[0].toUpperCase() + blogs.description.slice(1)
            : ""}
        </div>

        <TextToSpeechButton text={blogs?.description || ""} />

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
