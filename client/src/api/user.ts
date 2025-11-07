import type { User } from "../types/user";

export default async function getUser(token: string):Promise<User | null> {
  try {
    const host = import.meta.env.VITE_API_URL;
    const response = await fetch(`${host}/api/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const res = await response.json();
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
