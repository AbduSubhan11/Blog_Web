"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const categories = [
  "Artificial Intelligence",
  "Agentic Systems",
  "Web Development",
  "AI Ethics",
  "Emerging Technologies",
  "Other",
];


export default function UpdateBlog({ params }: { params: { id: string } }) {
  const [selectedcategory, setSelectedcategory] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
      toast.error("You are not logged in!");
      return;
    }

    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTitle(data.title);
          setDescription(data.description);
          setSelectedcategory(data.category || []);
          setExistingImageUrl(data.image || null);
          console.log("Blog fetched image:", data.image);
        } else {
          toast.error(data.message || "Failed to fetch blog data.");
        }
      } catch (error) {
        toast.error(`Failed to log blog data. ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    fetchBlogData();
  }, []);

  const handleTagToggle = (tag: string) => {
    setSelectedcategory((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFileChange = (file: File | null) => {
    setImage(file);
    setExistingImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Title and description are required!");
      return;
    }

    if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
      return toast.error("You are not logged in!");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", JSON.stringify(selectedcategory));
    console.log("after submit", image);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/${params.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Blog updated successfully!");
        setTitle("");
        setDescription("");
        setSelectedcategory([]);
        setImage(null);
        setExistingImageUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
      <div className="2xl:max-w-[1400px] w-[90%] mx-auto py-16 lg:py-16">
        <h2 className="text-3xl font-bold mb-16 lg:mb-6 text-center">
          Update Blog Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Image Upload */}
          <div>
            <label className="block font-medium text-[#fff]">Blog Image:</label>
            <FileUpload
              onChange={(files) => handleFileChange(files[0] || null)}
              image={image || existingImageUrl}
              isImage={!!image}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-2 text-[#fff]">Title:</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md border border-neutral-700 bg-[#141414] placeholder-[#807f7f]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2 text-[#fff]">
              Description:
            </label>
            <textarea
              placeholder="Write your blog content..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-md border border-neutral-700 bg-[#141414] placeholder-[#807f7f]"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block font-medium mb-2 text-[#fff]">
              Category:
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedcategory.includes(tag)
                      ? "bg-yellow-500 text-[#141414] border-yellow-500"
                      : "bg-[#191919] text-[#807f7f] border-neutral-700"
                  } hover:shadow`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
