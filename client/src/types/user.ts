export type User = {
  id: string;
  name: string;
};

export type UserDetails = {
  _id: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type UpdateProfileReturnType = {
  error?: {
    errorMessage: string;
    field: string;
  };
  returnData: string;
  isSuccess: boolean;
};
