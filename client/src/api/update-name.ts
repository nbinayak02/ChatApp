import type { UpdateProfileReturnType } from "../types/user";

export default async function UpdateUserName(
  username: string,
  token: string,
  userId: string
): Promise<UpdateProfileReturnType> {

  if (username.length < 3) {
    return {
      error: {
        errorMessage: "Username should be at least 3 chars long.",
        field: "username",
      },
      isSuccess: false,
      returnData: "",
    };
  }

  try {
    const host = import.meta.env.VITE_API_URL;
    const response = await fetch(`${host}/api/user/username/${userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: `${username}`,
      }),
    });

    if (response.ok) {
      const res = await response.json();
      return { returnData: res.data, isSuccess: true };
    } else {
      return {
        error: {
          errorMessage: "Internal server error.",
          field: "username",
        },
        returnData: "",
        isSuccess: false,
      };
    }
  } catch (error) {
    return {
      error: { errorMessage: "Network error.", field: "username" },
      isSuccess: false,
      returnData: "",
    };
  }
}
