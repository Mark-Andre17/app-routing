export interface IUser {
  name: string;
  email: string;
}

export interface IAuthContextType {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => void;
}
export type RegisterForm = { name: string; email: string; password: string };
