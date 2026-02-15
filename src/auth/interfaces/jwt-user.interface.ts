export interface JwtUser {
  id: string;
  userId: string;
  email: string;
  address?: string;
  firstName: string;
  lastName: string;
  roles: string[];
  tokenVersion: number;
  jti: string;
}
