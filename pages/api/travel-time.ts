// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { getRouteConfig } from "../../config/routes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { route, departureTime } = req.query;

  if (!route || typeof route !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or invalid route parameter" });
  }

  const routeConfig = getRouteConfig(route);
  if (!routeConfig) {
    return res.status(400).json({ error: "Unknown route" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Google Maps API key not configured" });
  }

  try {
    // Build waypoints parameter
    const waypointsParam = routeConfig.waypoints
      ? `&waypoints=${routeConfig.waypoints
          .map((w) => encodeURIComponent(w))
          .join("|")}`
      : "";

    // Handle departure time
    // If departureTime is provided, use it (Unix timestamp in seconds)
    // Otherwise, use "now" for current time
    let departureTimeParam = "now";
    if (
      departureTime &&
      typeof departureTime === "string" &&
      departureTime !== "now"
    ) {
      // Validate the timestamp is in the future
      const timestamp = parseInt(departureTime);
      const nowTimestamp = Math.floor(Date.now() / 1000);

      if (timestamp > nowTimestamp) {
        departureTimeParam = departureTime;
        console.log(
          `Using departure time: ${new Date(timestamp * 1000).toLocaleString()}`
        );
      } else {
        console.log(
          `Timestamp ${timestamp} is in the past, using "now" instead`
        );
      }
    }

    // Use Directions API for waypoint support
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      routeConfig.origin
    )}&destination=${encodeURIComponent(
      routeConfig.destination
    )}${waypointsParam}&departure_time=${departureTimeParam}&traffic_model=best_guess&key=${apiKey}`;

    console.log(
      `Fetching directions with departure_time=${departureTimeParam}`
    );
    const response = await fetch(directionsUrl);
    const data = await response.json();

    if (data.status !== "OK") {
      console.error(
        `Google Maps API error: ${data.status}`,
        data.error_message
      );

      // Return specific error code for invalid API key
      if (
        data.status === "REQUEST_DENIED" &&
        data.error_message?.includes("API key")
      ) {
        return res.status(401).json({
          error: "Invalid API key",
          status: data.status,
          message: data.error_message,
        });
      }

      return res.status(500).json({
        error: "Google Maps API error",
        status: data.status,
        message: data.error_message,
      });
    }

    if (!data.routes || data.routes.length === 0) {
      return res.status(500).json({
        error: "No routes found",
      });
    }

    const routeData = data.routes[0];

    if (!routeData.legs || routeData.legs.length === 0) {
      return res.status(500).json({
        error: "No route legs found",
      });
    }

    // Calculate total duration and distance across all legs
    let totalDuration = 0;
    let totalDurationInTraffic = 0;
    let totalDistance = 0;

    routeData.legs.forEach((leg: any, index: number) => {
      const legDuration = leg.duration?.value || 0;
      const legDurationInTraffic =
        leg.duration_in_traffic?.value || leg.duration?.value || 0;

      console.log(
        `Leg ${index}: duration=${legDuration}s, duration_in_traffic=${legDurationInTraffic}s`
      );

      totalDuration += legDuration;
      totalDurationInTraffic += legDurationInTraffic;
      totalDistance += leg.distance?.value || 0;
    });

    console.log(
      `Total: duration=${totalDuration}s, duration_in_traffic=${totalDurationInTraffic}s, delay=${
        totalDurationInTraffic - totalDuration
      }s`
    );

    const result = {
      route: route,
      origin: routeConfig.origin,
      destination: routeConfig.destination,
      distance: {
        text: `${(totalDistance / 1000).toFixed(1)} km`,
        value: totalDistance,
      },
      duration: {
        text: formatDuration(totalDuration),
        value: totalDuration,
      },
      durationInTraffic: {
        text: formatDuration(totalDurationInTraffic),
        value: totalDurationInTraffic,
      },
      trafficDelay: {
        text: formatDuration(totalDurationInTraffic - totalDuration),
        value: totalDurationInTraffic - totalDuration,
      },
      timestamp: new Date().toISOString(),
    };

    // Cache for 5 minutes
    res.setHeader("Cache-Control", "public, max-age=300");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching travel time:", error);
    res.status(500).json({ error: "Failed to fetch travel time" });
  }
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
}
