"use client";

import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  Settings,
  User,
  TrendingUp,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import DashboardOverview from "../../../components/dashboard-overview";
import EditProfile from "../../../components/edit-profile";
import BlogManagement from "../../../components/blogs-management";
import Analytics from "../../../components/analytics";
import Image from "next/image";
import { toast } from "sonner";

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  { id: "profile", label: "Edit Profile", icon: <User className="w-5 h-5" /> },
  { id: "blogs", label: "My Blogs", icon: <BookOpen className="w-5 h-5" /> },
  {
    id: "analytics",
    label: "Analytics",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
];

export default function DashboardLayout() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const data = localStorage.getItem("user");
  if (!data) return;
  const user = data ? JSON.parse(data || "") : {};

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview user={user} />;
      case "profile":
        return <EditProfile />;
      case "blogs":
        return <BlogManagement />;
      case "analytics":
        return <Analytics />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL_AUTH}/logout`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout successful!");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-[#1d1d1d] border border-neutral-700 rounded-md hover:bg-[#252525] transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#191919] border-r border-neutral-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-neutral-700">
            <h2 className="text-xl font-bold text-yellow-500">
              FutureTech Blog
            </h2>
            <p className="text-sm text-gray-400 mt-1">Dashboard</p>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-neutral-700">
            <div className="flex items-center gap-3">
              <Image
                width={40}
                height={40}
                src={user.profilePicture || "/placeholder.svg"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-white">{user.name}</h3>
                <p className="text-xs text-gray-400">
                  Member since{" "}
                  {new Date(user.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                      activeSection === item.id
                        ? "bg-yellow-500 text-[#141414] font-medium"
                        : "text-gray-300 hover:bg-[#252525] hover:text-white"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-neutral-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-md transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-[#191919] border-b border-neutral-700 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="lg:hidden"></div>
            <h2 className="text-2xl font-semibold capitalize">
              {sidebarItems.find((item) => item.id === activeSection)?.label ||
                "Dashboard"}
            </h2>
            <div className="flex items-center gap-4">
              <Image
                width={40}
                height={40}
                src={user.profilePicture || "/placeholder.svg"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 lg:p-6">{renderContent()}</main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
