import { Subject, BehaviorSubject } from "rxjs";

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

class PushNotificationManager {
  private serviceWorkerReady$ = new BehaviorSubject<boolean>(false);
  private notifications$ = new Subject<PushNotificationPayload>();
  private isSupported = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.isSupported =
        "serviceWorker" in navigator &&
        "PushManager" in window &&
        "Notification" in window;
    }
  }

  async initialize(): Promise<void> {
    if (!this.isSupported) {
      console.warn("Push notifications are not supported in this browser");
      return;
    }

    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        console.log("Service Worker registered:", registration);
        this.serviceWorkerReady$.next(true);
        this.setupPushNotificationListener(registration);
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  private setupPushNotificationListener(
    registration: ServiceWorkerRegistration,
  ): void {
    if ("push" in registration) {
      registration.addEventListener("push", (event: any) => {
        try {
          const data = event.data?.json() as PushNotificationPayload;
          this.notifications$.next(data);
        } catch (error) {
          console.error("Failed to parse push notification:", error);
        }
      });
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported) {
      return "denied";
    }

    if (Notification.permission === "granted") {
      return "granted";
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  async subscribe(): Promise<PushSubscription | null> {
    if (!this.isSupported) {
      return null;
    }

    const permission = await this.requestPermission();
    if (permission !== "granted") {
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

    if (!vapidKey) {
      console.error("VAPID public key is not configured");
      return null;
    }

    try {
      const uint8Array = this.urlBase64ToUint8Array(vapidKey);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: uint8Array as any as BufferSource,
      });

      return subscription;
    } catch (error) {
      console.error("Push subscription failed:", error);
      throw error;
    }
  }

  async unsubscribe(): Promise<boolean> {
    if (!this.isSupported) {
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      return await subscription.unsubscribe();
    }

    return false;
  }

  async showNotification(payload: PushNotificationPayload): Promise<void> {
    if (!this.isSupported) {
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const options: any = {
      body: payload.body,
      icon: payload.icon || "../../public/icon-192x192.png",
      badge: payload.badge || "../../public/badge-72x72.png",
      tag: payload.tag,
      requireInteraction: payload.requireInteraction,
    };

    if (payload.actions) {
      options.actions = payload.actions;
    }

    await registration.showNotification(payload.title, options);
  }

  getNotifications$() {
    return this.notifications$.asObservable();
  }

  getServiceWorkerReady$() {
    return this.serviceWorkerReady$.asObservable();
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    try {
      // Handle empty string
      if (!base64String || base64String.trim() === "") {
        throw new Error("VAPID key is empty");
      }

      // Add padding if necessary
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      // Decode the base64 string
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }

      return outputArray;
    } catch (error) {
      console.error("Failed to convert VAPID key:", error);
      throw new Error("Invalid VAPID key format");
    }
  }
}

export const pushNotificationManager = new PushNotificationManager();
