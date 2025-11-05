import type { Error } from "../types/signup";

export function validateSignup(formData: FormData) {
  const email = formData.get("email")?.toString();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("cpassword")?.toString();

  const errors: Error = {};

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (!username) {
    errors.username = "Username is required";
  } else if (username.length < 3) {
    errors.username = "Username should be of at least 3 characters.";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password should be of at least 6 characters.";
  } else if (password !== confirmPassword)
    errors.cpassword = "Password not matched";

  return errors;
}

export function validateLogin(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const error: Error = {};
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    error.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    error.email = "Invalid email format.";
  }
  
  if (!password) error.password = "Password is required.";
  return error;
}
