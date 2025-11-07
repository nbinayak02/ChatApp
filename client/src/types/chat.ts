export type Message = {
  _id?: string;
  userId: { _id: string; username: string };
  message: string;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
};
