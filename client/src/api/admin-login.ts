import type { FormState } from "../types/login";
import { validateLogin } from "../utils/validation";

export async function performAdminLogin(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  //validate form
  const error = validateLogin(formData);

  if (Object.entries(error).length > 0) {
    return { error, isSuccess: false, token: null };
  }

  const host = import.meta.env.VITE_API_URL;

  const mail = formData.get("email")?.toString();
  const pass = formData.get("password")?.toString();

  try {
    const response = await fetch(`${host}/api/auth/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mail,
        password: pass,
      }),
      credentials: "include",
    });

    const res = await response.json();

    if (response.status === 200) {
      return { error: {}, isSuccess: true, token: null };
    }

    return { error: { otherError: res.error }, isSuccess: false, token: null };
  } catch (error) {
    console.log("ERROR: ", error);
    return {
      error: {
        otherError: "Something went wrong. Please try again later.",
      },
      isSuccess: false,
      token: null,
    };
  }
}
