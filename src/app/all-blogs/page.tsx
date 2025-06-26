"use client";
import { CardContainer } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit, Heart, Heart as HeartFilled, Trash } from "lucide-react";
import { FetchAllUsersBlogs } from "@/components/fetch-all-users-blogs";

type blog = {
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

export default function AllBlogs() {
  // if (typeof window === "undefined") {
  //   return null;
  // }
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<blog | null>(null);

  // const userString = localStorage.getItem("user");
  // const user = JSON.parse(userString || "null");
  const [blogs, setBlogs] = useState<blog[]>([]);

  const [user, setUser] = useState<{
    _id: string;
 
  }>({ _id: "" });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        setUser(JSON.parse(userString));
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    const userBlogs = async () => {
      const data = await FetchAllUsersBlogs();
      if (data) {
        setBlogs(data);
      } else {
        toast.error("Failed to fetch blogs.");
      }
    };

    userBlogs();
  }, []);

  const handleLike = async (blogId: string) => {
    if (!user?._id) {
      toast.error("You must be logged in to like a blog.");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_BLOG}/bloglike/${blogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    if (!res.ok) {
      toast.error("Failed to like the blog.");
      return;
    }
    const updatedBlog = await res.json();
    const isNowLiked = updatedBlog.like.includes(user._id);
    toast.success(
      isNowLiked ? "Blog liked successfully!" : "Blog unliked successfully!"
    );
    setBlogs((prev) =>
      prev.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
    );
  };

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

  return (
    <section className="bg-[#141414] text-white min-h-screen py-16 font-sans">
      <div className="2xl:max-w-[1400px] w-[90%] mx-auto space-y-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 mx-auto">
            Explore Blogs from the Community
          </h2>
          <p className="text-[#807f7f] text-lg md:text-xl w-[95%] max-w-xl mx-auto">
            Dive into thought provoking ideas, tutorials, and innovations shared
            by other creators in the world of Agentic AI.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400 text-lg md:text-xl">
              No blog posts found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 py-10">
            {blogs.map((blog: blog) => (
              <CardContainer
                key={blog._id}
                className="bg-[#191919] flex flex-col w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition p-3  space-y-5"
              >
                <div className="lg:h-48 xl:h-52">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className="w-full h-full obect-cover"
                  />
                </div>
                <div className="p-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex md:flex-row flex-col md:items-center mb-2">
                      <Image
                        src={
                          blog.userId.profilePicture || "/default-avatar.png"
                        }
                        alt={blog.userId.name}
                        width={30}
                        height={30}
                        priority
                        className="rounded-full inline-block mr-2"
                      />
                      <div>
                        <p className="text-sm "> {blog.userId.name}</p>
                        <span className="text-xs text-gray-400">
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    {blog.userId._id !== user?._id ? (
                      <div className="flex items-center gap-4 text-sm ">
                        {/* LIKE BUTTON */}
                        <button
                          onClick={() => handleLike(blog._id)}
                          className="flex items-center gap-1 text-red-500 transition"
                        >
                          {user?._id && blog.like?.includes(user._id) ? (
                            <HeartFilled fill="red" className="w-5 h-5" />
                          ) : (
                            <Heart className="w-5 h-5 text-gray-400" />
                          )}

                          <span
                            className={`${
                              user?._id && blog.like?.includes(user._id)
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            {blog.like?.length}
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 text-sm ">
                        {/* EDIT OR DELETE BUTTON */}
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
                    )}
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
                    className="inline-block text-yellow-400 mt-2 hover:underline text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </CardContainer>
            ))}
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
          </div>
        )}
      </div>
    </section>
  );
}
