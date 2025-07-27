"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FetchAllUsersBlogs } from "./fetch-all-users-blogs";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;

    const fetchBlogs = async () => {
      const response = await FetchAllUsersBlogs();
      if (response) {
        setBlogs(response);
      } else {
        console.error("Failed to fetch blogs");
      }
    };

    if (token && userData?.isAdmin) {
      fetchBlogs();
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Blog Dashboard</h1>
      {blogs.length > 0 ? (
        <div className="overflow-auto rounded-lg ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow
                  key={blog._id}
                  className="hover:bg-[#191919] cursor-pointer transition-colors"
                  onClick={() => router.push(`/blog/${blog._id}`)}
                >
                  <TableCell>{blog.userId.name}</TableCell>
                  <TableCell className="">{blog.title}</TableCell>
                  <TableCell className="max-w-sm">
                    <p className="line-clamp-2 text-sm ">
                      {blog.description}
                    </p>
                  </TableCell>
                  <TableCell>{blog.like.length}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                        // onClick logic for delete
                      >
                        <Trash size={16} />
                        <span className="text-sm">Delete</span>
                      </button>
                      <Link
                        href={`/update-blog/${blog._id}`}
                        className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Edit size={16} />
                        <span className="text-sm">Edit</span>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-10">
          No blogs available.
        </p>
      )}
    </div>
  );
}

export default AdminDashboard;
