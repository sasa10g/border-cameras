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
    return res.status(503).json({ error: "Google Maps API not configured" });
  }

  try {
    // Build waypoints parameter
    const waypointsParam = routeConfig.waypoints
      ? `&waypoints=${routeConfig.waypoints
          .map((w) => encodeURIComponent(w))
          .join("|")}`
      : "";

    // Handle departure time
    // For traffic data, we need a future timestamp (Google requirement)
    // If departureTime is "now" or not provided, use current time + 1 minute
    let departureTimeParam: string;
    const nowTimestamp = Math.floor(Date.now() / 1000);

    if (
      departureTime &&
      typeof departureTime === "string" &&
      departureTime !== "now"
    ) {
      // User selected a specific time
      const timestamp = parseInt(departureTime);

      if (timestamp > nowTimestamp) {
        departureTimeParam = departureTime;
        console.log(
          `Using user-selected departure time: ${new Date(
            timestamp * 1000
          ).toLocaleString()}`
        );
      } else {
        // Time is in the past, use current time + 1 minute
        departureTimeParam = (nowTimestamp + 60).toString();
        console.log(
          `Timestamp ${timestamp} is in the past, using now + 1 minute`
        );
      }
    } else {
      // "now" - use current time + 1 minute to get traffic data
      departureTimeParam = (nowTimestamp + 60).toString();
      console.log(
        `Using current time + 1 minute for traffic: ${new Date(
          (nowTimestamp + 60) * 1000
        ).toLocaleString()}`
      );
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

      // Return 503 for API unavailable (covers invalid API key, quota exceeded, etc.)
      return res.status(503).json({
        error: "Google Maps API unavailable",
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
