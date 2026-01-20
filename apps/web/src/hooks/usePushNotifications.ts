'use client';

import { useEffect, useState } from 'react';
import { pushNotificationManager } from '@/services/push-notification.service';

interface UsePushNotificationsReturn {
  isSupported: boolean;
  isGranted: boolean;
  isLoading: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
}

export const usePushNotifications = (): UsePushNotificationsReturn => {
  const [isSupported, setIsSupported] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initPushNotifications = async () => {
      const supported = 'Notification' in window && 'serviceWorker' in navigator;
      setIsSupported(supported);
      
      if (supported && 'Notification' in window) {
        setIsGranted(Notification.permission === 'granted');
        await pushNotificationManager.initialize();
      }
    };

    initPushNotifications();
  }, []);

  const subscribe = async () => {
    setIsLoading(true);
    try {
      await pushNotificationManager.subscribe();
      setIsGranted(true);
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      setIsGranted(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async () => {
    setIsLoading(true);
    try {
      await pushNotificationManager.unsubscribe();
      setIsGranted(false);
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSupported,
    isGranted,
    isLoading,
    subscribe,
    unsubscribe,
  };
};
