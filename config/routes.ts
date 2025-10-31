const NOVI_SAD = "Radnička 2, Novi Sad, Serbia";
const BRCKO = "Skendera Kulenovića, Brčko, Bosnia and Herzegovina";

export interface RouteConfig {
  route: string;
  origin: string;
  destination: string;
  waypoints?: string[];
}

export const ROUTES: Record<string, RouteConfig> = {
  "batrovci-bajakovo-gunja": {
    route: "batrovci-bajakovo-gunja",
    origin: NOVI_SAD,
    destination: BRCKO,
    waypoints: ["Spacva Vrbanja Croatia"],
  },
  "gunja-bajakovo-batrovci": {
    route: "gunja-bajakovo-batrovci",
    origin: BRCKO,
    destination: NOVI_SAD,
    waypoints: ["Spacva Vrbanja Croatia"],
  },
  "sremska-raca-bosanska-raca": {
    route: "sremska-raca-bosanska-raca",
    origin: NOVI_SAD,
    destination: BRCKO,
    waypoints: ["Rača Bridge"],
  },
  "bosanska-raca-sremska-raca": {
    route: "bosanska-raca-sremska-raca",
    origin: BRCKO,
    destination: NOVI_SAD,
    waypoints: ["Rača Bridge"],
  },
  "backapalanka-ilok-gunja": {
    route: "backapalanka-ilok-gunja",
    origin: NOVI_SAD,
    destination: BRCKO,
    waypoints: ["Bačka Palanka, Serbia", "Ilok, Croatia"],
  },
  "gunja-ilok-backapalanka": {
    route: "gunja-ilok-backapalanka",
    origin: BRCKO,
    destination: NOVI_SAD,
    waypoints: ["Gunja, Croatia", "Ilok, Croatia"],
  },
};

export const getRouteConfig = (route: string): RouteConfig | undefined => {
  return ROUTES[route];
};

export const getGoogleMapsUrl = (route: string): string => {
  const config = ROUTES[route];
  if (!config) return "";

  const origin = encodeURIComponent(config.origin);
  const destination = encodeURIComponent(config.destination);
  const waypoints = config.waypoints
    ? config.waypoints.map((w) => encodeURIComponent(w)).join("|")
    : "";

  const waypointsParam = waypoints ? `&waypoints=${waypoints}` : "";

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointsParam}&travelmode=driving`;
};
