"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useGoogleMaps } from "@/lib/google-maps/loader";
import useTranslation from "@/hooks/useTranslation";

interface LocationAutocompleteProps {
  onPlaceSelected: (place: PlaceDetails) => void;
  defaultValue?: string;
}

export interface PlaceDetails {
  fullAddress: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

const LocationAutocomplete = ({ onPlaceSelected, defaultValue }: LocationAutocompleteProps) => {
  const { t } = useTranslation();
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const onPlaceSelectedRef = useRef(onPlaceSelected);

  // Update ref when callback changes
  useEffect(() => {
    onPlaceSelectedRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  const { isLoaded, loadError } = useGoogleMaps();

  // Debug logging
  useEffect(() => {
    if (!apiKey || apiKey.includes('PLACEHOLDER') || apiKey.includes('DEVELOPMENT')) {
      console.error('⚠️ Google Maps API Key is not configured properly!');
      console.error('Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local');
    }
  }, [apiKey]);

  useEffect(() => {
    if (loadError) {
      console.error('Google Maps load error:', loadError);
    }
  }, [loadError]);

  useEffect(() => {
    if (isLoaded) {
      console.log('✅ Google Maps API loaded successfully');
    }
  }, [isLoaded]);

  const extractAddressComponents = (place: google.maps.places.PlaceResult): PlaceDetails => {
    const components = place.address_components || [];
    let street = "";
    let city = "";
    let state = "";
    let zipCode = "";
    let country = "";

    // Extract street number and route
    const streetNumber = components.find((c) => c.types.includes("street_number"))?.long_name || "";
    const route = components.find((c) => c.types.includes("route"))?.long_name || "";
    street = `${streetNumber} ${route}`.trim();

    // Extract city - try multiple possible types
    city = components.find((c) => 
      c.types.includes("locality") || 
      c.types.includes("postal_town") ||
      c.types.includes("administrative_area_level_2")
    )?.long_name || "";

    // Extract state/province
    state = components.find((c) => c.types.includes("administrative_area_level_1"))?.long_name || "";

    // Extract postal code
    zipCode = components.find((c) => c.types.includes("postal_code"))?.long_name || "";

    // Extract country
    country = components.find((c) => c.types.includes("country"))?.long_name || "";

    const result: PlaceDetails = {
      fullAddress: place.formatted_address || "",
      street,
      city,
      state,
      zipCode,
      country,
      latitude: place.geometry?.location?.lat(),
      longitude: place.geometry?.location?.lng(),
    };

    console.log('📍 Place selected:', result);
    return result;
  };

  useEffect(() => {
    if (isLoaded && autocompleteRef.current && typeof google !== 'undefined') {
      const input = autocompleteRef.current.querySelector('input');
      if (!input) return;

      // Initialize the Autocomplete service
      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address'],
        fields: ['address_components', 'formatted_address', 'geometry'],
      });

      console.log('✅ Autocomplete initialized');

      // Listen for place selection
      const placeChangedListener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log('Place changed:', place);
        
        if (place.geometry && place.address_components) {
          const placeDetails = extractAddressComponents(place);
          setInputValue(placeDetails.fullAddress);
          onPlaceSelectedRef.current(placeDetails); // Use ref to avoid dependency
        } else {
          console.warn('No geometry or address components found for selected place');
        }
      });

      // Dropdown positioning fix
      const fixPosition = () => {
        requestAnimationFrame(() => {
          const pacContainer = document.querySelector('.pac-container') as HTMLElement;
          if (pacContainer && input) {
            const rect = input.getBoundingClientRect();
            pacContainer.style.top = `${rect.bottom + window.scrollY}px`;
            pacContainer.style.left = `${rect.left + window.scrollX}px`;
            pacContainer.style.width = `${rect.width}px`;
          }
        });
      };

      // Handle input events
      const handleInput = () => {
        fixPosition();
        setTimeout(fixPosition, 50);
        setTimeout(fixPosition, 100);
      };

      // Handle scroll
      const handleScroll = () => {
        fixPosition();
      };

      // Add event listeners
      input.addEventListener('input', handleInput);
      input.addEventListener('focus', handleInput);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);

      // Cleanup function
      return () => {
        input.removeEventListener('input', handleInput);
        input.removeEventListener('focus', handleInput);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
        google.maps.event.removeListener(placeChangedListener);
      };
    }
  }, [isLoaded]); // Only depend on isLoaded, not onPlaceSelected

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  // Show API key warning
  if (!apiKey || apiKey.includes('PLACEHOLDER') || apiKey.includes('DEVELOPMENT')) {
    return (
      <div className="flex flex-col gap-2 w-full py-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("LOCATION")}
        </label>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
            ⚠️ Google Maps API Key Required
          </p>
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            Please set <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in your .env.local file with a valid Google Maps API key.
          </p>
        </div>
        <input
          type="text"
          className="dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm"
          placeholder={t("ENTER_LOCATION_MANUALLY")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col gap-2 w-full py-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("LOCATION")}
        </label>
        <input
          type="text"
          className="dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm"
          placeholder={t("ENTER_LOCATION_MANUALLY")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <small className="text-xs text-red-600">{t("GOOGLE_MAPS_ERROR")}</small>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-2 w-full py-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("LOCATION")}
        </label>
        <div className="dark:text-primary-800 w-full rounded-xl bg-primary-100 px-4 py-4 text-sm animate-pulse">
          {t("LOADING")}...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full py-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("SEARCH_LOCATION")} *
      </label>
      <div ref={autocompleteRef} className="relative">
        <input
          type="text"
          className="dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm relative z-10"
          placeholder={t("START_TYPING_ADDRESS")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
        />
      </div>
      <small className="text-xs text-gray-500 dark:text-gray-400">
        {t("LOCATION_AUTOCOMPLETE_HINT")}
      </small>
    </div>
  );
};

export default LocationAutocomplete;
