import type { FormState } from "../types/signup";
import { validateSignup } from "../utils/validation";

export async function performSignup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  //validate form data
  const error = validateSignup(formData);

  if (Object.entries(error).length > 0) {
    return { error, isSuccess: false };
  }

  const host = import.meta.env.VITE_API_URL;

  const uname = formData.get("username")?.toString();
  const pass = formData.get("password")?.toString();

  try {
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: uname,
        password: pass,
      }),
    });

    const res = await response.json();

    if (response.status === 201) {
      return { error: {}, isSuccess: true };
    }

    return { error: { serverReturnedError: res.error }, isSuccess: false };
  } catch (error) {
    console.log("ERROR: ", error);
    return {
      error: {
        serverReturnedError: "Something went wrong. Please try again later.",
      },
      isSuccess: false,
    };
  }
}
