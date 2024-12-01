import { useState, useEffect } from "react";

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  location: GeolocationCoordinates | null;
  error: string | null;
}

const useGeolocation = (): UseGeolocationReturn => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Геолокация не поддерживается вашим браузером.");
      return;
    }

    const successHandler = (position: GeolocationPosition): void => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const errorHandler = (error: GeolocationPositionError): void => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  return { location, error };
};

export default useGeolocation;
