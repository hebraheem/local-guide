"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Link from "next/link";
import useTranslation from "@/hooks/useTranslation";

type RequestLocation = {
  id: number;
  title: string;
  category: string;
  location: string;
  urgent: boolean;
  description: string;
  postedBy: string;
  position: {
    lat: number;
    lng: number;
  };
};

type MapComponentProps = {
  requests: RequestLocation[];
  center?: { lat: number; lng: number };
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Default center (Berlin)
const defaultCenter = {
  lat: 52.52,
  lng: 13.405,
};

export default function MapComponent({ requests, center = defaultCenter }: MapComponentProps) {
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequest] = useState<RequestLocation | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-600 dark:text-gray-400">{t("MAP_ERROR")}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🌍</div>
          <p className="text-gray-600 dark:text-gray-400">{t("MAP_LOADING")}</p>
        </div>
      </div>
    );
  }

  // Custom marker icon based on urgency
  const getMarkerIcon = (urgent: boolean) => {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: urgent ? "#EF4444" : "#3B82F6",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 3,
      scale: urgent ? 12 : 10,
    };
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      {/* Render markers for each request */}
      {requests.map((request) => (
        <Marker
          key={request.id}
          position={request.position}
          icon={getMarkerIcon(request.urgent)}
          onClick={() => setSelectedRequest(request)}
          animation={request.urgent ? google.maps.Animation.BOUNCE : undefined}
        />
      ))}

      {/* Info window for selected request */}
      {selectedRequest && (
        <InfoWindow
          position={selectedRequest.position}
          onCloseClick={() => setSelectedRequest(null)}
        >
          <div className="p-2 max-w-xs">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold text-sm text-gray-900 line-clamp-2">
                {selectedRequest.title}
              </h3>
              {selectedRequest.urgent && (
                <span className="flex-shrink-0 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                  URGENT
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                {selectedRequest.category}
              </span>
              <span className="text-xs text-gray-600 flex items-center gap-1">
                📍 {selectedRequest.location}
              </span>
            </div>

            <p className="text-xs text-gray-700 mb-3 line-clamp-2">
              {selectedRequest.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                by {selectedRequest.postedBy}
              </span>
              <Link
                href={`/requests/${selectedRequest.id}`}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                {t("MAP_VIEW_REQUEST")} →
              </Link>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
