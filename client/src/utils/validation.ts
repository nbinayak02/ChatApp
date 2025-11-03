import type { Error } from "../types/signup";

export function validateSignup(formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("cpassword")?.toString();

  const error: Error = {};
  if (!username) {
    error.username = "Username is required.";
  }
  if (!password) error.password = "Password is required.";
  if (!confirmPassword) error.cpassword = "Confirm password is required";
  if (username && username.length < 3)
    error.username = "Username should be of at least 3 characters";
  if (password && confirmPassword && password !== confirmPassword)
    error.cpassword = "Password not matched";

  return error;
}

export function validateLogin(formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const error: Error = {};
  if (!username) {
    error.username = "Username is required.";
  }
  if (!password) error.password = "Password is required.";
  return error;
}
