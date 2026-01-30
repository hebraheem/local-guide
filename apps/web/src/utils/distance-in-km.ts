"use client";

type Coordinates = {
  user: { long?: number; lat?: number };
  point: { long: number; lat: number };
};


export function getDistanceKm(coordinates: Coordinates): Promise<string> {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const { user, point } = coordinates;

  return new Promise((resolve) => {
    const calculateDistance = (lat1: number, lon1: number) => {
      const lat2 = +point.lat;
      const lon2 = +point.long;
      const R = 6371; // Earth radius in KM
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distanceKm = R * c;

      // return meters if less than 1 km, otherwise km
      if (distanceKm < 1) {
        const distanceMeters = Math.round(distanceKm * 1000);
        resolve(`${distanceMeters}m`);
      } else {
        resolve(`${distanceKm.toFixed(2)}km`);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          calculateDistance(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error("GPS error", err);
          // fallback to user prop
          calculateDistance(user.lat ?? 0, user.long ?? 0);
        },
        { enableHighAccuracy: true, maximumAge: 5000 },
      );
    } else {
      console.error("Geolocation not supported");
      calculateDistance(user.lat ?? 0, user.long ?? 0);
    }
  });
}
