export type Error = {
  email?: string;
  username?: string;
  password?: string;
  cpassword?: string;
  serverReturnedError?: string;
};

export type FormState = {
  error: Error;
  isSuccess: boolean;
};
