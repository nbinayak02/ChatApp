export interface User {
  status: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}
