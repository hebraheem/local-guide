import { useJsApiLoader, Libraries } from "@react-google-maps/api";

// Define libraries as a constant to ensure same reference across all components
const libraries: Libraries = ["places"];

// Shared configuration for Google Maps API
export const GOOGLE_MAPS_CONFIG = {
  id: "google-map-script",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  libraries,
};

// Custom hook to use Google Maps API with consistent configuration
export function useGoogleMaps() {
  return useJsApiLoader(GOOGLE_MAPS_CONFIG);
}

export { libraries };
