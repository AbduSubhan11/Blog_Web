"use client";
import { fetchUserBlogs } from "@/components/fetch-user-blogs";
import { CardContainer } from "@/components/ui/3d-card";
import { Blog } from "@/Data/blog-types";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyBlogs() {
//   if (typeof window === 'undefined') {
//  return null; 
// }
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString || "null");

  useEffect(() => {
    const userBlogs = async () => {
      const data = await fetchUserBlogs();
      if (data) {
        setBlogs(data);
      }
      return;
    };

    if (user) {
      userBlogs();
    } else {
      toast.error("You must be logged in to view your blogs.");
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
      toast.error(`Something went wrong. ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  return (
    <section className="bg-[#141414] text-white min-h-screen py-16 font-sans">
      <div className="2xl:max-w-[1400px] w-[90%] mx-auto space-y-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            My Blog Posts
          </h2>
          <p className="text-[#807f7f] text-lg md:text-xl mx-auto w-[95%] max-w-md">
            A personal collection of my thoughts, research, and learnings in the
            world of Agentic AI.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400 text-lg md:text-xl">
              No blog posts found please post your blog .
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {blogs.map((blog: Blog) => (
              <CardContainer
                key={blog._id}
                className="bg-[#191919] flex flex-col w-full gap-5 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition p-3"
              >
                <div className="xl:h-52">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className="w-full h-full obect-cover"
                  />
                </div>
                <div className="p-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] md:text-sm text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <div className="flex items-center space-x-4">
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
                        <Link
                          href={`/update-blog/${blog._id}`}
                          className="text-"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-yellow-500 line-clamp-1">
                    {blog?.title
                      ? blog.title[0].toUpperCase() + blog.title.slice(1)
                      : ""}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {blog?.description
                      ? blog.description[0].toUpperCase() +
                        blog.description.slice(1)
                      : ""}
                  </p>
                  <Link
                    href={`/blog/${blog._id}`}
                    className="inline-block text-yellow-400  hover:underline text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </CardContainer>
            ))}
          </div>
        )}
      </div>
      {showDeleteModal && blogToDelete && (
        <div className="fixed inset-0 bg-black  bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] p-6 h-[30%] flex flex-col items-center justify-center rounded-lg shadow-lg w-[90%] max-w-sm text-center">
            <h3 className="text-2xl font-bold mb-4">Confirm Delete</h3>
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
    </section>
  );
}
