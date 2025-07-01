"use client";

import { useEffect, useState } from "react";
import {
  Edit,
  Trash,
  Eye,
  Heart,
  MessageSquare,
  Plus,
  Search,
  Calendar,
} from "lucide-react";
import { FetchUserBlogs } from "./fetch-user-blogs";
import { toast } from "sonner";
import Link from "next/link";
import { IconHeartFilled } from "@tabler/icons-react";

const categories = [
  "Artificial Intelligence",
  "Agentic Systems",
  "Web Development",
  "AI Ethics",
  "Emerging Technologies",
  "All",
];

type blog = {
  _id: number;
  description: string;
  title: string;
  category: string;
  status: string;
  views: number;
  like: string[];
  comments: number;
  createdAt: string;
  image: string;
};

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<blog | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userString = localStorage.getItem("user");
      const parsedUser = userString ? JSON.parse(userString) : null;

      if (!parsedUser) {
        toast.error("You must be logged in to view your blogs.");
        return;
      }

      const userBlogs = async () => {
        const data = await FetchUserBlogs();
        if (data) {
          setBlogs(data);
        }
      };

      if (parsedUser) {
        userBlogs();
      }
    }
  }, []);

  const filteredBlogs = blogs.filter((blog: blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
   
    return matchesSearch ;
  });

  const handleDelete = (blogId: number) => {
    setBlogs(blogs.filter((blog: blog) => blog._id !== blogId));
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Blog Management</h2>
          <p className="text-gray-400">
            Manage all your blog posts in one place
          </p>
        </div>
        <Link href="/create" className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-[#141414] rounded-md hover:bg-yellow-600 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Create New Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search blog by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#1d1d1d] border border-neutral-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Blog List */}
      <div className="bg-[#191919] border border-neutral-700 rounded-lg overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">No blogs found</div>
            <Link href="/create" className="px-4 py-2 bg-yellow-500 text-[#141414] rounded-md hover:bg-yellow-600 transition-colors">
              Create Your Blog
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-700">
            {filteredBlogs.map((blog: blog) => (
              <div
                key={blog._id}
                className="p-6 hover:bg-[#1d1d1d] transition-colors"
              >
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* Blog Image */}
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full md:w-32 h-20 object-cover rounded-md"
                  />

                  {/* Blog Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                          {blog.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="bg-[#2a2a2a] px-2 py-1 rounded text-xs">
                            {blog.category}
                          </span>

                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <IconHeartFilled className="w-4 h-4" fill="red" />
                        {blog.like.length} likes
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link href={`/update-blog/${blog._id}`} className="p-2 text-white hover:bg-[#252525] rounded-md transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        setBlogToDelete(blog);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#252525] rounded-md transition-colors"
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Delete Modal */}
            {showDeleteModal && blogToDelete && (
              <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
                <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Confirm Delete
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Are you sure you want to delete{" "}
                    <strong>"{blogToDelete.title}"</strong>? This action cannot
                    be undone.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-[#141414] rounded transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(blogToDelete._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
