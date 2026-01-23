import { PageLinksType } from "@/types/page-links.type";

export const PAGE_LINKS: PageLinksType = {
  // Auth pages
  LOGIN: "/login",
  SIGNUP: "/signup",
  REQUEST_RESET_PASSWORD: "/request-rest-password",
  RESET_PASSWORD: "/reset-password",
  
  // Protected pages
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  POST: "/post",
  REQUESTS: "/requests",
  REQUEST_DETAIL: (id: string) => `/requests/${id}`,
  REQUEST_EDIT: (id: string) => `/requests/${id}/edit`,
  HELPERS: "/helpers",
  HELPER_DETAIL: (id: string) => `/helpers/${id}`,
  MAP: "/map",
  CHAT: "/chat",
  CHAT_DETAIL: (id: string) => `/chat/${id}`,
  
  // Demo
  DEMO: "/demo",
};
