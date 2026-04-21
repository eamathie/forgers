export type User = {
  id: number;
  username:string;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
};

export type UserContextType = {
  user: User | null;
  updateUser: (user: User | null) => void;
};

export type AuthRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}