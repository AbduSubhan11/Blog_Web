"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Heart,
  MessageSquare,
  Eye,
  TrendingUp,
  Calendar,
  PenTool,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { FetchUserBlogs } from "./fetch-user-blogs";
import { Blog } from "@/Data/blog-types";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  blog: string[];
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

const statsData = [
  {
    title: "Total Blogs",
    value: "24",
    change: "+3 this month",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-blue-400",
  },
  {
    title: "Total Views",
    value: "12.5K",
    change: "+15% from last month",
    icon: <Eye className="w-6 h-6" />,
    color: "text-green-400",
  },
  {
    title: "Total Likes",
    value: "1,847",
    change: "+8% from last month",
    icon: <Heart className="w-6 h-6" />,
    color: "text-red-400",
  },
  {
    title: "Comments",
    value: "342",
    change: "+12% from last month",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "text-yellow-400",
  },
];


export default function DashboardOverview({ user }: { user: User }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name[0].toUpperCase() + user?.name.slice(1)}!
              👋
            </h2>
            <p className="text-gray-400">
              Here's what's happening with your blog today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-sm text-gray-400">Current Time</p>
            <p className="text-lg font-semibold text-yellow-500">
              {currentTime.toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-400">
              {currentTime.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-[#191919] border border-neutral-700 rounded-lg p-6 hover:border-neutral-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color}`}>{stat.icon}</div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
              <p className="text-xs text-green-400">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Blogs */}
      <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Recent Blogs</h3>
          <Link href={"/my-blogs"} className="text-yellow-500 hover:text-yellow-400 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex md:flex-row md:space-y-0 space-y-4 flex-col md:items-center justify-between p-4 bg-[#1d1d1d] border border-neutral-700 rounded-md hover:border-neutral-600 transition-colors"
            >
              <div className="flex-1 space-y-3">
                <div className="md:w-[80%]">
                  <h4 className="font-medium mb-1 line-clamp-1">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {blog.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="bg-[#2a2a2a] px-2 py-1 rounded text-xs">
                    {blog.category}
                  </span>

                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {blog.like.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Link
                href={`/blog/${blog._id}`}
                className="flex w-fit items-center group gap-1 px-4 py-2 text-sm border border-neutral-700 rounded hover:bg-yellow-500 hover:text-[#141414] transition-all duration-500"
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
  );
}
