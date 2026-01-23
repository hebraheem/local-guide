export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  avatarUrl?: string;
  roles: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  expiresIn: string;
  refreshToken?: string;
}

export interface AuthPayload {
  username: string;
  email?: string;
  password: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  phone: string;
  avatarUrl: string;
}

export type Role = "REQUESTER" | "HELPER" ;

export type UserRole = Role[]
