export interface JwtUser {
  id: string;
  email: string;
  role: 'user' | 'admin';
}
