export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: Omit<LoginResponse, "accessToken" | "refreshToken"> | null;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  login: (data: LoginResponse) => void;
  logout: () => void;
}
