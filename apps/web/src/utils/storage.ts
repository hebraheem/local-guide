export const isClient = (): boolean => {
  return typeof window !== 'undefined';
};

export const getStorageItem = (key: string): string | null => {
  if (!isClient()) return null;
  return localStorage.getItem(key);
};

export const setStorageItem = (key: string, value: string): void => {
  if (!isClient()) return;
  localStorage.setItem(key, value);
};

export const removeStorageItem = (key: string): void => {
  if (!isClient()) return;
  localStorage.removeItem(key);
};

export const clearStorage = (): void => {
  if (!isClient()) return;
  localStorage.clear();
};
