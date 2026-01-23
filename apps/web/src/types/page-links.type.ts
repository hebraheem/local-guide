export interface PageLinksType {
  // Auth pages
  LOGIN: string;
  SIGNUP: string;
  REQUEST_RESET_PASSWORD: string;
  RESET_PASSWORD: string;
  
  // Protected pages
  DASHBOARD: string;
  PROFILE: string;
  PROFILE_EDIT: string;
  POST: string;
  REQUESTS: string;
  REQUEST_DETAIL: (id: string) => string;
  REQUEST_EDIT: (id: string) => string;
  HELPERS: string;
  HELPER_DETAIL: (id: string) => string;
  MAP: string;
  CHAT: string;
  CHAT_DETAIL: (id: string) => string;
  
  // Demo
  DEMO: string;
}
