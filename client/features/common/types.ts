export interface User {
  id: number;
  url: string;
  login: string;
  avatar_url: string;
}

export interface CommonState {
  fetched: boolean;
  user?: User;
  error?: string;
}
