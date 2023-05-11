export interface UsersApi {
  id: number;
  login: string;
  avatar_url: string;
}
export interface UserApi {
  html_url: string;
  avatar_url: string;
  name: string;
  login: string;
  followers?: number
  following?: number
}
export interface ReposApi {
  id: number;
  html_url: string;
  name: string;
  description: string;
}
