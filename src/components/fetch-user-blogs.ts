import { toast } from "sonner";

// utils/fetchUserBlogs.ts
export async function FetchUserBlogs() {
  const userString = localStorage.getItem("user");
  if (!userString) return;

  const user = JSON.parse(userString);
  if (!user || !user._id) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_BLOG}/user/${user._id}/blogs`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Unknown error");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(`Error: ${(error as Error).message}`);
    return;
  }
}
