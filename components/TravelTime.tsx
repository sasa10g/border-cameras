// @ts-nocheck
import { useEffect, useState } from "react";
import { getGoogleMapsUrl } from "../config/routes";

interface TravelTimeProps {
  route: string;
}

interface TravelTimeData {
  distance: { text: string };
  durationInTraffic: { text: string };
  trafficDelay: { value: number; text: string };
  timestamp: string;
  origin: string;
  destination: string;
  waypoints?: string[];
}

export default function TravelTime({ route }: TravelTimeProps) {
  const [data, setData] = useState<TravelTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [departureTime, setDepartureTime] = useState<"now" | string>("now");
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const fetchTravelTime = async () => {
      try {
        setLoading(true);
        let url = `/api/travel-time?route=${route}`;

        // If a specific time is selected, convert to Unix timestamp
        if (departureTime !== "now") {
          url += `&departureTime=${departureTime}`;
        }

        // Create cache key
        const cacheKey = `travel-time-${route}-${departureTime}`;

        // Only use cache for "now" - always fetch fresh data for selected times
        if (departureTime === "now" && typeof window !== "undefined") {
          const cachedData = sessionStorage.getItem(cacheKey);
          if (cachedData) {
            try {
              const parsed = JSON.parse(cachedData);
              console.log(`Using cached data for ${route} at ${departureTime}`);
              setData(parsed);
              setError(false);
              setLoading(false);
              return;
            } catch (e) {
              console.error("Failed to parse cached data:", e);
              sessionStorage.removeItem(cacheKey);
            }
          }
        } else {
          console.log(
            `Fetching fresh data for user-selected time: ${departureTime}`
          );
        }

        // No cache, fetch from API
        console.log(`Fetching fresh data for ${route} at ${departureTime}`);
        const response = await fetch(url);

        if (!response.ok) {
          console.warn(
            `Travel time API error (${response.status}) - hiding travel time`
          );
          setError(true);
          setLoading(false);
          return;
        }

        const result = await response.json();

        // Only cache "now" results - don't cache user-selected times
        if (departureTime === "now" && typeof window !== "undefined") {
          sessionStorage.setItem(cacheKey, JSON.stringify(result));
        }

        setData(result);
        setError(false);
      } catch (err) {
        console.error("Error fetching travel time:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelTime();

    // Refresh every 5 minutes only when showing "now"
    // Don't use cache for "now" refreshes
    let interval: NodeJS.Timeout | null = null;
    if (departureTime === "now") {
      interval = setInterval(() => {
        // Clear cache for "now" before refreshing
        const cacheKey = `travel-time-${route}-now`;
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(cacheKey);
        }
        fetchTravelTime();
      }, 5 * 60 * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [route, departureTime]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent card click
    const timeValue = e.target.value;
    setSelectedTime(timeValue);

    if (!timeValue) {
      setDepartureTime("now");
      return;
    }

    // Convert selected time to Unix timestamp
    const now = new Date();
    const [hours, minutes] = timeValue.split(":");

    // Create date for selected time today
    let selectedDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(hours),
      parseInt(minutes),
      0
    );

    // If the selected time is in the past today, assume it's for tomorrow
    if (selectedDate.getTime() < now.getTime()) {
      selectedDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        parseInt(hours),
        parseInt(minutes),
        0
      );
    }

    // Convert to Unix timestamp in seconds
    const timestamp = Math.floor(selectedDate.getTime() / 1000);
    setDepartureTime(timestamp.toString());
  };

  if (loading) {
    return (
      <div className="travel-time-container loading">
        <div className="travel-time-skeleton">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  const hasTrafficDelay = data.trafficDelay.value > 300; // More than 5 minutes delay
  const trafficLevel =
    data.trafficDelay.value > 1800
      ? "heavy"
      : data.trafficDelay.value > 600
      ? "moderate"
      : "light";

  // Build Google Maps URL
  const googleMapsUrl = getGoogleMapsUrl(route);

  return (
    <div className="travel-time-container">
      <div className="travel-time-header">
        {/* <div className="time-selector">
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="time-input"
            onClick={(e) => e.stopPropagation()}
          />
        </div> */}
      </div>
      <div className="travel-time-main">
        <div className="travel-time-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div className="travel-time-info">
          <span className={`travel-duration ${trafficLevel}`}>
            {data.durationInTraffic.text}
          </span>
          <span className="travel-distance">{data.distance.text}</span>
        </div>
        <button
          type="button"
          className="maps-link"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
          }}
          title="Open in Google Maps"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </button>
      </div>
      {hasTrafficDelay && (
        <div className={`traffic-indicator ${trafficLevel}`}>
          <span className="traffic-dot"></span>
          <span className="traffic-text">+{data.trafficDelay.text} delay</span>
        </div>
      )}
    </div>
  );
}
