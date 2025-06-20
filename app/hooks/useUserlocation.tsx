"use client";

import { useState, useEffect } from "react";

type Coords = { lat: number; lng: number } | null;

export default function useUserLocation(): [Coords, () => Promise<Coords>] {
  const [location, setLocation] = useState<Coords>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user-location");
    if (stored) {
      try {
        setLocation(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user-location");
      }
    }
  }, []);

  const detectLocation = () =>
    new Promise<Coords>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(coords);
          localStorage.setItem("user-location", JSON.stringify(coords));
          resolve(coords);
        },
        (err) => {
          reject(new Error(err.message));
        }
      );
    });

  return [location, detectLocation];
}
