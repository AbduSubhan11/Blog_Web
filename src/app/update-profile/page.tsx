"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { toast } from "sonner";


interface UserData {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export default function UpdateProfile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const userJSON = localStorage.getItem("user");
  // const data = userJSON ? JSON.parse(userJSON) : {};

  const [data, setData] = useState<UserData | null>(null);

  console.log("data", data?._id, typeof data?._id);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    profilePicture: null as File | null,
  });

  useEffect(() => {
    if (data?.name || data?.email) {
      setFormData({
        name: data?.name || "",
        email: data?.email || "",
        profilePicture: null,
      });
    }
  }, [data]);

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    const parsed = userJSON ? JSON.parse(userJSON) : null;

    if (!parsed || !parsed._id) {
      toast.error("You must be logged in to update your profile.");
      router.push("/login");
      return;
    }

    setData(parsed);

    if (parsed.profilePicture && typeof parsed.profilePicture === "string") {
      setPreviewUrl(parsed.profilePicture);
    }
  }, []);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (data?.profilePicture && typeof data?.profilePicture === "string") {
      setPreviewUrl(data?.profilePicture);
    }
  }, [file, data?.profilePicture]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files) {
      setFile(files[0]);
      setFormData((prev) => ({ ...prev, profilePicture: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData?.name);
    form.append("email", formData?.email);
    if (formData?.profilePicture) {
      form.append("profilePicture", formData?.profilePicture);
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
      const resdata = await res.json();
      console.log("after submitting", resdata);

      if (!res.ok) throw new Error(resdata?.message);

      localStorage.setItem("user", JSON.stringify(resdata?.user));
      if (resdata?.token) {
        localStorage.setItem("token", resdata?.token);
      }

      toast.success("Profile updated successfully!");
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(`Profile Update failed: ${message}`);
    }
  };

  if (!data?._id) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#141414] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] p-6 rounded space-y-6 max-w-lg w-[95%]"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center">Edit Profile</h2>
        <label
          htmlFor="profilePicture"
          className="flex flex-col items-center relative justify-center rounded-full w-32 h-32 mx-auto border-2 border-dashed border-gray-600 cursor-pointer hover:border-yellow-500 hover:text-yellow-500 transition"
        >
          {!previewUrl && (
            <>
              <span className="text-sm text-gray-400 text-center">
                Click to upload
              </span>
            </>
          )}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-full"
            />
          )}
          <div className="absolute right-1 -bottom-2 z-20">
            <Camera className="h-8 w-8 mb-2 text-white" />
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

        <input
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#141414] font-semibold p-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
