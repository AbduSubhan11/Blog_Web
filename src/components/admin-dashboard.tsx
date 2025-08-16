"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import Image from "next/image";
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

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePicture: string;
  blog: string[];
  createdAt: string;
  updatedAt: string;
};

function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const [Allusers, setAllUsers] = useState([]);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;

    const fetchBlogs = async () => {
      const response = await FetchAllUsersBlogs();
      if (response) {
        setBlogs(response);
      } else {
        toast.error("Failed to fetch blogs");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_AUTH}/getAllUsers/${userData._id}`,
          {
            headers: {
              Authorization: `token ${token}`,
              credentials: "include",
            },
          }
        );

        if (response.ok) {
          const usersData = await response.json();
          console.log("Fetched Users:", usersData);
          setAllUsers(usersData);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    if (token && userData?.isAdmin) {
      fetchBlogs();
      fetchUsers();
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Blog Dashboard</h1>

      {/* TABS */}
      <div>
        <Tabs defaultValue="users" className="">
          <TabsList className="mb-10">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>

          {/* CONTENT FOR USERS */}
          <TabsContent value="users">
            {Allusers.length ? (
              <div className="overflow-auto rounded-lg ">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profile Image</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Blogs Likes</TableHead>
                      <TableHead>Joining</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Allusers.map((user: User) => (
                      <TableRow
                        key={user._id}
                        className="hover:bg-[#191919] transition-colors"
                      >
                        <TableCell>
                          <Image
                            src={user.profilePicture || "/placeholder.svg"}
                            alt={user.name}
                            width={60}
                            height={60}
                          />
                        </TableCell>
                        <TableCell>
                          {user.name} {user.isAdmin && "(Admin)"}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>

                        <TableCell>{user.blog.length}</TableCell>
                        <TableCell>
                          {" "}
                          {new Date(
                            user.createdAt
                          ).toLocaleDateString()} at{" "}
                          {new Date(user.createdAt).toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground mt-10">
                No users available.
              </p>
            )}
          </TabsContent>

          {/* CONTENT FOR BLOGS */}
          <TabsContent value="blogs">
            {blogs.length  ? (
              <div className="overflow-auto rounded-lg ">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Blog Image</TableHead>
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
                        <TableCell>
                          <Image
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            width={80}
                            height={80}
                          />
                        </TableCell>
                        <TableCell>{blog.userId.name}</TableCell>
                        <TableCell>{blog.title}</TableCell>
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
                              onClick={() => {
                                setBlogToDelete(blog);
                                setShowDeleteModal(true);
                              }}
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
          </TabsContent>
        </Tabs>
      </div>
      {/* Delete Modal */}
      {showDeleteModal && blogToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            <h3 className="text-xl font-bold mb-4 text-white">
              Confirm Delete
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong>&quot;{blogToDelete.title}&quot;</strong>? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-[#141414] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
