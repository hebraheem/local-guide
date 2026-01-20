export const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
    timeout: 10000,
  },
  app: {
    name: 'Your Local Guide',
    version: '1.0.0',
    description: 'Connect people who need help with those willing to help them',
  },
  features: {
    pwa: true,
    pushNotifications: true,
    offlineMode: true,
  },
};
