export interface JwtUser {
  id: string;
  email: string;
  address?: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
