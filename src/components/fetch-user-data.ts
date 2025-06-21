export async function fetchUserData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_AUTH}/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", (error as Error).message);
    return error;
  }
}
