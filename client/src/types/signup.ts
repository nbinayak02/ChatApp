export type Error = {
  username?: string;
  password?: string;
  cpassword?: string;
  serverReturnedError?: string;
};

export type FormState = {
  error: Error;
  isSuccess: boolean;
};
