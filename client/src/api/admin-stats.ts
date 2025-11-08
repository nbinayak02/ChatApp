import type { UserDetails } from "../types/user";


export async function getTotalChats(): Promise<{ count: number } | null> {
  try {
    const host = import.meta.env.VITE_API_URL;
    const response = await fetch(`${host}/api/admin/totalChats`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });

    if (!response.ok) {
      return null;
    }
    const res = await response.json();
    return { count: res.data };
  } catch (error) {
    return null;
  }
}

export async function getAllUsers(): Promise<UserDetails[]> {
  try {
    const host = import.meta.env.VITE_API_URL;
    const response = await fetch(`${host}/api/admin/allUsers`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });

    if (!response.ok) {
      return [];
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    return [];
  }
}
