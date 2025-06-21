"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Camera } from "lucide-react";
import Image from "next/image";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    if (image) {
      form.append("profilePicture", image);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_AUTH}/register`,
        {
          method: "POST",
          body: form,
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.message) {
        setError(data.message);
      }
      if (res.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#141414] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] p-6 md:p-8 rounded shadow-md w-[95%] space-y-6 max-w-lg h-full"
        encType="multipart/form-data"
      >
        <p className="text-center text-red-500">{error}</p>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <label
          htmlFor="profilePicture"
          className="flex flex-col items-center overflow-hidden justify-center rounded-lg w-[50% mx-auto h-32 border-2 border-dashed border-gray-600 cursor-pointer hover:border-yellow-500 hover:text-yellow-500 transition"
        >
          {!image && (
            <>
              <Camera className="h-10 w-10 mb-2 text-gray-400" />
              <span className="text-sm text-gray-400">
                Click to upload profile picture
              </span>
            </>
          )}
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="Profile Preview"
              className="w-full h-full object-"
              width={96}
              height={96}
            />
          )}
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#141414] font-semibold p-2 rounded"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
