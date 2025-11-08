export default async function DeleteAccount(
  userId: string,
  token: string
): Promise<{ status: boolean }> {
  try {
    const host = import.meta.env.VITE_API_URL;
    const response = await fetch(`${host}/api/user/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return { status: true };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
    };
  }
}
