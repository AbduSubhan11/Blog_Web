"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Edit, Heart, Trash } from "lucide-react";
import Link from "next/link";
import { Blog } from "@/Data/blog-types";
import { toast } from "sonner";
import { FetchUserBlogs } from "./fetch-user-blogs";

const categories = [
  "All",
  "Artificial Intelligence",
  "Agentic Systems",
  "Web Development",
  "AI Ethics",
  "Emerging Technologies",
];

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const parsedUser = JSON.parse(userString || "null");

    if (parsedUser) {
      FetchUserBlogs().then((data) => {
        if (data) {
          setBlogs(data);
        }
      });
    }
  }, []);

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/${blogToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("Blog deleted successfully.");
        setBlogs((prev) => prev.filter((b) => b._id !== blogToDelete._id));
      } else {
        toast.error("Failed to delete blog.");
      }
    } catch (error) {
      toast.error(
        `Something went wrong. ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category?.includes(selectedCategory));

  return (
    <>
      <div className="min-h-screen bg-[#141414] text-white space-y-12">
        {/* HEADER */}
        <section className="bg-[#191919] text-white py-10 md:py-16 ">
          <div className="2xl:max-w-[1400px] w-[90%] mx-auto  flex flex-col xl:flex-row justify-between items-start xl:items-center ">
            <div>
              <span className="bg-[#2a2a2a] text-sm text-gray-300 px-3 py-1 rounded-md mb-2 inline-block">
                A Knowledge Treasure Trove
              </span>
              <h1 className="text-3xl md:text-[40px] font-semibold mt-2">
                Explore FutureTech&apos;s In-Depth Blog Posts
              </h1>
            </div>
            <Link
              href="/my-blogs"
              className="mt-6 xl:mt-0 inline-flex items-center group gap-2 bg-[#1d1d1d] hover:bg-yellow-500 hover:text-[#141414] text-gray-200 px-5 py-3 rounded-md text-sm transition-all duration-500 border border-neutral-700"
            >
              View All My Blogs{" "}
              <ArrowUpRight className="w-4 h-4 group-hover:text-[#141414] text-yellow-400" />
            </Link>
          </div>
        </section>

        {/* BLOG LIST */}
        <div className="2xl:max-w-[1400px] w-[90%] mx-auto">
          <div className="flex flex-wrap gap-4 md:justify-center mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded border border-neutral-700 hover:bg-yellow-600 hover:text-[#141414] transition-all duration-300 ${
                  selectedCategory === cat ? "bg-yellow-500 text-[#141414]" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-10 pb-16">
            {filteredBlogs.length === 0 && (
              <div className="text-center text-gray-400">
                No blogs found please add your blogs.
              </div>
            )}
            {/* Blog List */}
            {filteredBlogs.map((blog: Blog) => (
              <div
                key={blog._id}
                className="flex flex-col md:flex-row items-center gap-6 border-t border-gray-800 pt-6"
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={200}
                  height={1000}
                  className="rounded-md "
                />
                <div className="flex-1 space-y-4">
                  <div className="text-gray-400 font-semibold">
                    <h2>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h2>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold ">
                      {" "}
                      {blog?.title
                        ? blog.title[0].toUpperCase() + blog.title.slice(1)
                        : ""}
                    </h2>
                    <p className="text-gray-400 line-clamp-2">
                      {blog?.description
                        ? blog.description[0].toUpperCase() +
                          blog.description.slice(1)
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm ">
                    <div className="flex items-center space-x-1 text-[11px]">
                      <Heart size={16} className="text-red-500" fill="red" />
                      <p>{blog.like.length}</p>
                    </div>
                    <div
                      className="flex items-center space-x-1 text-red-500 cursor-pointer hover:text-red-600"
                      onClick={() => {
                        setBlogToDelete(blog);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash size={16} />
                      <p>Delete</p>
                    </div>

                    <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 ">
                      <Edit size={16} />
                      <Link href={`/update-blog/${blog._id}`} className="text-">
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/blog/${blog._id}`}
                  className="flex items-center group gap-1 px-4 py-2 text-sm border border-neutral-700 rounded hover:bg-yellow-500 hover:text-[#141414] transition-all duration-500"
                >
                  View Blog{" "}
                  <ArrowUpRight
                    className="group-hover:text-[#141414] text-yellow-400"
                    size={16}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showDeleteModal && blogToDelete && (
        <div className="fixed inset-0 bg-black  bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] p-6 h-[30%] flex flex-col items-center justify-center rounded-lg shadow-lg w-[90%] max-w-sm text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Confirm Delete
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong>
                <q>{blogToDelete.title}</q>
              </strong>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
