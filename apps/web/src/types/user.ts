import { Language } from "@/forms/LanguageInput";

export interface User {
  id: string;
  username: string;
  email: string;
  totalHelped: number;
  roles: UserRole;
  isVerified: boolean;
  isActive: boolean;
  avgRating?: number;
  reviews: number; //{}[];
  location?: {
    latitude?: number;
    longitude?: number;
  };
  profile: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    phone?: string;
    avatarUrl?: string;
    languages?: Language[];
    skills?: string[];
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
      number?: string;
      longitude?: number;
      latitude?: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  totalCompletedRequests?: number;
  totalCancelledRequests?: number;
  totalOnGoingRequests?: number;
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

export type Role = "REQUESTER" | "HELPER";

export type UserRole = Role[];
