"use client";

import { useEffect, useRef, useState } from "react";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface UseLocationTrackerOptions {
  enabled?: boolean;
  updateInterval?: number; // milliseconds
  onLocationUpdate?: (location: LocationData) => void;
  onError?: (error: GeolocationPositionError) => void;
}

export function useLocationTracker({
  enabled = false,
  updateInterval = 30000, // 5-minute default
  onLocationUpdate,
  onError,
}: UseLocationTrackerOptions = {}) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const updateLocation = async (position: GeolocationPosition) => {
    const locationData: LocationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    };

    setLocation(locationData);
    setError(null);

    // Call the callback if provided
    if (onLocationUpdate) {
      onLocationUpdate(locationData);
    }

    // Send it to the server
    try {
      await fetch("/api/location/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });
    } catch (err) {
      console.error("Failed to update location on server:", err);
    }
  };

  const handleError = (err: GeolocationPositionError) => {
    let errorMessage = "Unknown error occurred";

    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = "Location permission denied";
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = "Location information unavailable";
        break;
      case err.TIMEOUT:
        errorMessage = "Location request timed out";
        break;
    }

    setError(errorMessage);
    setIsTracking(false);

    if (onError) {
      onError(err);
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsTracking(true);
    setError(null);

    // Get initial position
    navigator.geolocation.getCurrentPosition(updateLocation, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });

    // Set up periodic updates
    intervalIdRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(updateLocation, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000, // Accept cached position up to 1 minute old
      });
    }, updateInterval);
  };

  const stopTracking = () => {
    setIsTracking(false);

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  // Auto start/stop based on the enabled prop
  useEffect(
    () => {
      if (enabled) {
        startTracking();
      } else {
        stopTracking();
      }

      // Cleanup on unmounting
      return () => {
        stopTracking();
      };
    },
    // eslint-disable-next-line
    [enabled, updateInterval],
  );

  return {
    location,
    isTracking,
    error,
    startTracking,
    stopTracking,
  };
}
