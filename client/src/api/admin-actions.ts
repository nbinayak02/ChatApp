export async function deleteUserAccount(
  userId: string
): Promise<{ status: boolean }> {
  try {
    const host = import.meta.env.VITE_API_URL;
    const response = await fetch(`${host}/api/admin/deleteUser/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });

    if (!response.ok) {
      return { status: false };
    }

    return { status: true };
  } catch (error) {
    return { status: false };
  }
}
