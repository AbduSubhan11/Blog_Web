"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

interface UserData {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export default function EditProfile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<UserData | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: null as File | null,
    bio: "Passionate full-stack developer and tech blogger. I love sharing knowledge about web development, AI, and emerging technologies.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    github: "johndoe",
    twitter: "johndoe_dev",
    linkedin: "johndoe",
    phone: "+1 (555) 123-4567",
    company: "Tech Innovations Inc.",
    jobTitle: "Senior Full Stack Developer",
  });

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    const parsed = userJSON ? JSON.parse(userJSON) : null;

    if (!parsed || !parsed._id) {
      toast.error("You must be logged in to update your profile.");
      router.push("/login");
      return;
    }

    setData(parsed);
    setFormData((prev) => ({
      ...prev,
      name: parsed.name || "",
      email: parsed.email || "",
    }));
    if (parsed.profilePicture && typeof parsed.profilePicture === "string") {
      setPreviewUrl(parsed.profilePicture);
    }
  }, [router]);

  useEffect(() => {
    if (formData.profilePicture) {
      const url = URL.createObjectURL(formData.profilePicture);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [formData.profilePicture]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "profilePicture" && files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    if (formData.profilePicture) {
      form.append("profilePicture", formData.profilePicture);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_AUTH}/updateprofile/${data?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: form,
        }
      );
      const resData = await res.json();

      if (!res.ok)
        throw new Error(resData?.message || "Failed to update profile");

      localStorage.setItem("user", JSON.stringify(resData?.user));
      if (resData?.token) {
        localStorage.setItem("token", resData?.token);
      }

      toast.success("Profile updated successfully!");
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(`Profile Update failed: ${message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">

      {/* Main Content */}
      <div className="2xl:max-w-[1400px] w-[90%] mx-auto py-12">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <label
                  htmlFor="profilePicture"
                  className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-yellow-500 cursor-pointer hover:border-yellow-400 transition-colors group"
                >
                  {!previewUrl ? (
                    <div className="flex flex-col items-center text-gray-400 group-hover:text-yellow-500 transition-colors">
                      <Camera className="w-8 h-8 mb-2" />
                      <span className="text-xs">Upload Photo</span>
                    </div>
                  ) : (
                    <Image
                      width={200}
                      height={200}
                      src={previewUrl || "/placeholder.svg"}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 bg-yellow-500 text-[#141414] p-2 rounded-full group-hover:bg-yellow-400 transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {formData.name || "Your Name"}
              </h2>
              <p className="text-gray-400">
                {formData.email || "your.email@example.com"}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6 text-yellow-500">
              Profile Information
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-[#1d1d1d] border border-neutral-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-[#1d1d1d] border border-neutral-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className=" flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-700">
                <button
                  type="submit"
                  className=" mx-auto px-6 py-3 bg-yellow-500 text-[#141414] rounded-md hover:bg-yellow-600 transition-colors font-medium"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Your profile information is secure and will only be used to
              personalize your experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
