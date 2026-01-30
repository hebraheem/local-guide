"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useGoogleMaps } from "@/lib/google-maps/loader";
import { useTranslations } from "next-intl";

type LatLng = { lat: number; lng: number };

type Props = {
  to: LatLng;
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function DistanceMapComponent({ to }: Props) {
  const t = useTranslations();
  const { isLoaded, loadError } = useGoogleMaps();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userPos, setUserPos] = useState<LatLng | null>(null);
  const [mode, setMode] = useState<google.maps.TravelMode>(
    "DRIVING" as google.maps.TravelMode,
  );

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);

  useEffect(() => {
    const watch = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error("GPS error", err),
      { enableHighAccuracy: true, maximumAge: 5000 },
    );

    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  // 🔁 Recalculate route when user or mode changes
  useEffect(() => {
    if (!isLoaded || !userPos || !to) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: userPos,
        destination: to,
        travelMode: mode,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error("Directions error:", status);
        }
      },
    );
  }, [isLoaded, userPos, to, mode]);

  if (loadError) return <div>{t("MAP_ERROR")}</div>;
  if (!isLoaded || !userPos) return <div>{t("MAP_LOADING")}</div>;

  return (
    <div className="relative h-full w-full">
      {/* Mode Selector */}
      <div className="absolute top-3 left-3 z-10 bg-white rounded-xl shadow p-2 flex gap-2">
        {(["DRIVING", "WALKING", "BICYCLING"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(google.maps.TravelMode[m])}
            className={`px-3 py-1 text-sm rounded ${
              mode === m
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPos}
        zoom={15}
        onLoad={onLoad}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#16a34a",
                strokeWeight: 6,
              },
              suppressMarkers: true,
            }}
          />
        )}

        {directions?.routes[0]?.legs.map((leg, index) => (
          <React.Fragment key={index}>
            <Marker
              position={leg.start_location}
              label={{ text: "A+", color: "white" }}
            />
            <Marker
              position={leg.end_location}
              label={{ text: "B+", color: "white" }}
            />
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  );
}
